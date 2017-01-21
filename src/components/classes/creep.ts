import * as Config from '../../config'
// import { log } from '../support/log'
import { MixinTaskable, ITaskable } from './task'

declare global {
  interface Creep extends ITaskable {
    run(): void
  }
}
// We extend ITaskable so we should get the methods too
MixinTaskable(Creep)

Creep.prototype.run = function (this: Creep) {
  let task = this.taskShift()
  if (task && task.time >= Game.time) { this.taskRun(task) }
  else if (task) { this.taskUnshift(task) }
  else {
    this.taskUnshift(1, 'h_search')
  }
}


Creep.prototype.tasks = {}
// This will register all our tasks this creep can do
for (let role of Config.CREEP_ROLES) {
  require('../roles/' + role).register()
}