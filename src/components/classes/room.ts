import { log } from '../support/log'
import { Task, MixinTaskable, ITaskable } from './Task'
import { claims, dummyClaimer, IClaimable, IClaimer } from './Claims'
import * as RoomConfig from '../../config/room'
import * as CreepConfig from '../../config/creep'

declare global {
  interface Room extends ITaskable {
    /** Runner for logic */
    run(): void
    cachePath(origin: RoomPosition, target: RoomPosition): void
    getCachedPath(origin: RoomPosition, target: RoomPosition): RoomPosition[]
    findCachedPath(origin: RoomPosition, target: RoomPosition, originRange: number, targetRange: number): RoomPosition[]
    /**
     * Get the room role.
     * Returns 'unowned' when no rule was found in memory.
     * @returns string
    */
    getRole(): string
    /**
     * Get all default roles for this room
     * @returns string[]
     */
    getRoleTasks(): string[]

    addSlave(name: string): void
    deleteSlave(name: string): void
    getSlaves(): string[]

    // Spawn handling
    getSpawns(): Spawn[]
    spawns: Spawn[]

    // Resources
    getAvailableSources(): Source[]
    getAvailableResources(claimer: IClaimer, amount: number): Array<Resource | RoomObject>
  }
}
// We extend ITaskable so we should get the methods too
MixinTaskable(Room)

Room.prototype.run = function (this: Room) {
  _init(this)
  _runTasks(this)
  _towerDefense(this)
}

function _init(self: Room) {
  if (self.memory.init == undefined) {
    self.memory.init = true
    if (self.controller && self.controller.level > 0) { self.memory.role = 'master' }
    else { self.memory.role = 'unowned' }

    let tasks = self.getRoleTasks()
    let time = Game.time
    _.forEach(tasks, taskName => {
      time++
      self.taskUnshift(time, taskName)
    })
  }

}

function _runTasks(self: Room) {
  let doNext = true
  while (doNext) {
    doNext = false

    // Get the top task
    let task: Task | false = self.taskShift()
    // Okay... no task found
    if (!task) { break }

    // Check time
    if (task.time <= Game.time) {
      // little message
      // log.debug(log.color('[' + self.name + ']', 'cyan'), 'running task', log.color(task.name, 'orange'))
      // Requeue the task for later
      doNext = self.taskRun(task)
    } else {
      // All okay. Run the task
      self.taskPush(task)
    }
  }
}

function _towerDefense(self: Room) {
  let hostile = self.find(FIND_HOSTILE_CREEPS) as Creep[]
  if (hostile.length == 0) { return }
  _.each(self.find(FIND_MY_STRUCTURES, { filter: (s: Tower) => { return s.structureType == STRUCTURE_TOWER } }), (tower: Tower) => {
    tower.attack(hostile[0])
  })

}

Room.prototype.getRole = function (this: Room) {
  let roleName = this.memory.role
  let role = RoomConfig.roles[roleName]
  if (!role) { return 'unowned' }
  return roleName
}

Room.prototype.getRoleTasks = function (this: Room) {
  let role = this.getRole()
  return RoomConfig.roles[role]['tasks'] as string[]
}

Room.prototype.getSlaves = function (this: Room) {
  if (this.memory['slaves'] == undefined) { this.memory['slaves'] = {} }

  return this.memory['slaves'] as string[]
}

Room.prototype.getSpawns = function (this: Room) {
  if (this.spawns == undefined) {
    this.spawns = []
    this.find(FIND_MY_SPAWNS, {
      filter: (s: Spawn) => { this.spawns.push(s) }
    })
  }

  return this.spawns
}

Room.prototype.getAvailableSources = function (this: Room, claimer: IClaimer = dummyClaimer) {
  if (!this.memory.sources) { return [] }

  let sources = _(this.memory.sources)
    .map((sourceId: string) => { return Game.getObjectById(sourceId) })
    .filter((source: IClaimable) => { return source != undefined && claims.isClaimable(claimer, source, 1) })
    .value() as Source[]

  return sources
}

Room.prototype.getAvailableResources = function (this: Room, claimer: IClaimer = dummyClaimer, amount: number = 1) {
  if (!this.memory.resources) { return [] }

  let resources = _(this.memory.resources)
    .map((ressourceId: string) => { return Game.getObjectById(ressourceId) })
    .filter((ressource: IClaimable) => { return ressource != undefined && claims.isClaimable(claimer, ressource, amount) })
    .value() as Resource[]
  return resources
}

// Declaring all tasks this object can run
Room.prototype.tasks = {}
let tasks = Room.prototype.tasks

// Check all sources in the room
tasks[RoomConfig.TASK_CHECK_SOURCES] = function (this: Room) {
  let sources: string[] = []

  this.find(FIND_SOURCES, {
    // We are using the filter to fill our array
    filter: (x: Source) => {
      if (x.pos.findInRange(FIND_HOSTILE_STRUCTURES, 5).length > 0) { return }
      sources.push(x.id)

      _.forEach(this.find(FIND_MY_SPAWNS), (spawn: Spawn) => {
        this.taskPush(sources.length + 1, RoomConfig.TASK_PLAN_PATH, [spawn.pos.x, spawn.pos.y, spawn.pos.roomName, x.pos.x, x.pos.y, x.pos.roomName])
      })
    }
  })

  // Finally write all into the memory
  this.memory.sources = sources
  // And requeue the task
  this.taskPush(100, RoomConfig.TASK_CHECK_SOURCES)

  log.info(log.color('[' + this.name + ']', 'cyan'), 'Checking sources. Found', log.color(sources.length.toString(), 'orange'))
}

