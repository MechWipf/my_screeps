import { Blackboard } from '../helper'
import { BaseNode } from './BaseNode'
import { BehaviorTree } from './BehaviorTree'

export class Tick {
  tree: BehaviorTree
  target: any
  blackboard: Blackboard

  protected _openNodes: BaseNode[]
  protected _nodeCount: number

  constructor() {
    this._nodeCount = 0
    this._openNodes = []
  }

  enterNode(node: BaseNode) {
    this._nodeCount++
    this._openNodes.push(node)
  }

  closeNode() {
    this._openNodes.pop()
  }

  get openNodes(): BaseNode[] {
    return this._openNodes
  }

  get nodeCount(): number {
    return this._nodeCount
  }
}