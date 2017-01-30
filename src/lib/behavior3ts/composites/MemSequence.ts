import { Tick } from '../core/Tick'
import { Composite } from '../core/Types'
import { STATUS } from '../helper'

export class MemSequence extends Composite {
  name: 'MemSequence'

  open(tick: Tick) {
    tick.blackboard.set('runningChild', 0, tick.tree.id, this.id)
  }

  tick(tick: Tick) {
    let child = tick.blackboard.get('runningChild', tick.tree.id, this.id)

    for (let i = child; i < this.children.length; i++) {
      var status = tick.tree.nodes[this.children[i]].execute(tick)

      if (status !== STATUS.SUCCESS) {
        if (status === STATUS.RUNNING) {
          tick.blackboard.set('runningChild', i, tick.tree.id, this.id)
        }

        return status
      }
    }

    return STATUS.SUCCESS
  }
}