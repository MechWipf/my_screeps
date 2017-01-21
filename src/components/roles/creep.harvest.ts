import { Task } from '../classes/task'

export function register() {
  let tasks = Creep.prototype.tasks

  tasks['h_mine'] = function (this: Creep, task: Task) {
    let target = Game.getObjectById<Source>(task.data as string)
    if (!target) { return }

    this.taskUnshift(task)
  }

  tasks['h_search'] = function (this: Creep, task: Task) {
    task.time = Game.time + 10
    this.taskUnshift(task)
  }
}