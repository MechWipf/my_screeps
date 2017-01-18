'use strict'

Resource.prototype.claim = function (creep) {
  if (this.memory.claims == undefined) { this.memory.claims = [] }
  this.memory.claims.push(creep.id)
  this.memory.claimCount = this.memory.claimCount || 0 + creep.carryCapacity
}

Resource.prototype.canClaim = function (creep) {
  if (this.memory.claims == undefined) { this.memory.claims = [] }

  let claims = this.memory.claims

  if (this.memory.claimTimer || 0 < Game.time) {
    this.memory.claimTimer = Game.time + 1
    let claimCount = 0

    _.each(claims, (x, i) => {
      let c = Game.getObjectById(x)
      if (!c) { claims.shift(i) }
      else { claimCount += c.carryCapacity }
    })

    this.memory.claimCount = claimCount
    this.memory.claims = claims
  }

  return this.memory.claimCount || 0 + creep.carryCapacity <= this.amount
}

Resource.prototype.rewokeClaim = function (creep) {
  if (this.memory.claims == undefined) { this.memory.claims = [] }

  this.memory.claimTimer = Game.time + 1
  let claims = this.memory.claims
  let claimCount = 0

  _.each(claims, (x, i) => {
    let c = Game.getObjectById(x)
    if (!c || c.id == creep.id) { claims.shift(i) }
    else { claimCount += c.carryCapacity }
  })

  this.memory.claimCount = claimCount
  this.memory.claims = claims

  return true
}

Object.defineProperty(Resource.prototype, 'memory', {
  get: function () { if (Memory.resources[this.id] == undefined) { Memory.resources[this.id] = {} } return Memory.resources[this.id] },
  set: function (v) { Memory.resources[this.id] = v },
})

if (Memory.resources == undefined) {
  Memory.resources = {}
}