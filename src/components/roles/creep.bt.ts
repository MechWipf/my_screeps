import * as b3 from '../../lib/behavior3ts'
import { claims } from '../classes/Claims'

export namespace customNodes {
  const Action = b3.Action
  const STATUS = b3.STATUS

  // SearchSources
  export class SearchSources extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let sources = creep.room.getAvailableSources()

      let source: Source
      if (sources.length > 0) {
        source = creep.pos.findClosestByPath(sources)
        creep.memory.target = source.id
        return STATUS.SUCCESS
      }

      return STATUS.FAILURE
    }
  }
  // end SearchSources


  // HasTarget
  export class HasTarget extends Action {
    tick(tick: b3.Tick) {
      if (tick.target.getTarget()) {
        return STATUS.SUCCESS
      }
      return STATUS.FAILURE
    }
  }
  // end HasTarget


  // FindPath
  export class FindPath extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let target = creep.getTarget()
      if (target == undefined) { return STATUS.FAILURE }

      let path = creep.pos.findPathTo(target)
      if (path.length == 0) { return STATUS.FAILURE }
      creep.memory.path = Room.serializePath(path)

      return STATUS.SUCCESS
    }
  }
  // end FindPath


  // Move
  export class Move extends Action {
    tick(tick: b3.Tick) {
      if (tick.target.memory.path == undefined) { return STATUS.FAILURE }

      let target = tick.target.getTarget()
      if (target == undefined) { return STATUS.FAILURE }
      if (tick.target.pos.getRangeTo(target) < 2) { return STATUS.SUCCESS }

      if (tick.target.moveByPath(tick.target.memory.path) != OK) { return STATUS.FAILURE }

      return STATUS.RUNNING
    }
  }
  // end Move

  // Harvest
  export class Harvest extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == creep.carryCapacity) {
        return STATUS.SUCCESS
      }

      let target = creep.getTarget()
      if (target instanceof Source) {
        if (creep.harvest(target) != OK) {
          return STATUS.FAILURE
        }
      } else {
        return STATUS.FAILURE
      }

      return STATUS.RUNNING
    }
  }
  // end Harvest

  // Claim
  export class Claim extends Action {
    claimTarget: string

    constructor(props: b3.Properties, id: string) {
      super(props, id)
      this.claimTarget = props['target'] as string
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let target = Game.getObjectById(creep.memory[this.claimTarget]) as any
      if (target == undefined) { return STATUS.ERROR }

      return claims.set(creep, target, creep.carryCapacity - creep.carry.energy, target instanceof Source ? creep.ticksToLive : 100) ? STATUS.SUCCESS : STATUS.FAILURE
    }
  }
  // end Claim

  // Unclaim  
  export class Unclaim extends Action {
    claimTarget: string

    constructor(props: b3.Properties, id: string) {
      super(props, id)
      this.claimTarget = props['target'] as string
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let target = Game.getObjectById(creep.memory[this.claimTarget]) as any
      if (target == undefined) { return STATUS.ERROR }

      claims.remove(creep, target)

      return STATUS.SUCCESS
    }
  }
  // end Unclaim

  // Carry
  export class Carry extends Action {
    tick(tick: b3.Tick) {
      tick
      return b3.STATUS.SUCCESS
    }
  }
  // end Carry

  // StoreNear
  export class StoreNear extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let opts = { filter: (s: Container) => { return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity } }

      let container = creep.pos.findInRange(FIND_STRUCTURES, 1, opts) as Container[]
      if (container.length > 0) {
        creep.transfer(container[0], RESOURCE_ENERGY)
      } else {
        creep.drop(RESOURCE_ENERGY)
      }

      return b3.STATUS.SUCCESS
    }
  }
}

export class Blackboard {
  private _memory: any
  public constructor(mem: any) {
    if (mem['blackboard'] == undefined) {
      mem['blackboard'] = {}
    }

    this._memory = mem['blackboard']

    if (this._memory.tree == undefined) { this._memory.tree = {} }
    if (this._memory.base == undefined) { this._memory.base = {} }
  }
  private _getTreeMemory(treeScope: string) {
    if (this._memory.tree[treeScope] == undefined) {
      this._memory.tree[treeScope] = {}
    }
    return this._memory.tree[treeScope]
  }
  private _getNodeMemory(mem: any, nodeScope: string) {
    if (mem[nodeScope] == undefined) {
      mem[nodeScope] = {}
    }
    return mem[nodeScope]
  }
  private _getMemory(treeScope: string, nodeScope: string) {
    if (treeScope) {
      var memory = this._getTreeMemory(treeScope)

      if (nodeScope) {
        return this._getNodeMemory(memory, nodeScope)
      }

      return memory
    }

    return this._memory.base
  }
  public set(key: string, value: string, treeScope: any, nodeScope: any): void {
    this._getMemory(treeScope ? treeScope.toString() : undefined, nodeScope ? nodeScope.toString() : undefined)[key] = value
  }
  public get(key: string, treeScope: any, nodeScope: any): any {
    return this._getMemory(treeScope ? treeScope.toString() : undefined, nodeScope ? nodeScope.toString() : undefined)[key]
  }
}

export function loadTree(data: any, names: any = {}) {
  let tree = new b3.BehaviorTree()

  let nodes: any = {}
  let id, spec, node

  for (id in data.nodes) {
    spec = data.nodes[id]
    let Cls

    if (spec.name in names) {
      Cls = names[spec.name]
    } else if (spec.name in b3) {
      Cls = (b3 as any)[spec.name]
    } else {
      throw new EvalError('BehaviorTree.load: Invalid node name "' + spec.name + '".')
    }

    node = new Cls(spec.parameters, spec.id)
    nodes[id] = node
  }

  for (id in data.nodes) {
    spec = data.nodes[id]
    node = nodes[id] as b3.BaseNode

    switch (node.category) {
      case b3.CATEGORY.COMPOSITE:
        for (let i = 0; i < spec.children.length; i++) {
          let cid = spec.children[i];
          (node as b3.Composite).children.push(cid)
        }
        break
      case b3.CATEGORY.DECORATOR:
        let cid = spec.child as string
        (node as b3.Decorator).child = cid
        break
      default:
        break
    }
  }

  tree.root = data.root
  tree.nodes = nodes

  return tree
}