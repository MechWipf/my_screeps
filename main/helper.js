'use strict'

let helper = {
  clean: function () {
    let l = [
      'resources',
      'structureContainers',
      'creeps',
      'spawns'
    ]

    _.each(l, (chunk) => {
      _.each(Memory[chunk], (v, x) => {
        switch (chunk) {
          case 'creeps': {
            if (Game.creeps[x] == undefined) {
              delete Memory[chunk][x]
              console.log('removed ', chunk, x)
            }
            break
          }
          case 'spawns': {
            if (Game.spawns[x] == undefined) {
              delete Memory[chunk][x]
              console.log('removed ', chunk, x)
            }
            break
          }
          default: {
            if (Game.getObjectById(x) == undefined) {
              delete Memory[chunk][x]
              console.log('removed ', chunk, x)
            }
            break
          }
        }
      })
    })
  },

  getTarget: function (creep, type, ressource) {
    if (creep === undefined || type == undefined) {
      return false;
    }
    var object = null;
    switch (type) {
      case 'spawner': {
        object = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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
        object = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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
module.exports = helper