'use strict'

const conf = require('conf')

let creepHandler = {
  roles: {},

  run: function (creep) {
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
        console.log('Failed to load role "' + k + '"')
      }
    })
  },

  spawn: function () {


    for (let i in Game.spawns) {
      let spawn = Game.spawns[i]
      spawn.createCreep([WORK, CARRY, MOVE, MOVE], null, { type: '', t: '-', r: ['h', 'c', 'b', 'u'] })
      break
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

  getRessource: function (creep, ressource) {
    ressource = ressource || 'energy'
  }
}

module.exports = creepHandler