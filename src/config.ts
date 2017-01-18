import { LogLevels } from './components/support/log.levels';

/**
 * Enable this if you want a lot of text to be logged to console.
 * @type {boolean}
 */
export const ENABLE_DEBUG_MODE: boolean = true;

/**
 * Enable this to use the experimental PathFinder class.
 */
export const USE_PATHFINDER: boolean = true;

/**
 * Debug level for log output
 */
export const LOG_LEVEL: number = LogLevels.DEBUG;

/**
 * Prepend log output with current tick number.
 */
export const LOG_PRINT_TICK: boolean = true;

/**
 * Prepend log output with source line.
 */
export const LOG_PRINT_LINES: boolean = false;

/**
 * Load source maps and resolve source lines back to typeascript.
 */
export const LOG_LOAD_SOURCE_MAP: boolean = false;

/**
 *
 */
export const CREEP_ROLES: string[] = [
  'creep.build',
  'creep.harvest',
  'creep.upgrade',
  'creep.move'
]