import { Tick } from '../core/Tick'
import { Action } from '../core/Types'
import { STATUS } from '../helper'

export class Wait extends Action {
  endTime: number

  name: string = 'Wait'
  title: string = 'Wait some time'

  constructor(props: any, id: any) {
    super(props, id)
    this.endTime = props.time != undefined ? props.time : 0
  }

  open(tick: Tick) {
    let startTime = Game.time
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id)
  }

  tick(tick: Tick) {
    let currTime = Game.time
    let startTime = tick.blackboard.get('startTime', tick.tree.id, this.id)

    if (currTime - startTime > this.endTime) {
      return STATUS.SUCCESS
    }

    return STATUS.RUNNING
  }
}