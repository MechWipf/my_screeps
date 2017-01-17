'use strict'

const helper = require('helper')
const hasTarget = helper.hasTarget
const move = helper.move

const H_TASK_SEARCH = 'h_search'
const H_TASK_HAUL = 'h_haul'
const H_TASK_MINE = 'h_mine'
const H_TASK_MOVE = 'h_move'

module.exports = {
  run: function (handler, creep) {
    let task = creep.getTask()
    let target = creep.getTarget()

    switch (task) {
      case H_TASK_SEARCH: { }
      default: {
        creep.clearTasks()
        if (creep.getRoles().length > 1) {
          let res = handler.getResource(creep, RESOURCE_ENERGY)
          if (res) {
            creep.setTarget(res.target, res.path)
            creep.setTask(H_TASK_MOVE)
            creep.pushTask(H_TASK_HAUL)
            creep.say('\u26aa')
            break
          }
        }

        let res = handler.getSource(creep, RESOURCE_ENERGY)
        if (res) {
          creep.setTarget(res.target, res.path)
          creep.setTask(H_TASK_MOVE)
          creep.pushTask(H_TASK_MINE)
          creep.say('\u26cf')
        } else {
          creep.say('\u274c')
        }

        break
      }
      case H_TASK_MOVE: {
        if (creep.pos.getRangeTo(target) > 1) {
          creep.moveAlongPath()
        } else {
          creep.popTask()
        }
        break
      }
      case H_TASK_MINE: {
        if (creep.carry.energy >= creep.carryCapacity) {
          if (creep.getRoles().length > 1) { handler.nextTask(creep); break }
          else {
            let storage = creep.memory.storage
            if (storage) {
              try {
                storage = Game.getObjectById(creep.memory.storage)
                creep.transfer(storage, RESOURCE_ENERGY)
                creep.say(Math.floor((storage.store.energy+creep.carry.energy)/storage.storeCapacity*100)+'%')
                if (storage.store.energy === storage.storeCapacity) {break}
              } catch (err) {
                creep.say('..?')
                delete creep.memory.storage
              }
            } else {
              storage = creep.pos.findClosestByRange(FIND_STRUCTURES, { structureType: 'container' }, 1)
              creep.transfer(storage, RESOURCE_ENERGY)
              creep.memory.storage = storage.id
              creep.say(Math.floor((storage.store.energy+creep.carry.energy)/storage.storeCapacity*100)+'%')
              if (storage.store.energy === storage.storeCapacity) {break}
            }

          }
        }

        if (creep.harvest(target) != OK) {
          creep.setTask('h_search')
        }
        break
      }
      case H_TASK_HAUL: {
        if (creep.carry.energy >= creep.carryCapacity) {
          if (creep.getRoles().length > 1) { handler.nextTask(creep) }
        } else {
          let r
          if (target instanceof Structure) {
            r = creep.withdraw(target, RESOURCE_ENERGY)
          } else {
            r = creep.pickup(target)
          }

          if (r != OK) { creep.setTask('h_search') }
        }
        break
      }
    }
  },
}