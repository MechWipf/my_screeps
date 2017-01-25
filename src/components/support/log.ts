import * as Config from '../../config/general';
import { LogLevels } from './log.levels';

// <caller> (<source>:<line>:<column>)
const stackLineRe = /([^ ]*) \(([^:]*):([0-9]*):([0-9]*)\)/;

interface SourcePos {
  compiled: string;
  final: string;
  original: string | undefined;
  caller: string | undefined;
  path: string | undefined;
  line: number | undefined;
}

export function resolve(fileLine: string): SourcePos {
  let split = _.trim(fileLine).match(stackLineRe);
  if (!split || !Log.sourceMap) {
    return <SourcePos>{ compiled: fileLine, final: fileLine };
  }

  let pos = { column: parseInt(split[4], 10), line: parseInt(split[3], 10) };

  let original = Log.sourceMap.originalPositionFor(pos);
  let line = `${split[1]} (${original.source}:${original.line})`;
  let out = {
    caller: split[1],
    compiled: fileLine,
    final: line,
    line: original.line,
    original: line,
    path: original.source,
  };

  return out;
}

function color(str: string, color: string): string {
  return `<font color='${color}'>${str}</font>`;
}

function time(): string {
  return color(Game.time.toString(), 'gray');
}

export class Log extends LogLevels {
  public static sourceMap: any;

  public static loadSourceMap() {
    try {
      // tslint:disable-next-line
      var SourceMapConsumer = require('source-map').SourceMapConsumer;
      const map = require('map').d;
      if (map) {
        Log.sourceMap = new SourceMapConsumer(map);
      }
    } catch (err) {
      console.log('failed lo load source map', err);
    }
  }

  public get level(): number { return Memory.log.level; }
  public set level(value: number) { Memory.log.level = value; }
  public get showSource(): boolean { return Memory.log.showSource; }
  public set showSource(value: boolean) { Memory.log.showSource = value; }
  public get showSourceOnlyDebug(): boolean { return Memory.log.showSourceOnlyDebug; }
  public set showSourceOnlyDebug(value: boolean) { Memory.log.showSourceOnlyDebug = value; }
  public get showTick(): boolean { return Memory.log.showTick; }
  public set showTick(value: boolean) { Memory.log.showTick = value; }

  //private _maxFileString: number = 0;

  constructor() {
    super();
    _.defaultsDeep(Memory, {
      log: {
        level: Config.LOG_LEVEL,
        showSource: Config.LOG_PRINT_LINES,
        showSourceOnlyDebug: false,
        showTick: Config.LOG_PRINT_TICK,
      }
    });
  }

  public trace(error: Error): Log {
    if (this.level >= Log.ERROR && error.stack) {
      console.log(this.resolveStack(error.stack));
    }

    return this;
  }

  public error(...args: any[]) {
    if (this.level >= Log.ERROR) {
      console.log.apply(this, this.buildArguments(Log.ERROR).concat([].slice.call(args)));
    }
  }

  public warning(...args: any[]) {
    if (this.level >= Log.WARNING) {
      console.log.apply(this, this.buildArguments(Log.WARNING).concat([].slice.call(args)));
    }
  }

  public info(...args: any[]) {
    if (this.level >= Log.INFO) {
      console.log.apply(this, this.buildArguments(Log.INFO).concat([].slice.call(args)));
    }
  }

  public debug(...args: any[]) {
    if (this.level >= Log.DEBUG) {
      console.log.apply(this, this.buildArguments(Log.DEBUG).concat([].slice.call(args)));
    }
  }

  public getFileLine(upStack = 4): string {
    let stack = new Error('').stack;
    if (stack) {
      let lines = stack.split('\n');
      if (lines.length > upStack) {
        let originalLines = _.drop(lines, upStack).map(resolve);
        return originalLines[0].final
      }
    }
    return '';
  }

  private buildArguments(level: number): Array<string> {
    let out: Array<string> = [];
    let showSource = false
    switch (level) {
      case Log.ERROR:
        showSource = this.showSource
        out.push(color('ERROR  ', 'red'));
        break;
      case Log.WARNING:
        showSource = this.showSource
        out.push(color('WARNING', 'yellow'));
        break;
      case Log.INFO:
        showSource = this.showSource && !this.showSourceOnlyDebug
        out.push(color('INFO   ', 'green'));
        break;
      case Log.DEBUG:
        showSource = this.showSource
        out.push(color('DEBUG  ', 'gray'));
        break;
      default:
        showSource = this.showSource && !this.showSourceOnlyDebug
        break;
    }
    if (this.showTick) {
      out.push(time());
    }
    if (showSource) {
      out.push(this.getFileLine());
    }
    return out;
  }

  private resolveStack(stack: string): string {
    if (!Log.sourceMap) {
      return stack;
    }

    return _.map(stack.split('\n').map(resolve), 'final').join('\n');
  }

  public color = color
}

if (Config.LOG_LOAD_SOURCE_MAP) {
  Log.loadSourceMap();
}

export var log = new Log();

global.log = log;
