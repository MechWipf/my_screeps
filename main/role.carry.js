module.exports = {
  run: function (handler, creep) {
    if (creep.c.carry.energy == 0) {
      handler.nextTask(creep.c, 'h')
      return
    }

    let target = creep.getTarget()

    if (target && creep.getTask() == 'c') {
      switch (creep.c.transfer(target, RESOURCE_ENERGY)) {
        case ERR_NOT_IN_RANGE: { creep.move(); break }
        default: { creep.clearTarget() }
      }
    } else {
      var targets = creep.c.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      })

      if (targets.length == 0) {
        handler.nextTask(creep.c)
        return
      }

      let o = handler.findClosest(creep.c.room, creep.c.pos, targets)
      if (!o) return;
      creep.setTarget(o.target, o.path, 'c')
    }
  }
}