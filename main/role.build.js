const helper = require('helper')

let roleBuild = {
  run: function (handler, creep) {
    this.handler = handler

    if (creep.carry.energy == 0) {
      this.clear(creep, 'h')
      creep.say('\u2615', true)
      return
    }

    if (creep.memory.object == null) {
      if (helper.getTarget(creep, 'construction') === false) {
        this.clear(creep)
        return
      }
    }

    if (creep.memory.range < 3) {
      let obj = Game.getObjectById(creep.memory.object)
      switch (creep.build(obj)) {
        case 0: {
          break
        }
        case ERR_NOT_IN_RANGE: {
          helper.move(creep)
          break
        }
        default: {
          this.clear(creep)
        }
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