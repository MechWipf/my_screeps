
Creep.prototype.moveAlongPath = function () {
  switch (this.moveByPath(this.memory.target.path)) {
    case OK: {
      this.memory.target.range = this.memory.target.range - 1
      break
    }
    default: {
      this.recalcPath()
      break
    }
  }

  if (this.memory.target.time < Game.time) {
    this.recalcPath()
  }
}

Creep.prototype.getTarget = function () {
  let targetObj = false

  try {
    targetObj = Game.getObjectById(this.memory.target.obj)
  } catch (err) { }

  return targetObj
}

Creep.prototype.setTarget = function (obj, path, task) {
  if (!path) path = this.findPathTo(obj)

  let target = {
    obj: obj.id,
    path: Room.serializePath(path),
    range: path.length,
    time: Game.time + 3 + Math.round(Math.random(0, 1) * 5)
  }

  if (task) { this.setTask(task) }

  this.memory.target = target

  return true
}

Creep.prototype.clearTarget = function () {
  delete this.memory.target
}

Creep.prototype.getRange = function () {
  return this.memory.target.range
}

Creep.prototype.setTask = function (task) {
  try {
    if (this.memory.task == undefined) { this.memory.task = [] }
    this.memory.task[0] = task
  } catch (err) {
    this.memory.task = [task]
  }
}

Creep.prototype.pushTask = function (task) {
  try {
    this.memory.task.push(task)
  } catch (err) {
    this.setTask(task)
  }
}

Creep.prototype.popTask = function (task) {
  try {
    return this.memory.task.shift(0)
  } catch (err) {
    return false
  }
}

Creep.prototype.getTask = function () {
  try {
    return this.memory.task[0]
  } catch (err) {
    return false
  }
}

Creep.prototype.clearTasks = function () {
  try {
    delete this.memory.task
    return true
  } catch (err) {
    return false
  }
}

Creep.prototype.recalcPath = function () {
  let target = this.getTarget()
  if (!target) {
    delete this.memory.target
    return false
  }

  let path = this.findPathTo(target)
  this.memory.target.path = Room.serializePath(path)
  this.memory.target.range = path.length
  this.memory.target.time = Game.time + 3 + Math.round(Math.random(0, 1) * 5)

  return true
}

Creep.prototype.getCurrentRole = function () {
  return this.memory.c
}

Creep.prototype.setCurrentRole = function (role) {
  if (_.intersection([role], this.memory.r).length == 1) {
    this.memory.c = role
    return true
  }

  return false
}

Creep.prototype.getRoles = function () {
  return this.memory.r
}

Creep.prototype.getMainRole = function () {
  return this.memory.type
}

Creep.prototype.findPathTo = function (target, opts = { maxOps: 100 }) {
  try {
    let room = this.room
    let targetPos = target instanceof RoomPosition ? target : target.pos
    let path = room.findPath(this.pos, targetPos, opts)

    if (!path.length) {
      opts.maxOps = 500
      opts.ignoreCreeps = true
      path = room.findPath(this.pos, targetPos, opts)
    }

    return path
  } catch (err) {
    console.log('Pathfinder error: ', err)
    return []
  }
}