import { Tick } from '../core/Tick'
import { Composite } from '../core/Types'
import { STATUS } from '../helper'

export class Priority extends Composite {
  name: 'Priority'

  tick(tick: Tick) {


    for (let i = 0; i < this.children.length; i++) {
      var status = tick.tree.nodes[this.children[i]].execute(tick)

      if (status !== STATUS.FAILURE) {
        return status
      }
    }

    return STATUS.FAILURE
  }
}