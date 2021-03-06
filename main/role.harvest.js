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
      case H_TASK_SEARCH: {}
      default: {
        if (!((creep.memory.timeout || 0) < Game.time)) { break }
        creep.memory.timeout = Game.time + Math.random(0,1)*10

        creep.clearTasks()
        if (creep.getRoles().length > 1) {
          let res = handler.getResource(creep, RESOURCE_ENERGY)
          if (res) {
            creep.setTarget(res.target, res.path)
            creep.setTask(H_TASK_MOVE)
            creep.pushTask(H_TASK_HAUL)
            creep.say('\u26aa')
            res.target.claim(creep)
            break
          }
        }

        let res = handler.getSource(creep, RESOURCE_ENERGY)
        if (res) {
          creep.setTarget(res.target, res.path)
          creep.setTask(H_TASK_MOVE)
          creep.pushTask(H_TASK_MINE)
          creep.say('\u26cf')

          if (creep.getRoles().length == 1) { res.target.setOwner(creep) }
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
            let storage
            try { storage = Game.getObjectById(creep.memory.storage) } catch (err) { storage = false }
            if (storage) {
              creep.transfer(storage, RESOURCE_ENERGY)
              if (storage.store.energy === storage.storeCapacity) { break }
            } else {
              storage = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (x) => { return x.structureType == 'container' && x.pos.getRangeTo(creep) < 2 } })
              if (storage) {
                creep.transfer(storage, RESOURCE_ENERGY)
                creep.memory.storage = storage.id
                if (storage.store.energy === storage.storeCapacity) { break }
              } else {
                let construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, { filter: (x) => { return x.pos.getRangeTo(creep) < 2 } })
                if (construction) {
                  creep.build(construction)
                }
              }
            }

          }
        }

        if (creep.harvest(target) != OK) {
          creep.setTask(H_TASK_SEARCH)
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

          if (target) {
            target.rewokeClaim(creep)
          }

          if (r != OK) { creep.setTask(H_TASK_SEARCH) }
        }
        break
      }
    }
  },
}