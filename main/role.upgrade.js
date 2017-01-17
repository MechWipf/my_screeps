module.exports = {
  run: function (handler, creep) {
    if (creep.carry.energy == 0) {
      handler.nextTask(creep, 'h')
      return
    }

    let target = creep.getTarget()

    if (target && creep.getTask() == 'u') {
      if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
        creep.moveAlongPath()
      }
    } else
      creep.setTarget(creep.room.controller, null, 'u');
  }
}