tasks[RoomConfig.TASK_PLAN_PATH] = function (this: Room, task: Task, ) {
  let data = task.data as any[]

  // We need to recast that into the right custom object...
  let target = new RoomPosition(data[0], data[1], data[2])
  let origin = new RoomPosition(data[3], data[4], data[5])

  if (target.roomName == origin.roomName) {
    let opts = { ignoreCreeps: true, plainCost: 1, swampCost: 1 }
    let goal = { pos: target, range: 1 }
    let path = PathFinder.search(origin, goal, opts)

    let chunk: any[] = []
    _.each(path.path, (x: RoomPosition) => {
      if (chunk.length >= 10) {
        this.taskPush(1 + Math.random() * 10, RoomConfig.TASK_PLAN_ROAD, chunk)
        chunk = []
      }
      chunk.push([x.x, x.y, x.roomName])
    })
    if (chunk.length > 0) {
      this.taskPush(1 + Math.random() * 10, RoomConfig.TASK_PLAN_ROAD, chunk)
    }
  }
}

tasks[RoomConfig.TASK_PLAN_ROAD] = function (this: Room, task: Task) {
  let data = task.data as any[]

  if (_.keys(Game.constructionSites).length + data.length > 80) {
    // We cannot build more, so queue this again
    this.taskPush(10 + Math.random() * 30, RoomConfig.TASK_PLAN_ROAD, data)
    log.warning('Hit build limit')
    return
  }

  for (var i = 0; i < data.length; i++) {
    var pos = new RoomPosition(data[i][0], data[i][1], data[i][2])
    let roads = pos.lookFor(LOOK_STRUCTURES)
    let constr = pos.lookFor(LOOK_CONSTRUCTION_SITES)

    if (!roads.length && !constr.length) {
      pos.createConstructionSite(STRUCTURE_ROAD)
    }
  }
}

function getRandomName(title: string) {
  let name = ''
  do {
    name = title + ' ' + CreepConfig.names[Math.floor(Math.random() * CreepConfig.names.length - 1)]
  } while (Game.creeps[name])

  return name
}

tasks[RoomConfig.TASK_MANAGE_ROOM] = function (this: Room, task: Task) {
  task.time = Game.time + 25
  this.taskPush(task)


  let spawnTimer = this.memory.spawnTimer || 0
  let roomLevel = RoomConfig.level[this.memory.level]
  let creeps = _.countBy(Game.creeps, 'memory.role')

  if (spawnTimer <= Game.time) {
    let spawns = _.filter(this.getSpawns(), { spawning: null })
    let builder: any

    if (spawns.length > 0) {
      for (let creepType in roomLevel.availableCreeps) {
        switch (creepType) {
          case 'allrounder':
            if ((creeps[creepType] || 0) < creeps['harvester-energy'] * <number>roomLevel.availableCreeps[creepType]) {
              builder = CreepConfig.Roles[creepType]
            }
            break
          case 'harvester-energy':
            if (this.memory.sources && (creeps[creepType] || 0) < this.memory.sources.length) {
              builder = CreepConfig.Roles[creepType]
            }
            break
          default:
            log.warning('Unrecognized creep class tried to sneak into spawn.')
        }

        if (builder != undefined) {
          let fn = builder['build']
          let pattern

          if (fn) { pattern = fn(this.energyAvailable) }
          else { log.warning(creepType, 'is missing a builder function') }

          let mem = { role: creepType }
          spawns[0].createCreep(pattern, getRandomName(builder['name']), mem)
          break
        }
      }
    }
  }

  // Following tasks
  this.taskUnshift(1, '_scanResources')
}

tasks['_scanResources'] = function (this: Room) {
  let resources: Array<any> = []

  this.find(FIND_STRUCTURES, {
    filter: (s: Structure) => {
      if (s.structureType == STRUCTURE_CONTAINER) { resources.push(s.id) }
    }
  })

  this.find(FIND_DROPPED_RESOURCES, {
    filter: (r: Resource) => {
      resources.push(r.id)
    }
  })

  this.memory.resources = resources

  return true
}

tasks[RoomConfig.TASK_CHECK_ROOM_LEVEL] = function (this: Room, task: Task) {
  task.time = Game.time + 200

  let currentLevel = this.memory.level || 0
  let creeps = _.countBy(Game.creeps, 'role')
  let energy = this.energyAvailable + (this.storage ? this.storage.store.energy : 0)
  let extensions = 0

  let newLevel = -1
  for (let v of RoomConfig.level) {
    if (
      !v.require.creeps(creeps) ||
      !(v.require.energy <= energy) ||
      !(v.require.extensions <= extensions)
    ) { break }
    newLevel++
  }

  if (newLevel > currentLevel) {
    log.info(log.color('[' + this.name + ']', 'cyan'), 'reached', log.color(RoomConfig.level[newLevel].name, 'brown'), 'status')
  } else if (newLevel < currentLevel) {
    log.info(log.color('[' + this.name + ']', 'cyan'), 'lost it\'s status and is now', log.color(RoomConfig.level[newLevel].name, 'brown'))
  }
  this.memory.level = newLevel

  this.taskPush(task)
}