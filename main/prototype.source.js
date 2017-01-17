Source.prototype.setOwner = function (creep) {
  if (Memory.sources == undefined) { Memory.sources = {} }

  if (Memory.sources[this.id] == undefined) {
    Memory.sources[this.id] = {}
  }

  Memory.sources[this.id].owner = creep.id
}

Source.prototype.isOwned = function () {
  if (Memory.sources == undefined) { Memory.sources = {} }

  if (Memory.sources[this.id] == undefined) { return false }
  if (Memory.sources[this.id].owner == undefined) { return false }

  let creep = Game.getObjectById(Memory.sources[this.id].owner)
  return creep == undefined ? false : creep
}