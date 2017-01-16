let helper = {
  clean: function () {
    var toReturn = false;
    // Always place this memory cleaning code at the very top of your main loop!
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
        toReturn = true;
      }
    }
    return toReturn;
  },

  getTarget: function (creep, type, ressource) {
    if (creep === undefined || type == undefined) {
      return false;
    }
    var object = null;
    switch (type) {
      case 'spawner': {
        object = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
          }
        });
        if (object === null) {
          return false;
        }
        return { target: object, path: creep.pos.findPathTo(object.pos) }
        break;
      }
      case 'tower': {
        object = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
          }
        });
        if (object === null) {
          return false;
        }
        return { target: object, path: creep.pos.findPathTo(object.pos) }
        break;
      }
      case 'construction': {
        object = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (object === null) {
          return false;
        }
        return { target: object, path: creep.pos.findPathTo(object.pos) }
        break;
      }
      case 'repair': {
        object = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: function (object) {
            if ((object.structureType === STRUCTURE_ROAD || object.structureType === STRUCTURE_STORAGE || object.structureType === STRUCTURE_CONTAINER) && object.hits < object.hitsMax * 0.95) {
              return true
            }

            return false;
          }
        });
        if (object === null) {
          return false;
        }
        return { target: object, path: creep.pos.findPathTo(object.pos) }
        break;
      }
      case 'controller':
        {
          var controller = creep.room.controller;
          return { target: object, path: creep.pos.findPathTo(object.pos) }
          break;
        }
    }

    return false;
  }
};

function CreepObject(creep) {
  this.c = creep
}

CreepObject.prototype.move = function () {
  switch (this.c.moveByPath(this.c.memory.target.path)) {
    case OK: {
      this.c.memory.target.range = this.c.memory.target.range - 1
      break
    }
    default: {
      this.recalcPath()
      break
    }
  }

  if (this.c.memory.target.time < Game.time) {
    this.recalcPath()
  }
}

CreepObject.prototype.getTarget = function () {
  let targetObj = false

  try {
    targetObj = Game.getObjectById(this.c.memory.target.obj)
  } catch (err) { }

  return targetObj
}

CreepObject.prototype.setTarget = function (obj, path, task) {
  if (!path) path = this.c.pos.findPathTo(obj);

  let target = {
    obj: obj.id,
    path: Room.serializePath(path),
    range: path.length,
    time: Game.time + 3 + Math.round(Math.random(0, 1) * 5)
  }

  if (task) target.task = task;

  this.c.memory.target = target

  return true
}

CreepObject.prototype.clearTarget = function () {
  delete this.c.memory.target
}

CreepObject.prototype.getRange = function () {
  return this.c.memory.target.range
}

CreepObject.prototype.getTask = function () {
  try {
    return this.c.memory.target.task
  } catch (err) {
    return ''
  }
}

CreepObject.prototype.recalcPath = function () {
  let target = this.getTarget()
  if (!target) {
    delete this.c.memory.target
    return false
  }

  let path = this.c.pos.findPathTo(target)
  this.c.memory.target.path = Room.serializePath(path)
  this.c.memory.target.range = path.length
  this.c.memory.target.time = Game.time + 3 + Math.round(Math.random(0, 1) * 5)

  return true
}

CreepObject.prototype.getCurrentRole = function () {
  return this.c.memory.c
}

CreepObject.prototype.setCurrentRole = function (role) {
  if (_.intersection([role], this.c.memory.r).length == 1) {
    this.c.memory.c = role
    return true
  }

  return false
}

CreepObject.prototype.getRoles = function () {
  return this.c.memory.r
}

CreepObject.prototype.getMainRole = function () {
  return this.c.memory.type
}

helper.CreepObject = CreepObject

module.exports = helper