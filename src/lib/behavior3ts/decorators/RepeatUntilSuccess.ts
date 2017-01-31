import { Tick } from '../core/Tick'
import { Decorator } from '../core/Types'
import { STATUS, Properties } from '../helper'

export class RepeatUntilSuccess extends Decorator {
  name: string = 'RepeatUntilSuccess'

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

    let i = tick.blackboard.get('i', tick.tree.id, this.id)
    let status = STATUS.ERROR

    while (this.maxLoop < 0 || i < this.maxLoop) {
      status = tick.tree.nodes[this.child].execute(tick)

      if (status == STATUS.FAILURE) {
        i++
      } else {
        break
      }
    }

    i = tick.blackboard.set('i', i, tick.tree.id, this.id)
    return status
  }
}