'use strict'

const helper = require('helper')

let roleBuild = {
  run: function (handler, creep) {
    if (creep.carry.energy == 0) {
      handler.nextTask(creep, 'h')
      return
    }

    let target = creep.getTarget()

    if (target && _.intersection([creep.getTask()], ['repair', 'construction']).length == 1) {
      let res = 0

      switch (creep.getTask()) {
        case 'construction': { res = creep.build(target); break }
        case 'repair': { res = creep.repair(target); if (target.hits < target.hitsMax) { break } }
        default: { res = -1 }
      }

      switch (res) {
        case OK: { break }
        case ERR_NOT_IN_RANGE: { creep.moveAlongPath(); break }
        default: { if (!getJob(creep)) { creep.clearTarget(), handler.nextTask(creep) } }
      }
    } else {
      if (!getJob(creep)) {
        handler.nextTask(creep);
      }
    }
  }
}

function getJob(creep) {
  let o = helper.getTarget(creep, 'repair')
  if (o) {
    creep.setTarget(o.target, o.path, 'repair')
    return true
  }

  o = helper.getTarget(creep, 'construction')
  if (o) {
    creep.setTarget(o.target, o.path, 'construction')
    return true
  }

  return false
}

module.exports = roleBuild