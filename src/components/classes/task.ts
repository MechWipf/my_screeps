import { log } from '../support/log'

export function MixinTaskable(derive: any) {
  let base = Taskable as any
  Object.getOwnPropertyNames(base.prototype).forEach(name => {
    derive.prototype[name] = base.prototype[name]
  })
}

export interface ITaskable {
  tasks: { [key: string]: Function }
  // Yeah
  taskPush(task: Task): void
  taskPush(time: number, task: string): void
  taskPush(time: number, task: string, data: Object): void
  taskUnshift(task: Task): void
  taskUnshift(time: number, task: string): void
  taskUnshift(time: number, task: string, data: Object): void
  taskShift(): Task | false
  taskTop(): Task | false
  taskCount(): number
  taskRun(task: Task): boolean
}

export interface Task {
  time: number
  name: string
  data?: Object
}

class Taskable implements ITaskable {
  tasks: {}

  taskPush(this: Room, arg: Task | number, task?: string, data?: Object) {
    if (this.memory.queue == undefined) { this.memory.queue = [] }
    let queue: Object[] = this.memory.queue

    if (task != undefined) {
      let o = <Task>{
        name: task,
        time: Math.floor(Game.time + (arg as number))
      }
      if (data != undefined) { o.data = data }
      queue.push(o)
    } else if (typeof arg == 'object') {
      queue.push(arg)
    }
  }

  taskUnshift(this: Room, arg: Task | number, task?: string, data?: Object) {
    if (this.memory.queue == undefined) { this.memory.queue = [] }
    let queue: Object[] = this.memory.queue

    if (task != undefined) {
      let o = <Task>{
        name: task,
        time: Math.floor(Game.time + (arg as number))
      }
      if (data != undefined) { o.data = data }
      queue.unshift(o)
    } else if (typeof arg == 'object') {
      queue.unshift(arg)
    }
  }

  taskShift(this: Room) {
    if (this.memory.queue == undefined) { return false }
    if (this.memory.queue.length == 0) { return false }
    return this.memory.queue.shift(0) as Task
  }

  taskTop(this: Room) {
    if (this.memory.queue == undefined) { return false }
    if (this.memory.queue.length == 0) { return false }
    return this.memory.queue[0] as Task
  }

  taskCount(this: Room) {
    if (this.memory.queue == undefined) { return 0 }
    return this.memory.queue.length
  }

  taskRun(this: Room, task: Task) {
    let taskFn = this.tasks[task.name]
    if (taskFn == undefined) {
      log.warning('Task:', log.color(task.name, 'orange'), 'is not defined.')
      return true
    } else {
      return taskFn.bind(this)(task) === true
    }
  }
}