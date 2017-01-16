'use strict'

const helper = require('helper')
const hasTarget = helper.hasTarget
const move = helper.move

module.exports = {
  run: function (handler, creep) {
    let target = creep.getTarget()

    if (target && creep.getTask() == 'h') {
      if (creep.c.carry.energy >= creep.c.carryCapacity) {
        if (creep.getRoles().length > 1) {
          handler.nextTask(creep.c)
        } else {
          switch (creep.c.harvest(target)) {
            case OK: { break }
            case ERR_NOT_IN_RANGE: { creep.move(); break }
            default: { creep.clearTarget(); break }
          }
        }
      } else if (creep.c.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.move()
      } else if (creep.c.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.move()
      }
    } else {
      let res = handler.getResource(creep.c, RESOURCE_ENERGY, creep.getRoles().length == 1)
      if (res) creep.setTarget(res.target, res.path, 'h');
    }
  }
}