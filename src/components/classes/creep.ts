import * as Config from '../../config/general'
// import { log } from '../support/log'
import { MixinTaskable, ITaskable } from './task'
import { Roles } from '../../config/creep'

declare global {
  interface Creep extends ITaskable {
    run(): void
    getRole(): string
    getRoleTasks(): string[]
  }
}
// We extend ITaskable so we should get the methods, too.
MixinTaskable(Creep)

Creep.prototype.run = function (this: Creep) {
  let doNext = true

  while (doNext) {
    doNext = false

    let task = this.taskShift()
    if (task && task.time >= Game.time) { doNext = this.taskRun(task) }
    else if (task) { this.taskUnshift(task) }
  }
}

Creep.prototype.getRole = function (this: Creep) {
  let roleName = this.memory.role
  let role = Roles[roleName]
  if (!role) { throw "Creep without role: " + this.name }

  return roleName
}

Creep.prototype.getRoleTasks = function (this: Creep) {
  // getRole has error checking
  let role = this.getRole()
  let roleTasks = Roles[role]['tasks'] as string[]

  return roleTasks
}


Creep.prototype.tasks = {}
// This will register all our tasks this creep can do
for (let role of Config.CREEP_ROLES) {
  require('../roles/' + role).register()
}