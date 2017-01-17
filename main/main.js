'use strict'

const conf = require('conf')
const creepHandler = require('creepHandler')
const helper = require('helper')

helper.clean()
creepHandler.init()

module.exports.loop = function () {
  PathFinder.use(true)
  try { creepHandler.run() } catch (err) { console.log(err) }
}