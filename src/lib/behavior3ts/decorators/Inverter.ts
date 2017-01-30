import { Tick } from '../core/Tick'
import { Decorator } from '../core/Types'
import { STATUS } from '../helper'

export class Inverter extends Decorator {
  name: 'Inverter'

  tick(tick: Tick) {
    if (this.child === '') { return STATUS.ERROR }

    let status = tick.tree.nodes[this.child].execute(tick)

    if (status == STATUS.SUCCESS) {
      status = STATUS.FAILURE
    } else if (status == STATUS.FAILURE) {
      status = STATUS.SUCCESS
    }

    return status
  }
}