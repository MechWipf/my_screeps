// import { log } from '../support/log'
import { Roles } from '../../config/creep'
import { Blackboard, loadTree, customNodes } from '../roles/creep.bt'

declare global {
  interface Creep {
    run(): void
    getRole(): string
    getTarget(): RoomPosition | RoomObject | null
  }
}

Creep.prototype.run = function (this: Creep) {
  if ((this as any).spawning) { return }

  let roleName = this.getRole()
  if (roleTrees[roleName] == undefined) { throw 'Role tree not found ' + roleName }
  let blackboard = new Blackboard(this.memory)
  // if (roleName == 'harvester-energy') { debugger; }
  roleTrees[roleName].tick(this, blackboard)
}

Creep.prototype.getRole = function (this: Creep) {
  let roleName = this.memory.role
  let role = Roles[roleName]
  if (role == undefined) { throw 'Creep without role: ' + this.name }

  return roleName
}

Creep.prototype.getTarget = function (this: Creep) {
  if (this.memory.target) {
    let target = Game.getObjectById(this.memory.target) as RoomObject
    if (target) { return target }
  }
  if (this.memory.targetPos) {
    return new RoomPosition(
      this.memory.targetPos.x,
      this.memory.targetPos.y,
      this.memory.targetPos.roomName
    )
  }

  return null
}

let roleTrees = {
  'allrounder': loadTree(require('allrounder'), customNodes),
  'harvester-energy': loadTree(require('harvester-energy'), customNodes),
} as any

roleTrees['allrounder'].id = 'allrounder'
roleTrees['harvester-energy'].id = 'harvester-energy'