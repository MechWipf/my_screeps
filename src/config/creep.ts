export interface RoleConfigItem {
  'name': string
  'tasks': string[]
  'build': Function | null
}

export let Roles: { [k: string]: RoleConfigItem } = {}

Roles = {
  'allrounder': {
    'name': 'Worker',
    // Tasks are more used like "begin with this"
    // It is possible that the spawn process overwrites the tasks
    // to give a creep a specific work
    'tasks': ['search_source'],
    'build': (energy: number) => {
      let pattern = [WORK, CARRY, MOVE, MOVE]
      // let cost = _.sum(pattern, o => { return BODYPART_COST[o] })
      let cost = 250
      let body = { carry: 1, work: 1 }

      while (cost + 100 <= energy) {
        let delta = energy - cost

        // Totaly hacky switch... :D
        switch (true) {
          case delta >= 150 && body.work < body.carry * 3:
            cost += 150
            body.work++
            pattern.push(CARRY, MOVE)
            break
          case delta >= 100 && body.carry < 20:
            cost += 100
            body.carry++
            pattern.push(CARRY, MOVE)
            break
        }
      }

      return pattern
    },
  },
  'harvester-energy': {
    'name': 'Farmer',
    'tasks': ['search_source'],
    'build': (energy: number) => {
      let pattern = [WORK, WORK, CARRY, MOVE]
      // let cost = _.sum(pattern, o => { return BODYPART_COST[o] })
      let cost = 300
      let body = { work: 2, move: 1 }

      while (cost + 100 <= energy) {
        let delta = energy - cost

        // Totaly hacky switch... :D
        switch (true) {
          case delta >= 100 && body.work < 5:
            cost += 100
            body.work++
            pattern.push(WORK)
            break
          case delta >= 50 && body.move < body.work:
            cost += 50
            body.move++
            pattern.push(MOVE)
          default:
            cost = energy
            break
        }
      }

      return pattern
    },
  },
  'harvester-extractor': {
    'name': 'Miner',
    'tasks': [],
    'build': null,
  },
  'manager': {
    'name': 'Distributor',
    'tasks': [],
    'build': null,
  },
  'carrier': {
    'name': 'Hauler',
    'tasks': [],
    'build': null,
  },
  'updater': {
    'name': 'Upgrader',
    'tasks': [],
    'build': null,
  },
  'builder': {
    'name': 'Builder',
    'tasks': [],
    'build': null,
  },
  'scout': {
    'name': 'Scout',
    'tasks': [],
    'build': null,
  },
  'attack-range': {
    'name': 'Puncher',
    'tasks': [],
    'build': null,
  },
  'attack-close': {
    'name': 'Shooter',
    'tasks': [],
    'build': null,
  },
  'attack-heal': {
    'name': 'Healer',
    'tasks': [],
    'build': null,
  }
}

export let names = [
  'Abdalla', 'Ackiss', 'Aloise', 'Bamba', 'Barby', 'Baute', 'Beauchemin', 'Benalcazar', 'Berdusco', 'Bottemiller', 'Bradtke', 'Brunache',
  'Buoy', 'Burgos', 'Caffarelli', 'Caliva', 'Carabeo', 'Cavicchi', 'Ceric', 'Clancey', 'Cloutier', 'Cornacchione', 'Corriveau', 'Daniely',
  'Davito', 'Dayoub', 'Delucia', 'Demolle', 'Descant', 'Deyton', 'Dietiker', 'Doust', 'Dubbert', 'Dubner', 'Eichele', 'Ellerbee',
  'Ellicott', 'Elsberry', 'Elze', 'Facchiano', 'Falzone', 'Farraj', 'Fenrich', 'Finer', 'Flamini', 'Foon', 'Frump', 'Galletto',
  'Gascoyne', 'Germond', 'Gigous', 'Ginocchio', 'Goldrick', 'Griser', 'Guller', 'Hassebrock', 'Hattman', 'Heaver', 'Hed', 'Heggestad',
  'Hopley', 'Hovinga', 'Ingran', 'Jeun', 'Kacprzak', 'Kasey', 'Klemetson', 'Koetter', 'Kollmann', 'Kozikowski', 'Kremsreiter', 'Krobot',
  'Kropp', 'Kruggel', 'Lagrimas', 'Lard', 'Leonards', 'Lindaas', 'Llopiz', 'Longfield', 'Ludwigson', 'Mastej', 'Maunz', 'Mazzie',
  'McEntire', 'McKelroy', 'McQuillen', 'Mellado', 'Mercante', 'Merkle', 'Minaudo', 'Monnahan', 'Mono', 'Murria', 'Murto', 'Napierski',
  'Narey', 'Neisinger', 'Nnaji', 'Oertel', 'Ogrinc', 'Olesiak', 'Pavelek', 'Petras', 'Philipps', 'Piehler', 'Prudente', 'Pucilowski',
  'Pustay', 'Quinto', 'Rasavong', 'Riemer', 'Rische', 'Rogler', 'Santalucia', 'Sapigao', 'Sapir', 'Sarnes', 'Scannelli', 'Sewak',
  'Shedden', 'Silano', 'Skeene', 'Skeete', 'Skonberg', 'Sluder', 'Smeltzer', 'Stangelo', 'Stauch', 'Stauts', 'Streich', 'Sturgeon',
  'Sulik', 'Summerour', 'Thake', 'Tumbarello', 'Uvalle', 'Vanhoose', 'Wagenblast', 'Waide', 'Waigand', 'Weigel', 'Wilds', 'Witsman',
  'Yang', 'Yanus', 'Zadra', 'Zahar', 'Zdanis', 'Zegar',
]