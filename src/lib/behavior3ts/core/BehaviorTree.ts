import { BaseNodeMap, BaseNode } from './BaseNode'
import { Tick } from './Tick'
import { createUUID, Blackboard } from '../helper'

export class BehaviorTree {
  id: string
  title: string
  description: string
  properties: { [k: string]: string }
  root: string
  nodes: BaseNodeMap

  constructor() {
    this.id = createUUID()
    this.title = 'A behavior tree'
    this.description = 'default'
    this.properties = {}
    this.root = ''
    this.nodes = {}
  }

  tick(target: any, blackboard: Blackboard) {

    let tick = new Tick()
    tick.target = target
    tick.blackboard = blackboard
    tick.tree = this

    let status = this.nodes[this.root].execute(tick)
    let lastOpenNodes = _.map(blackboard.get('openNodes', this.id) || [], (_v: any, nodeId: string) => { return this.nodes[nodeId] })
    let currOpenNodes = tick.openNodes.slice(0)

    let start = 0
    const count = Math.min(lastOpenNodes.length, currOpenNodes.length)
    let i

    for (i = 0; i < count; i++) {
      start = i + 1
      if (lastOpenNodes[i] !== currOpenNodes[i]) {
        break
      }
    }

    for (i = lastOpenNodes.length - 1; i >= start; i--) {
      lastOpenNodes[i]._close(tick)
    }

    let _openNodes = {} as any
    _.each(currOpenNodes, (node: BaseNode) => { _openNodes[node.id] = true })
    blackboard.set('openNodes', _openNodes, this.id)
    blackboard.set('nodeCount', tick.nodeCount, this.id)

    return status
  }
}