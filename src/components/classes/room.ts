import { log } from '../support/log'

declare global {
  interface Room {
    // A test function (remove me...)
    logInfo(): void
    // Main runner for the room logic
    run(): void
    // Tasks the room can run
    tasks: { [key: string]: Function }
  }
}

Room.prototype.logInfo = function () {
  log.info('Hello world, ', this.name, '!')
}

Room.prototype.run = function () {
  this.tasks['checkSources'].bind(this)()
}


// Declaring all tasks this object can run
Room.prototype.tasks = {}
let tasks = Room.prototype.tasks

// Check all sources in the room
tasks['checkSources'] = function () {
  // To be safe, we are setting a default value (memory changes can occure ...)
  let sources: string[] = this.memory.sources || []

  this.find(FIND_SOURCES, {
    // We are using the filter to fill our array
    filter: (x: Source) => {
      sources.push(x.id)
    }
  })

  // Finally write all into the memory
  this.memory.sources = sources
  // And requeu the task
}