'use strict'

const helper = require('helper')

let roleBuild = {
  run: function (handler, creep) {
    if (creep.c.carry.energy == 0) {
      handler.nextTask(creep.c, 'h')
      return
    }

    let target = creep.getTarget()

    if (target && _.intersection([creep.getTask()], ['repair', 'construction']).length == 1) {
      let res = 0

      switch (creep.getTask()) {
        case 'construction': { res = creep.c.build(target); break }
        case 'repair': { res = creep.c.repair(target); if (target.hits < target.hitsMax) { break } }
        default: { res = -1 }
      }

      switch (res) {
        case OK: { getJob(creep); break }
        case ERR_NOT_IN_RANGE: { creep.move(); break }
        default: { creep.clearTarget(), handler.nextTask(creep.c) }
      }
    } else {
      if (!getJob(creep)) {
        handler.nextTask(creep.c);
      }
    }
  }
}

function getJob(creep) {
  let o = helper.getTarget(creep.c, 'repair')
  if (o) {
    creep.setTarget(o.target, o.path, 'repair')
    return true
  }

  o = helper.getTarget(creep.c, 'construction')
  if (o) {
    creep.setTarget(o.target, o.path, 'construction')
    return true
  }

  return false
}

module.exports = roleBuild