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

module.exports.loop = function () {
  PathFinder.use(true)
  creepHandler.run()
}