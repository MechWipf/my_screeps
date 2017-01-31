import { log } from '../support/log'

class Claims {
  constructor() {
    if (Memory['claims'] == undefined) {
      Memory['claims'] = {}
    }
  }

  protected _getClaimMemory(id: string): { amount: number, list: any } {
    if (Memory['claims'][id] == undefined) {
      Memory['claims'][id] = { amount: 0, list: {} }
    }

    return Memory['claims'][id]
  }

  set(claimer: IClaimer, claimTarget: IClaimable, amount: number = 1, ticks: number = 100): boolean {
    let claim = this._getClaimMemory(claimTarget.id)

    if (claim.list[claimer.id]) { return true }

    if (claimTarget.structureType) {
      switch (claimTarget.structureType) {
        case STRUCTURE_STORAGE:
        // fall
        case STRUCTURE_CONTAINER:
          if ((claimTarget as Container).store.energy - claim.amount >= amount) {
            claim.amount += amount
            claim.list[claimer.id] = [Game.time + ticks, amount]

            log.debug(claimer.name, 'claimed container/storage', claimTarget.id, 'for', amount)

            return true
          }
          break
        case STRUCTURE_EXTENSION:
        // fall
        case STRUCTURE_SPAWN:
          debugger;  
          if ((claimTarget as Spawn).energyCapacity > (claimTarget as Spawn).energy + claim.amount) {
            claim.amount += amount
            claim.list[claimer.id] = [Game.time + ticks, amount]

            log.debug(claimer.name, 'claimed extension/spawn', claimTarget.id, 'for', amount)

            return true
          }
          break
      }
    } else if (claimTarget.amount) {
      if (claimTarget.amount - claim.amount > amount) {
        claim.amount += amount
        claim.list[claimer.id] = [Game.time + ticks, amount]

        log.debug(claimer.name, 'claimed resource', claimTarget.id, 'for', amount + 50)

        return true
      }
    } else {
      if (claim.amount == 0) {
        claim.amount++
        claim.list[claimer.id] = [Game.time + ticks, 1]

        log.debug(claimer.name, 'claimed source', claimTarget.id, 'for', 1, 'new claim amount', claim.amount)

        return true
      }
    }

    return false
  }

  remove(claimer: IClaimer, claimTarget: IClaimable) {
    let claim = this._getClaimMemory(claimTarget.id)

    if (claim.list[claimer.id]) {
      let data = claim.list[claimer.id]
      claim.amount -= data[1]
      delete claim.list[claimer.id]

      log.debug(claimer.name, 'removed claim on', claimTarget.id, 'amount', data[1], 'remaining claim amount', claim.amount)
    }
  }

  isClaimable(claimer: IClaimer, claimTarget: IClaimable, amount: number) {
    let claim = this._getClaimMemory(claimTarget.id)

    if (claim.list[claimer.id]) { return false }

    if (claimTarget.structureType) {
      switch (claimTarget.structureType) {
        case STRUCTURE_STORAGE:
        // fall
        case STRUCTURE_CONTAINER:
          return ((claimTarget as Container).store.energy - claim.amount >= amount + 50)
        case STRUCTURE_EXTENSION:
        // fall
        case STRUCTURE_SPAWN:
          return ((claimTarget as Spawn).energyCapacity > (claimTarget as Spawn).energy + claim.amount)
      }
    } else if (claimTarget.amount) {
      return (claimTarget.amount - claim.amount > amount)
    } else {
      return (claim.amount == 0)
    }
  }

  clean() {
    _.eachRight(Memory['claims'], (claim: any, claimId: string) => {
      if (Game.getObjectById(claimId) == undefined) {
        delete Memory['claims'][claimId]
        log.debug('deleted claim', claimId)
      } else {
        _.each(claim.list, (data: any, claimerId: string) => {
          if (Game.getObjectById(claimerId) == undefined || data[0] < Game.time) {
            claim.amount = Math.max(claim.amount - data[0], 0)
            delete claim.list[claimerId]
            log.debug('deleted claimer', claimerId, 'on', claimId)
          }
        })
      }
    })
  }
}

export interface IClaimable { id: string, amount?: number, structureType?: string }
export interface IClaimer { id: string, name?: string }
export let claims = new Claims()
export class DummyClaimer implements IClaimer {
  id: '000'
  name: 'dummy'
}
export let dummyClaimer = new DummyClaimer()