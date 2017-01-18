import { log } from '../support/log'

export const ROOM_TASK_CHECK_SOURCES: string = 'checkSources'

class Task {
  time: number
  name: string
  data?: Object
}

declare global {
  interface Room {
    // A test function (remove me...)
    logInfo(): void
    // Main runner for the room logic
    run(): void
    // Tasks the room can run
    tasks: { [key: string]: Function }
    // Yeah
    queueTask(task: Task): void
    queueTask(time: number, task: string): void
    queueTask(time: number, task: string, data: Object): void
    pollTask(): Task | false
    queueCount(): number
  }
}

Room.prototype.logInfo = function (this: Room) {
  log.info('Hello world, ', this.name, '!')
}

Room.prototype.run = function (this: Room) {
  if (this.memory.init == undefined) {
    this.memory.init = true
    this.queueTask(10, ROOM_TASK_CHECK_SOURCES)
  }

  let iter = Math.min(10, this.queueCount())

  while (iter > 0) {
    iter--

    // Get the top task
    let task: Task | false = this.pollTask()
    // Okay... no task found
    if (!task) { break }

    // Check time
    if (task.time <= Game.time) {
      // Requeue the task for later
      this.tasks[task.name].bind(this)()
    } else {
      // All okay. Run the task
      this.queueTask(task)
    }
  }
}

Room.prototype.queueTask = function (this: Room, arg: Task | number, task?: string, data?: Object) {
  if (this.memory.queue == undefined) { this.memory.queue = [] }
  let queue: Object[] = this.memory.queue

  if (task != undefined) {
    let o = new Task()
    o.time = Game.time + (arg as number)
    o.name = task
    if (data != undefined) { o.data = data }
    queue.push(o)
  } else if (typeof arg == 'object') {
    queue.push(arg)
  }
}

Room.prototype.pollTask = function (this: Room) {
  if (this.memory.queue == undefined) { return false }
  if (this.memory.queue.length == 0) { return false }
  let o: Task = this.memory.queue.shift(0)
  return o
}

Room.prototype.queueCount = function (this: Room) {
  if (this.memory.queue == undefined) { return 0 }

  return this.memory.queue.length
}

// Declaring all tasks this object can run
Room.prototype.tasks = {}
let tasks = Room.prototype.tasks

// Check all sources in the room
tasks[ROOM_TASK_CHECK_SOURCES] = function (this: Room) {
  let sources: string[] = []

  this.find(FIND_SOURCES, {
    // We are using the filter to fill our array
    filter: (x: Source) => {
      sources.push(x.id)
    }
  })

  // Finally write all into the memory
  this.memory.sources = sources
  // And requeu the task
  this.queueTask(100, ROOM_TASK_CHECK_SOURCES)

  log.info(log.color('[' + this.name + ']', 'cyan'), 'Checking sources. Found', log.color(sources.length.toString(), 'orange'))
}
