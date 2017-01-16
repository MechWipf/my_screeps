'use strict'

const conf = require('conf')
const creepHandler = require('creepHandler')
const helper = require('helper')

helper.clean()
creepHandler.init()

module.exports.loop = function () {
  let creepCount = 0

  _.each(Game.creeps, function (creep, name) {
    creepCount++
    creepHandler.run(creep)
  })

  if (creepCount < 5) {
    creepHandler.spawn()
  }
}