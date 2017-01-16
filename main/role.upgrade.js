module.exports = {
  run: function (handler, creep) {
    if (creep.c.carry.energy == 0) {
      handler.nextTask(creep.c, 'h')
      return
    }

    let target = creep.getTarget()

    if (target && creep.getTask() == 'u') {
      if (creep.c.upgradeController(target) == ERR_NOT_IN_RANGE) {
        creep.move()
      }
    } else
      creep.setTarget(creep.c.room.controller, null, 'u');
  }
}