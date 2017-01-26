'use strict'

// Additions do base classes
require('prototype.creep')
require('prototype.source')
require('prototype.resource')
require('prototype.container')

// Some other stuff i need here
const conf = require('conf')
const creepHandler = require('creepHandler')
const helper = require('helper')


helper.clean()
creepHandler.init()
Game.creepHandler = creepHandler

module.exports.loop = function () {
  PathFinder.use(true)
  creepHandler.run()

  _.each(Game.rooms, room => {
    let hostile = room.find(FIND_HOSTILE_CREEPS)
    if (hostile.length == 0) { return }
    _.each(room.find(FIND_MY_STRUCTURES, { filter: s => { return s.structureType == STRUCTURE_TOWER } }), tower => {
      tower.attack(hostile[0])
    })
  })
}