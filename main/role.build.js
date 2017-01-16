const helper = require('helper')

let roleBuild = {
  run: function (handler, creep) {
    this.handler = handler

    if (creep.c.carry.energy == 0) {
      handler.nextTask(creep.c, 'h')
      return
    }

    if (_.intersection([creep.getTask()], ['repair', 'construction']).length == 0) {
      creep.clearTarget()
    }

    if (!creep.getTarget()) {
      let o = helper.getTarget(creep.c, 'repair')
      if (o) creep.setTarget(o.target, o.path, 'repair');
    }

    if (!creep.getTarget()) {
      let o = helper.getTarget(creep.c, 'construction')
      if (o) creep.setTarget(o.target, o.path, 'construction');
    }

    if (!creep.getTarget()) {
      creep.clearTarget()
      handler.nextTask(creep.c)
      return
    }

    if (creep.getRange() < 3) {
      let obj = creep.getTarget()
      let res = 0

      switch (creep.getTask()) {
        case 'construction': { res = creep.c.build(obj); break }
        case 'repair': { res = creep.c.repair(obj); if (obj.hits == obj.hitsMax) { res = -1 } else { break } }
        default: { res = -1 }
      }

      switch (res) {
        case 0: { break }
        case ERR_NOT_IN_RANGE: { creep.move(); break }
        default: { creep.clearTarget(), handler.nextTask(creep.c) }
      }
    } else {
      creep.move()
    }
  }
}

module.exports = roleBuild