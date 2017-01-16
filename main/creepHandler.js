'use strict'

const conf = require('conf')
const helper = require('helper')

let creepHandler = {
  roles: {},
  time: {},
  resources: {},

  run: function () {
    let creepCount = 0
    let creepCountByType = {}

    _.forEach(Game.creeps, (creep) => {
      let myCreep = new helper.CreepObject(creep)

      creepCount++

      if (!creepCountByType[myCreep.getMainRole()]) {
        creepCountByType[myCreep.getMainRole()] = 1
      } else {
        creepCountByType[myCreep.getMainRole()] = creepCountByType[myCreep.getMainRole()] + 1
      }

      if (creep.memory.t == undefined) {
        creep.memory.t = '-'
      }

      let task = creep.memory.t
      let roles = creep.memory.r

      if (task === "-") {
        if (creep.room.controller.ticksToDowngrade < 4500 && _.indexOf(roles, 'u') > -1) {
          this.nextTask(creep, 'u')
        } else {
          this.nextTask(creep, roles[0])
        }
      } else if (this.roles[task]) {
        this.roles[task].run(this, myCreep)
      } else {
        this.nextTask(creep)
      }
    })

    if ((creepCountByType[''] || 0) < 3) {
      this.spawn()
    } else if (creepCount < 4 && (creepCountByType['miner'] || 0) < 1) {
      this.spawn('miner')
    }
  },

  init: function () {
    _.forEach(conf.roles, (k) => {
      try {
        this.roles[k.substr(0, 1)] = require('role.' + k)
      } catch (err) {
        console.log('Failed to load role "' + k + '"')
      }
    })
  },

  spawn: function (spawnType) {
    let spawn
    for (let i in Game.spawns) {
      spawn = Game.spawns[i]
      break
    }

    switch (spawnType) {
      case 'miner': {
        spawn.createCreep([WORK, WORK, CARRY, MOVE], null, { type: 'miner', t: '-', r: ['h'] })
        break
      }
      default: {
        spawn.createCreep([WORK, CARRY, MOVE, MOVE], null, { type: '', t: '-', r: ['h', 'c', 'b', 'u'] })
        break
      }
    }
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
  },

  getResource: function (creep, resources = RESOURCE_ENERGY, noDrop = false) {
    let room = creep.room
    let obj = { target: null, path: null }

    if ((this.time[room.id] || 0) < Game.time) {
      let slength = 1e999
      let resList = []

      _.forEach(room.find(FIND_DROPPED_RESOURCES), (res) => {
        resList.push(res)

        if (!noDrop) {
          let path = getPath(room, creep.pos, res.pos)

          if (path.length && path.length < slength) {
            slength = path.length
            obj.target = res
            obj.path = path
          }
        }
      })

      _.forEach(room.find(FIND_SOURCES), (res) => {
        resList.push(res)

        let path = getPath(room, creep.pos, res.pos)

        if (path.length && path.length < slength) {
          slength = path.length
          obj.target = res
          obj.path = path
        }
      })

      this.time[room] = Game.time + 5
      room.memory.resources = resList
      this.resources[room.id] = resList
    } else {
      let path = findClosest(room, creep.pos, this.resources[room.id])
    }

    return obj.target == null ? false : obj
  }
}

function findClosest(room, sourcePos, targetR) {
  let shortest = { target: null, path: null }
  let slength = 1e999

  _.forEach(targetR, (target) => {
    let path = getPath(room, sourcePos, target.pos)

    if (path.length && path.length < slength) {
      slength = path.length
      shortest.target = target
      shortest.path = path
    }
  })

  return shortest.target == null ? false : shortest
}

function getPath(room, sourcePos, targetPos) {
  let path = room.findPath(sourcePos, targetPos, { maxOps: 100 })
  if (!path.length || !targetPos.isEqualTo(path[path.length - 1])) {
    path = room.findPath(sourcePos, targetPos, { maxOps: 500 })
  }

  return path
}

creepHandler.findClosest = findClosest
creepHandler.findPath = getPath

module.exports = creepHandler