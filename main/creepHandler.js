'use strict'

const conf = require('conf')
const helper = require('helper')

let creepHandler = {
  roles: {},
  time: {},
  resources: {},
  loop: 0,

  run: function () {
    let creepCount = 0
    let creepCountByType = {}

    _.forEach(Game.creeps, (creep) => {
      try {
        this.loop = 0
        creepCount++

        if (!creepCountByType[creep.getMainRole()]) {
          creepCountByType[creep.getMainRole()] = 1
        } else {
          creepCountByType[creep.getMainRole()] = creepCountByType[creep.getMainRole()] + 1
        }

        if (creep.memory.t == undefined) {
          creep.memory.t = '-'
        }

        this.runTask(creep)
      } catch (err) {
        console.log(err, creep)
      }
    })

    let myRooms = {}
    let normalCreepCount = creepCountByType[''] || 0
    let minerCreepCount = creepCountByType['miner'] || 0
    let upgraderCreepCount = creepCountByType['upgrader'] || 0

    _.each(Game.spawns, (spawn) => {
      if (normalCreepCount < 1 || normalCreepCount < minerCreepCount * 2) {
        this.spawn(spawn)
      } else if (minerCreepCount < spawn.room.memory.sources.length) {
        this.spawn(spawn, 'miner')
      } else if (upgraderCreepCount < minerCreepCount) {
        this.spawn(spawn, 'upgrader')
      }
    })
  },

  runTask: function (creep) {
    this.loop = this.loop + 1

    let task = creep.memory.t
    let roles = creep.memory.r

    global.debug_creep = creep

    if (task === "-") {
      if (creep.room.controller.ticksToDowngrade < 4500 && _.indexOf(roles, 'u') > -1) {
        this.nextTask(creep, 'u')
      } else {
        this.nextTask(creep, roles[0])
      }
    } else if (this.roles[task]) {
      if (this.loop > 4) { return }
      this.roles[task].run(this, creep)
    } else {
      this.nextTask(creep)
    }
  },

  init: function () {
    _.forEach(conf.roles, (k) => {
      try {
        this.roles[k.substr(0, 1)] = require('role.' + k)
      } catch (err) {
        console.log('Failed to load role "' + k + '":', err)
      }
    })
  },

  spawn: function (spawn, spawnType) {
    if (!(((spawn.room.memory.spawnTimer || 0) < Game.time) || spawn.room.energyAvailable == spawn.room.energyCapacityAvailable)) {
      return
    }

    let cost = 0
    let maxCost = spawn.room.energyAvailable

    let pattern
    let memory


    switch (spawnType) {
      case 'miner': {
        pattern = [WORK, WORK, CARRY, MOVE]
        memory = { type: 'miner', t: '-', r: ['h'] }
        cost = 300

        let work = 2

        while (cost + 50 <= maxCost) {
          let diff = maxCost - cost

          if (diff >= 100 && work < 5) {
            pattern.push(WORK)
            work++
            cost += 100
          } else if (diff >= 50) {
            pattern.push(MOVE)
            cost += 50
          }
        }
        break
      }
      case 'upgrader': {
        memory = { type: 'upgrader', t: '-', r: ['h', 'u'] }
      }
      default: {
        pattern = [WORK, CARRY, MOVE, MOVE]
        memory = memory || { type: '', t: '-', r: ['h', 'c', 'b', 'u'] }
        cost = 250

        let work = 1
        let carry = 1
        let move = 2

        while (cost + 100 <= maxCost) {
          let diff = maxCost - cost

          if (diff >= 150 && work <= carry / 6) {
            cost += 150
            pattern.push(WORK, MOVE)
            work++
          } else if (diff >= 50 && (move - work) <= carry / 2) {
            cost += 50
            pattern.push(MOVE)
            move++
          } else if (diff >= 50) {
            cost += 50
            pattern.push(CARRY)
            carry++
          }
        }

        break
      }
    }

    pattern = _.sortBy(pattern)
    console.log('Build Creep', pattern, 'for', cost)
    spawn.createCreep(pattern, null, memory)

    spawn.room.memory.spawnTimer = Game.time + cost
  },

  nextTask: function (creep, task) {
    let roles = creep.memory.r
    let taskCurrent = creep.memory.t
    let newTask = '-'

    if (task == null) {
      for (let i in roles) {
        if (roles[i] === taskCurrent) {
          if (i < roles.length) {
            newTask = roles[parseInt(i) + 1]
          }
          break
        }
      }
    } else {
      if (this.roles[task] != null) {
        newTask = task
      }
    }

    if (creep.carry.energy > 0 && creep.room.controller.ticksToDowngrade < 4500 && _.indexOf(roles, 'u') > -1) {
      newTask = 'u'
    }

    creep.say(newTask)
    creep.memory.t = newTask
    this.runTask(creep)
  },

  getResource: function (creep, resource = RESOURCE_ENERGY) {
    let room = creep.room
    let obj = { target: null, path: null }
    let resources = room.memory.resources

    if ((room.memory.resTime || 0) < Game.time) {
      let slength = 1e999
      let resList = []
      let prio = false

      _.forEach(room.find(FIND_DROPPED_RESOURCES), (res) => {
        resList.push(res.id)

        if (res.canClaim(creep)) {
          let path = creep.findPathTo(res.pos)

          if (path.length && path.length < slength) {
            slength = path.length
            obj.target = res
            obj.path = path
            prio = true
          }
        }
      })

      _.forEach(room.find(FIND_STRUCTURES, { filter: (r) => { return r.structureType === 'container' } }), (res) => {
        resList.push(res.id)
        if (!(res.store.energy == res.storageCapacity || res.store.energy >= creep.carryCapacity)) { return }

        let path = creep.findPathTo(res.pos)

        if (res.canClaim(creep)) {
          let path = creep.findPathTo(res.pos)

          if (path.length && path.length < slength) {
            slength = path.length
            obj.target = res
            obj.path = path
            prio = true
          }
        }
      })

      room.memory.resources = resList
      room.memory.resTime = Game.time + 10
    } else {
      let s = []
      _.each(resources, (x) => {
        x = Game.getObjectById(x)
        if (x != undefined) {
          let b1 = x instanceof StructureContainer && (x.store.energy == x.storageCapacity || x.store.energy >= creep.carryCapacity)
          let b2 = x instanceof Resource
          if (x.canClaim(creep) && (b1 || b2)) { s.push(x) }
        }
      })
      obj = findClosest(room, creep, s)
    }

    return obj.target == null ? false : obj
  },

  getSource: function (creep, resource = RESOURCE_ENERGY) {
    let room = creep.room
    let obj = { target: null, path: null }
    let sources = room.memory.sources

    if (!sources) {
      let slength = 1e999
      let resList = []

      _.forEach(room.find(FIND_SOURCES), (res) => {
        resList.push(res.id)
        if (!res.isOwned() || res.isOwned().id == creep.id) {
          let path = creep.findPathTo(res.pos)
          if (path.length < slength) {
            slength = path.length
            obj.target = res
            obj.path = path
          }
        }
      })

      room.memory.sources = resList
    } else {
      let s = []
      _.each(sources, (x) => {
        x = Game.getObjectById(x)
        if (!x.isOwned() || x.isOwned().id == creep.id) { s.push(x) }
      })
      obj = findClosest(room, creep, s)
    }

    return obj.target == null ? false : obj
  }
}

function findClosest(room, creep, targetR) {
  if (!targetR.length) { return false }

  let shortest = { target: null, path: null }
  let slength = 1e999

  _.forEach(targetR, (target) => {
    let path = creep.findPathTo(target.pos)

    if (path.length && path.length < slength) {
      slength = path.length
      shortest.target = target
      shortest.path = path
    }
  })

  return shortest.target == null ? false : shortest
}

creepHandler.findClosest = findClosest


module.exports = creepHandler