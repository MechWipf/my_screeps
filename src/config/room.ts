export const TASK_CHECK_SOURCES: string = 'checkSources'
export const TASK_PLAN_ROAD: string = 'planRoad'
export const TASK_PLAN_PATH: string = 'planPath'
export const TASK_SCOUT_ROOMS: string = 'scoutRooms'
export const TASK_MANAGE_SLAVE: string = 'manageSlave'
export const TASK_MANAGE_ROOM: string = 'manageRoom'
export const TASK_CHECK_ROOM_LEVEL: string = 'checkRoomLevel'

interface RoleConfig {
  [Key: string]: {
    tasks: string[]
  }
}

export let roles: RoleConfig = {
  'master': {
    'tasks': [TASK_CHECK_ROOM_LEVEL, TASK_CHECK_SOURCES, TASK_MANAGE_ROOM, TASK_SCOUT_ROOMS]
  },
  'slave': {
    'tasks': [TASK_CHECK_SOURCES, TASK_MANAGE_SLAVE]
  },
  'unowned': {
    'tasks': []
  }
}

interface RoomLevelConfig extends Array<RoomLevelConfigItem> { }
export interface RoomLevelConfigItem {
  name: string
  availableCreeps: { [Key: string]: number | boolean }
  maxSlaves: number
  require: {
    extensions: number
    energy: number
    creeps: Function
  }
}

export let level: RoomLevelConfig = [
  {
    name: 'Rough Land',
    maxSlaves: 0,
    availableCreeps: {},
    require: {
      extensions: 0,
      energy: 0,
      creeps: () => { return true },
    },
  },
  {
    name: 'Feudal',
    maxSlaves: 0,
    availableCreeps: {
      'allrounder': 2,
      'harvester-energy': true, // miners are defined by the amount of sources in the room and slaves of the room
    },
    require: {
      extensions: 0,
      energy: 0,
      creeps: () => { return true },
    },
  },
]