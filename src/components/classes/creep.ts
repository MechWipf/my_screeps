import { log } from '../support/log'
import { Roles } from '../../config/creep'
import { loadTree, customNodes } from '../roles/creep.bt'
import { Blackboard } from './Blackboard'

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
  let tree = roleTrees[roleName]
  if (tree == undefined) { throw 'Role tree not found ' + roleName }

  let debug = [] as any
  let blackboard = new Blackboard(this.memory)
  tree.tick(this, blackboard, debug)
  if (tree.error) { log.error(tree.error) }
  // console.log(debug)
  // debugger;
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
  'move': loadTree(require('move'), customNodes),
} as any

for (let treeName in roleTrees) {
  let tree = roleTrees[treeName]
  tree.id = treeName
  tree.knownTrees = roleTrees
}