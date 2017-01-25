import * as Config from './config/general'
import { log } from './components/support/log'

import './components/classes/room'
import './components/classes/creep'

log.showSource = true
log.showSourceOnlyDebug = true

if (Config.USE_PATHFINDER == true) {
  PathFinder.use(true)
}


export function loop() {
  let cpu = Game.cpu.getUsed()
  // Check memory for null or out of bounds custom objects
  if (!Memory.uuid || Memory.uuid > 100) {
    Memory.uuid = 0
  }

  for (let i in Game.rooms) {
    let room = Game.rooms[i]
    room.run()
  }

  for (let i in Game.creeps) {
    let creep = Game.creeps[i]
    creep.run()
  }

  // Clears any non-existing creep memory.
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      log.info("Clearing non-existing creep memory:", name)
      delete Memory.creeps[name]
    }
  }


  let cpuNow = Game.cpu.getUsed()
  if (cpuNow > 10) { log.info("Used CPU: ", cpuNow - cpu) }
}
