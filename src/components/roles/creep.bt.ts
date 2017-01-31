import * as b3 from '../../lib/behavior3ts'
import { } from '../support/log'
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


  // GetResources  
  export class GetResources extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let sources = creep.room.getAvailableResources()

      if (sources.length > 0) {
        let source = creep.pos.findClosestByPath(sources) as Resource
        creep.memory.target = source.id
        return STATUS.SUCCESS
      }

      return STATUS.FAILURE
    }
  }
  // end GetResources


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
    private range: number = 1

    constructor(props: b3.Properties, id: string) {
      super(props, id)
      this.range = <number>props['range'] || this.range
    }

    tick(tick: b3.Tick) {
      if (tick.target.memory.path == undefined) { return STATUS.FAILURE }

      let target = tick.target.getTarget()
      if (target == undefined) { return STATUS.FAILURE }

      let status = STATUS.RUNNING

      switch (tick.target.moveByPath(tick.target.memory.path)) {
        case OK:
          break
        case ERR_TIRED:
          break
        default:
          status = STATUS.FAILURE
      }

      if (tick.target.pos.getRangeTo(target) <= this.range) { status = STATUS.SUCCESS }

      return status
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


  // TakeResources
  export class TakeResources extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == creep.carryCapacity) {
        return STATUS.SUCCESS
      }

      let target = creep.getTarget() as any
      if (target.store) {
        creep.withdraw(target, RESOURCE_ENERGY)
      } else if (target.amount) {
        creep.pickup(target)
      } else {
        return STATUS.FAILURE
      }

      return STATUS.SUCCESS
    }
  }
  // end TakeResources


  // Claim
  export class Claim extends Action {
    claimTarget: string = 'target'
    ticks: number = 100

    constructor(props: b3.Properties, id: string) {
      super(props, id)
      this.claimTarget = props['target'] as string || this.claimTarget
      this.ticks = props['ticks'] as number || this.ticks
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let target = Game.getObjectById(creep.memory[this.claimTarget]) as any
      if (target == undefined) { return STATUS.ERROR }

      let status = claims.set(creep, target, creep.carryCapacity - creep.carry.energy, target instanceof Source ? creep.ticksToLive : this.ticks) ? STATUS.SUCCESS : STATUS.FAILURE
      // if (status == STATUS.SUCCESS) {
      //   log.debug(creep.name, 'claimed', target.id)
      // } else {
      //   log.debug(creep.name, 'failed to claim', target.id)
      // }

      return status
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
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) {
        return STATUS.SUCCESS
      }

      let target = creep.getTarget() as Structure
      if (target == undefined) { return STATUS.FAILURE }
      creep.transfer(target, RESOURCE_ENERGY)

      return STATUS.SUCCESS
    }
  }
  // end Carry


  // GetCarryTarget  
  export class GetCarryTarget extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) { return STATUS.FAILURE }

      let target: any = creep.pos.findClosestByRange(FIND_MY_SPAWNS, { filter: (s: Spawn) => { return s.energy < s.energyCapacity } })
      if (target) {
        creep.memory.target = target.id
        return STATUS.SUCCESS
      }

      target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (s: Extension) => { return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity } })
      if (target) {
        creep.memory.target = target.id
        return STATUS.SUCCESS
      }

      return STATUS.FAILURE
    }
  }
  // end GetCarryTarget  

  // Upgrade
  export class Upgrade extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) {
        return STATUS.SUCCESS
      }

      let target = creep.getTarget() as Controller
      creep.upgradeController(target)

      return STATUS.RUNNING
    }
  }
  // end Upgrade


  // GetUpgradeTarget  
  export class GetUpgradeTarget extends Action {
    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) { return STATUS.FAILURE }

      creep.memory.target = (creep.room.controller as Structure).id

      return STATUS.SUCCESS
    }
  }
  // end GetUpgradeTarget  


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