import * as Config from '../../config'
import { log } from '../support/log'

declare global {
  interface Creep {
    logInfo(): void
    roles: { [key: string]: Function }
  }
}

Creep.prototype.logInfo = function () {
  log.info('Hello world, ', this.name, '!')
}

Creep.prototype.roles = {}

for (let role of Config.CREEP_ROLES) {
  require('../roles/'+role).register()
}