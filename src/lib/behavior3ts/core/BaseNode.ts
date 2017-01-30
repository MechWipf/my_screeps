import { Tick } from './Tick'
import { CATEGORY, Properties, createUUID, STATUS } from '../helper'

export interface BaseNodeMap { [k: string]: BaseNode }

export class BaseNode {
  id: string
  name: string
  category: CATEGORY
  properties: Properties

  constructor(props: Properties, id: string) {
    this.id = id || createUUID()
    this.properties = props
  }

  execute(tick: Tick): STATUS {
    this._enter(tick)

    let open = tick.blackboard.get('openNodes', tick.tree.id)
    if (!(open && open[this.id] != undefined)) {
      this._open(tick)
    }

    let status = this._tick(tick)

    if (status !== STATUS.RUNNING) {
      this._close(tick)
      if (open) { delete open[this.id] }
    }

    this._exit(tick)

    return status
  }

  protected _enter(tick: Tick) {
    tick.enterNode(this)
    if (this.enter) { this.enter(tick) }
  }

  protected _open(tick: Tick) {
    if (this.open) { this.open(tick) }
  }

  protected _tick(tick: Tick): STATUS {
    if (this.tick) { return this.tick(tick) }
    return STATUS.ERROR
  }

  _close(tick: Tick) {
    tick.closeNode()
    if (this.close) { this.close(tick) }
  }

  protected _exit(tick: Tick) {
    if (this.exit) { this.exit(tick) }
  }

  tick?(tick: Tick): STATUS
  enter?(tick: Tick): void
  open?(tick: Tick): void
  close?(tick: Tick): void
  exit?(tick: Tick): void
}