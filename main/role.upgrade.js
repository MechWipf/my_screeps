module.exports = {
  run: function (handler, creep) {
    if (creep.carry.energy == 0) {
      handler.nextTask(creep, 'h')
      return
    }

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  }
}