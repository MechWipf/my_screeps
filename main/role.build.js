const helper = require('helper')

let roleBuild = {
  run: function (handler, creep) {
    this.handler = handler

    if (creep.carry.energy == 0) {
      this.clear(creep, 'h')
      return
    }

    if (creep.memory.object == null) {
      helper.getTarget(creep, 'repair')
    }

    if (creep.memory.object == null) {
      helper.getTarget(creep, 'construction')
    }

    if (creep.memory.object == null) {
      this.clear(creep)
      return
    }

    if (creep.memory.range < 3) {
      let obj = Game.getObjectById(creep.memory.object)
      let res = 0

      switch (creep.memory.lastfind) {
        case 'construction': { res = creep.build(obj); break }
        case 'repair': { res = creep.repair(obj); if (obj.hits > obj.hitsMax * 0.95) { res = -1 } else { break } }
        default: { res = -1 }
      }

      switch (res) {
        case 0: { break }
        case ERR_NOT_IN_RANGE: { helper.move(creep); break }
        default: { this.clear(creep) }
      }
    } else {
      helper.move(creep)
    }
  },

  clear: function (creep, task) {
    delete creep.memory.path
    delete creep.memory.object
    this.handler.nextTask(creep, task)
  }
}

module.exports = roleBuild