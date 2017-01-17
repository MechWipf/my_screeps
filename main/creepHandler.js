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
    })

    if ((creepCountByType[''] || 0) < 3) {
      this.spawn()
    } else if (creepCount < 4 && (creepCountByType['miner'] || 0) < 1) {
      this.spawn('miner')
    }
  },

  runTask: function (creep) {
    let task = creep.memory.t
    let roles = creep.memory.r

    if (task === "-") {
      if (creep.room.controller.ticksToDowngrade < 4500 && _.indexOf(roles, 'u') > -1) {
        this.nextTask(creep, 'u')
      } else {
        this.nextTask(creep, roles[0])
      }
    } else if (this.roles[task]) {
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

  spawn: function (spawnType) {
    let spawn
    for (let i in Game.spawns) {
      spawn = Game.spawns[i]
      break
    }


    if (!(((spawn.room.memory.spawnTimer || 0) < Game.time) || spawn.room.energyAvailable == spawn.room.energyCapacityAvailable)) {
      return
    }

    let cost = 0
    let maxCost = spawn.room.energyAvailable

    switch (spawnType) {
      case 'miner': {
        let pattern = [WORK, WORK, CARRY, MOVE]
        cost = 300

        while (cost + 50 <= maxCost) {
          let diff = maxCost - cost

          if (diff >= 100) {
            pattern.push(WORK)
            cost += 100
          } else if (diff >= 50) {
            pattern.push(CARRY)
            cost += 50
          }

        }

        spawn.createCreep(pattern, null, { type: 'miner', t: '-', r: ['h'] })
        break
      }
      default: {
        let pattern = [WORK, CARRY, MOVE, MOVE]
        cost = 250

        while (cost + 100 <= maxCost) {
          cost += 100
          pattern.push(CARRY, MOVE)
        }

        spawn.createCreep(pattern, null, { type: '', t: '-', r: ['h', 'c', 'b', 'u'] })
        break
      }
    }

    spawn.room.memory.spawnTimer = Game.time + cost / 2
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
        if (res.amount < 100) { return false }
        resList.push(res.id)

        let path = creep.findPathTo(res.pos)

        if (path.length && path.length < slength) {
          slength = path.length
          obj.target = res
          obj.path = path
          prio = true
        }
      })

      _.forEach(room.find(FIND_MY_STRUCTURES, { filter: (r) => { return r.structureType === 'container' } }), (res) => {
        resList.push(res.id)

        let path = creep.findPathTo(res.pos)

        if (path.length && path.length < slength) {
          slength = path.length
          obj.target = res
          obj.path = path
          prio = true
        }
      })

      room.memory.resource = resList
      room.memory.resTime = Game.time + 10
    } else {
      let s = _.map(resources, (v, k) => { return Game.getObjectById(v) })
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

        let path = creep.findPathTo(res.pos)

        if (path.length < slength) {
          slength = path.length
          obj.target = res
          obj.path = path
        }
      })

      room.memory.sources = resList
    } else {
      let s = _.map(sources, (v, k) => { return Game.getObjectById(v) })
      obj = findClosest(room, creep, s)
    }

    return obj.target == null ? false : obj
  }
}

function findClosest(room, creep, targetR) {
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