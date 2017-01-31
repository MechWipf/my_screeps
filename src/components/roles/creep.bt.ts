import * as b3 from '../../lib/behavior3ts'
import { log } from '../support/log'
import { claims } from '../classes/Claims'

export namespace customNodes {
  const Action = b3.Action
  const STATUS = b3.STATUS

  // FindSources
  export class FindSources extends Action {
    name: string = 'FindSources'

    open(tick: b3.Tick) {
      let creep = tick.target as Creep
      delete creep.memory.target
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let sources = creep.room.getAvailableSources()

      if (sources.length > 0) {
        let source = creep.pos.findClosestByPath(sources)
        if (source) {
          creep.memory.target = source.id
          creep.memory.actionRange = 1
          return STATUS.SUCCESS
        }
      }

      return STATUS.FAILURE
    }
  }
  // end FindSources


  // FindResources  
  export class FindResources extends Action {
    name: string = 'FindResources'

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let sources = creep.room.getAvailableResources(creep, creep.carryCapacity)

      if (sources.length > 0) {
        let source = creep.pos.findClosestByPath(sources) as Resource
        creep.memory.target = source.id
        creep.memory.actionRange = 1

        creep.say('\u25EF')
        return STATUS.SUCCESS
      }

      creep.say('\u274c')
      return STATUS.FAILURE
    }
  }
  // end FindResources


  // HasTarget
  export class HasTarget extends Action {
    name: string = 'HasTarget'

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
    name: string = 'FindPath'

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let target = creep.getTarget()
      if (target == undefined) { return STATUS.FAILURE }

      let opts = { maxOps: 200 }
      let path = creep.pos.findPathTo(target, opts)
      if (path.length == 0) { return STATUS.FAILURE }
      creep.memory.path = Room.serializePath(path)

      return STATUS.SUCCESS
    }
  }
  // end FindPath


  // Move
  export class Move extends Action {
    name: string = 'Move'

    tick(tick: b3.Tick) {
      if (tick.target.memory.path == undefined) { return STATUS.FAILURE }
      let creep = tick.target as Creep

      let target = creep.getTarget()
      if (target == undefined) { return STATUS.FAILURE }

      let status = STATUS.RUNNING

      switch (creep.moveByPath(creep.memory.path)) {
        case OK:
          break
        case ERR_TIRED:
          break
        default:
          status = STATUS.FAILURE
      }

      let actionRange = creep.memory.actionRange | 1
      if (creep.pos.getRangeTo(target) <= actionRange) { status = STATUS.SUCCESS }

      return status
    }
  }
  // end Move


  // Harvest
  export class Harvest extends Action {
    name: string = 'Harvest'

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
    name: string = 'TakeResources'

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
    name: string = 'Claim'

    claimTarget: string = 'target'
    ticks: number = 100
    lifetime: boolean = false
    invert: boolean = false
    resource: string = RESOURCE_ENERGY

    constructor(props: b3.Properties, id: string) {
      super(props, id)
      this.claimTarget = props['target'] as string || this.claimTarget
      this.ticks = props['ticks'] as number || this.ticks
      this.lifetime = props['lifetime'] != undefined ? props['lifetime'] == 'true' : this.lifetime
      this.invert = props['invert'] != undefined ? props['invert'] == 'true' : this.invert
      this.resource = props['resource'] != undefined ? props['resource'] as string : this.resource
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      let target = Game.getObjectById(creep.memory[this.claimTarget]) as any
      if (target == undefined) { return STATUS.ERROR }


      let amount = this.invert ? creep.carry[this.resource] : creep.carryCapacity - creep.carry[this.resource]
      let ticksClaimed = this.lifetime ? creep.ticksToLive : this.ticks

      let status = claims.set(creep, target, amount, ticksClaimed) ? STATUS.SUCCESS : STATUS.FAILURE
      if (status != STATUS.SUCCESS) {
        log.info(creep.name, 'failed to claim', target.id)
        creep.say('\u25CC')
      }

      return status
    }
  }
  // end Claim


  // Unclaim  
  export class Unclaim extends Action {
    name: string = 'Unclaim'

    claimTarget: string = 'target'

    constructor(props: b3.Properties, id: string) {
      super(props, id)
      this.claimTarget = props['target'] != undefined ? props['target'] as string : this.claimTarget
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
    name: string = 'Carry'

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) {
        return STATUS.FAILURE
      }

      let target = creep.getTarget() as Extension
      if (target) {
        switch (creep.transfer(target, RESOURCE_ENERGY)) {
          case OK:
          case ERR_FULL:
            return STATUS.SUCCESS
          default:
            return STATUS.FAILURE
        }
      }

      // We assume it is full now, or gone
      return STATUS.SUCCESS
    }
  }
  // end Carry


  // FindCarryTarget  
  export class FindCarryTarget extends Action {
    name: string = 'FindCarryTarget'

    open(tick: b3.Tick) {
      let creep = tick.target as Creep
      delete creep.memory.target
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) { return STATUS.FAILURE }

      let target: any = creep.pos.findClosestByRange(FIND_MY_SPAWNS, { filter: (s: Spawn) => { return s.energy < s.energyCapacity && claims.isClaimable(creep, s, creep.carry.energy | 50) } })
      if (target) {
        creep.memory.target = target.id
        creep.memory.actionRange = 1
        return STATUS.SUCCESS
      }

      target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (s: Extension) => { return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity && claims.isClaimable(creep, s, creep.carry.energy | 50) } })
      if (target) {
        creep.memory.target = target.id
        creep.memory.actionRange = 1
        return STATUS.SUCCESS
      }

      return STATUS.FAILURE
    }
  }
  // end FindCarryTarget  


  // Upgrade
  export class Upgrade extends Action {
    name: string = 'Upgrade'

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) {
        return STATUS.SUCCESS
      }

      let target = creep.getTarget() as Controller
      if (creep.upgradeController(target) != OK) { return STATUS.FAILURE }

      return STATUS.RUNNING
    }
  }
  // end Upgrade


  // FindUpgradeTarget  
  export class FindUpgradeTarget extends Action {
    name: string = 'FindUpgradeTarget'

    open(tick: b3.Tick) {
      let creep = tick.target as Creep
      delete creep.memory.target
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) { return STATUS.FAILURE }

      creep.memory.target = (creep.room.controller as Structure).id
      creep.memory.actionRange = 3

      return STATUS.SUCCESS
    }
  }
  // end FindUpgradeTarget  


  // StoreNear
  export class StoreNear extends Action {
    name: string = 'StoreNear'

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
  // end StoreNear


  // CarriesResource  
  export class CarriesResource extends Action {
    name: string = 'CarriesResource'

    resource: string = RESOURCE_ENERGY

    constructor(props: b3.Properties, id: string) {
      super(props, id)

      this.resource = props['resource'] != undefined ? props['resource'] as string : this.resource
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      if (creep.carry[this.resource] > 0) {
        return STATUS.SUCCESS
      }

      return STATUS.FAILURE
    }
  }
  // end CarriesResource


  // FindConstruction
  export class FindConstruction extends Action {
    name: string = 'FindConstruction'

    open(tick: b3.Tick) {
      let creep = tick.target as Creep
      delete creep.memory.target
    }

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep

      if (creep.carry.energy == 0) { return STATUS.FAILURE }

      let o = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES) as ConstructionSite
      if (o) {
        creep.memory.target = o.id
        creep.memory.actionRange = 3
        return STATUS.SUCCESS
      }

      return STATUS.FAILURE
    }
  }
  // end FindConstruction


  // BuildConstruction
  export class BuildConstruction extends Action {
    name: string = 'BuildConstruction'

    tick(tick: b3.Tick) {
      let creep = tick.target as Creep
      if (creep.carry.energy == 0) { return STATUS.SUCCESS }

      let target = creep.getTarget() as ConstructionSite
      if (target) {
        if (creep.build(target) != OK) {
          return STATUS.FAILURE
        }

        return STATUS.RUNNING
      }

      // We asume the construction is finished
      return STATUS.SUCCESS
    }
  }
  // end BuildConstruction


  // RunTree
  export class RunTree extends Action {
    name: string = 'RunTree'

    tree: string

    constructor(props: b3.Properties, id: string) {
      super(props, id)

      this.tree = props['tree'] as string
    }

    tick(tick: b3.Tick) {
      let tree = tick.tree.knownTrees[this.tree] as b3.BehaviorTree
      if (tree) {
        return tree.tick(tick.target, tick.blackboard)
      } else {
        return STATUS.ERROR
      }
    }
  }
  // end RunTree
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