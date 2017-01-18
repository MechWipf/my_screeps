
export function register() {
  let roles = Creep.prototype.roles

  roles['move_to'] = function (creep: Creep) {
    creep.logInfo()
  }
}