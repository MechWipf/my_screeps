import { log } from '../support/log'
import { Task, MixinTaskable, ITaskable } from './task'

export const ROOM_TASK_CHECK_SOURCES: string = 'checkSources'
export const ROOM_TASK_PLAN_ROAD: string = 'planRoad'
export const ROOM_TASK_PLAN_PATH: string = 'planPath'

declare global {
  interface Room extends ITaskable {
    // A test function (remove me...)
    logInfo(): void
    // Main runner for the room logic
    run(): void
    // Tasks the room can run
    cachePath(origin: RoomPosition, target: RoomPosition): void
    getCachedPath(origin: RoomPosition, target: RoomPosition): RoomPosition[]
    findCachedPath(origin: RoomPosition, target: RoomPosition, originRange: number, targetRange: number): RoomPosition[]
  }
}
// We extend ITaskable so we should get the methods too
MixinTaskable(Room)

Room.prototype.logInfo = function (this: Room) {
  log.info('Hello world, ', this.name, '!')
}

Room.prototype.run = function (this: Room) {
  if (this.memory.init == undefined) {
    this.memory.init = true
    this.taskPush(2, ROOM_TASK_CHECK_SOURCES)
  }

  let iter = Math.min(10, this.taskCount())

  while (iter > 0) {
    iter--

    // Get the top task
    let task: Task | false = this.taskShift()
    // Okay... no task found
    if (!task) { break }

    // Check time
    if (task.time <= Game.time) {
      // little message
      log.debug(log.color('[' + this.name + ']', 'cyan'), 'running task', log.color(task.name, 'orange'))
      // Requeue the task for later
      this.taskRun(task)
    } else {
      // All okay. Run the task
      this.taskPush(task)
    }
  }
}

// Declaring all tasks this object can run
Room.prototype.tasks = {}
let tasks = Room.prototype.tasks

// Check all sources in the room
tasks[ROOM_TASK_CHECK_SOURCES] = function (this: Room) {
  let sources: string[] = []

  this.find(FIND_SOURCES, {
    // We are using the filter to fill our array
    filter: (x: Source) => {
      if (x.pos.findInRange(FIND_HOSTILE_STRUCTURES, 5).length > 0) { return }
      sources.push(x.id)

      _.forEach(this.find(FIND_MY_SPAWNS), (spawn: Spawn) => {
        this.taskPush(sources.length + 1, ROOM_TASK_PLAN_PATH, [spawn.pos.x, spawn.pos.y, spawn.pos.roomName, x.pos.x, x.pos.y, x.pos.roomName])
      })
    }
  })

  // Finally write all into the memory
  this.memory.sources = sources
  // And requeue the task
  this.taskPush(100, ROOM_TASK_CHECK_SOURCES)

  log.info(log.color('[' + this.name + ']', 'cyan'), 'Checking sources. Found', log.color(sources.length.toString(), 'orange'))
}

tasks[ROOM_TASK_PLAN_PATH] = function (this: Room, task: Task, ) {
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
        this.taskPush(1 + Math.random() * 10, ROOM_TASK_PLAN_ROAD, chunk)
        chunk = []
      }
      chunk.push([x.x, x.y, x.roomName])
    })
    if (chunk.length > 0) {
      this.taskPush(1 + Math.random() * 10, ROOM_TASK_PLAN_ROAD, chunk)
    }
  }
}

tasks[ROOM_TASK_PLAN_ROAD] = function (this: Room, task: Task) {
  let data = task.data as any[]

  if (_.keys(Game.constructionSites).length + data.length > 80) {
    // We cannot build more, so queue this again
    this.taskPush(10 + Math.random() * 30, ROOM_TASK_PLAN_ROAD, data)
    log.debug('Hit build limit')
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