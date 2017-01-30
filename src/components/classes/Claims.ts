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

  set(claimer: Creep, claimTarget: IClaimable, amount: number = 1, ticks: number = 100): boolean {
    let claim = this._getClaimMemory(claimTarget.id)

    if (claimTarget.store) {
      if (claimTarget.store.energy - claim.amount > amount) {
        claim.amount += amount
        claim.list[claimer.id] = [Game.time + ticks, amount]
        return true
      }
    } else if (claimTarget.amount) {
      if (claimTarget.amount - claim.amount > amount) {
        claim.amount += amount
        claim.list[claimer.id] = [Game.time + ticks, amount]
        return true
      }
    } else {
      if (claim.amount == 0) {
        claim.amount++
        claim.list[claimer.id] = [Game.time + ticks, 1]
        return true
      }
    }

    return false
  }

  remove(claimer: Creep, claimTarget: IClaimable) {
    let claim = this._getClaimMemory(claimTarget.id)

    if (claim.list[claimer.id]) {
      let data = claim.list[claimer.id]
      claim.amount -= data[1]
      delete claim.list[claimer.id]
    }
  }

  isClaimable(claimer: Creep | DummyClaimer, claimTarget: IClaimable, amount: number) {
    let claim = this._getClaimMemory(claimTarget.id)

    if (claim.list[claimer.id]) { return false }

    if (claimTarget.store) {
      if (claimTarget.store.energy - claim.amount > amount) {
        return true
      }
    } if (claimTarget.amount) {
      if (claimTarget.amount - claim.amount > amount) {
        return true
      }
    } else {
      return claim.amount == 0
    }
  }

  clean() {
    _(Memory['claims']).eachRight((claim: any, claimId: string) => {
      if (Game.getObjectById(claimId) == undefined) {
        delete Memory['claims'][claimId]
      } else {
        _(claim.list).each((claimerId: string, data: any) => {
          if (Game.getObjectById(claimerId) == undefined || data[0] < Game.time) {
            claim.amount -= data[0]
            delete claim[claimerId]
          }
        })
      }
    })
  }
}

export interface IClaimable { id: string, amount: number, store: { energy: number }, ticksToRegeneration: any }
export let claims = new Claims()
export class DummyClaimer { id: '000' }
export let dummyClaimer = new DummyClaimer()