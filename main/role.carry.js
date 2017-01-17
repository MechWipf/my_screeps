module.exports = {
  run: function (handler, creep) {
    if (creep.carry.energy == 0) {
      handler.nextTask(creep, 'h')
      return
    }

    let target = creep.getTarget()

    if (target && creep.getTask() == 'c') {
      switch (creep.transfer(target, RESOURCE_ENERGY)) {
        case ERR_NOT_IN_RANGE: { creep.moveAlongPath(); break }
        default: { creep.clearTarget() }
      }
    } else {
      var targets = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      })

      if (targets.length == 0) {
        handler.nextTask(creep)
        return
      }

      let o = handler.findClosest(creep.room, creep.pos, targets)
      if (!o) return;
      creep.setTarget(o.target, o.path, 'c')
    }
  }
}