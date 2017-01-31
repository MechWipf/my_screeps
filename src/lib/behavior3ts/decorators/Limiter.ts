import { Tick } from '../core/Tick'
import { Decorator } from '../core/Types'
import { STATUS, Properties } from '../helper'

export class Limiter extends Decorator {
  name: string = 'Limiter'

  maxLoop: number

  constructor(props: Properties, id: string) {
    super(props, id)
    this.maxLoop = props['maxLoop'] as number
  }

  open(tick: Tick) {
    tick.blackboard.set('i', 0, tick.tree.id, this.id)
  }

  tick(tick: Tick) {
    if (this.child == '') { return STATUS.ERROR }

    let i = tick.blackboard.get('i', tick.tree.id, this.id) as number

    if (i < this.maxLoop) {
      let status = tick.tree.nodes[this.child].execute(tick)

      if (status == STATUS.SUCCESS || status == STATUS.FAILURE) {
        tick.blackboard.set('i', i + 1, tick.tree.id, this.id)
      }

      return status
    }
    
    return STATUS.FAILURE
  }
}