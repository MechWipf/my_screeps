import * as Config from './config'
import { log } from './components/support/log'

import './components/classes/room'
import './components/classes/creep'

log.showSource = false

if (Config.USE_PATHFINDER == true) {
  PathFinder.use(true)
}


export function loop() {
  // Check memory for null or out of bounds custom objects
  if (!Memory.uuid || Memory.uuid > 100) {
    Memory.uuid = 0
  }

  for (let i in Game.rooms) {
    let room: Room = Game.rooms[i]

    room.run()

    // Clears any non-existing creep memory.
    for (let name in Memory.creeps) {
      let creep: any = Memory.creeps[name]
      if (creep.room === room.name) {
        if (!Game.creeps[name]) {
          log.info("Clearing non-existing creep memory:", name)
          delete Memory.creeps[name]
        }
      }
    }
  }
}
