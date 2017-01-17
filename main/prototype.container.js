'use strict'

StructureContainer.prototype.claim = function (creep) {
  if (this.memory.claims == undefined) { this.memory.claims = [] }
  this.memory.claims.push(creep.id)
  this.memory.claimCount = this.memory.claimCount | 0 + creep.carryCapacity
}

StructureContainer.prototype.canClaim = function (creep) {
  if (this.memory.claims == undefined) { this.memory.claims = [] }

  let claims = this.memory.claims

  if (this.memory.claimTimer || 0 < Game.time) {
    this.memory.claimTimer = Game.time + 1
    let claimCount = 0

    _(claims).each((x, i) => {
      let c = Game.getObjectById(x)
      if (!c) { delete claims[i] }
      else { claimCount = claimCount + c.carryCapacity }
    })

    this.memory.claimCount = claimCount
    this.memory.claims = claims
  }

  return this.memory.claimCount + creep.carryCapacity <= _(this.store).sum()
}

StructureContainer.prototype.rewokeClaim = function (creep) {
  if (this.memory.claims == undefined) { this.memory.claims = [] }

  this.memory.claimTimer = Game.time + 1  
  let claims = this.memory.claims
  let claimCount = 0

  _(claims).each((x, i) => {
    let c = Game.getObjectById(x)
    if (!c || c.id == creep.id) { delete claims[i] }
    else { claimCount = claimCount + c.carryCapacity }
  })

  this.memory.claimCount = claimCount
  this.memory.claims = claims

  return true
}

Object.defineProperty(StructureContainer.prototype, 'memory', {
  get: function () { if (Memory.structureContainers[this.id] == undefined) { Memory.structureContainers[this.id] = {} } return Memory.structureContainers[this.id] },
  set: function (v) { Memory.structureContainers[this.id] = v }
})

if (Memory.structureContainers == undefined) {
  Memory.structureContainers = {}
}