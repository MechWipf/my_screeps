import { Blackboard as IBlackboard } from '../../lib/behavior3ts'

export class Blackboard implements IBlackboard {
  private _memory: any
  public constructor(mem: any) {
    this._memory = mem

    if (this._memory.tree == undefined) { this._memory.tree = {} }
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

    if (this._memory.base == undefined) { this._memory.base = {} }
    return this._memory.base
  }
  public set(key: string, value: string, treeScope: any, nodeScope: any): void {
    this._getMemory(treeScope ? treeScope.toString() : undefined, nodeScope ? nodeScope.toString() : undefined)[key] = value
  }
  public get(key: string, treeScope: any, nodeScope: any): any {
    return this._getMemory(treeScope ? treeScope.toString() : undefined, nodeScope ? nodeScope.toString() : undefined)[key]
  }
  public clear(treeScope: any, nodeScope: any) {
    treeScope = treeScope.toString()
    nodeScope = nodeScope.toString()

    let treeMem = this._getTreeMemory(treeScope)
    if (treeMem) {
      delete treeMem[nodeScope]
    }
  }
}