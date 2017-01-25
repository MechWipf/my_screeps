import { Task } from '../classes/task'

export function register() {
  let tasks = Creep.prototype.tasks

  tasks['m_move_to'] = function (this: Creep, task: Task) {
    let data = task.data as { target: string, range: number, path: string }
    let target = Game.getObjectById<RoomObject>(data.target)
    if (!target) { return }
    
    if (this.pos.getRangeTo(target.pos) > data.range) {
      this.moveByPath(data.path)
    } else {
      // We are done here, no more moving around
      return true
    }

    // Put it back on top of the queue
    this.taskUnshift(task)
    // And since moving is an async job, don't try to do something else
    return false
  }

  // tasks['find_path'] = function (this: Creep, task: task) {}
}