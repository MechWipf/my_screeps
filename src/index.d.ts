interface Memory {
  uuid: number;
  log: any;
}

declare function require(path: string): any;

interface Global {
  log: any;
}

declare var global: Global;
declare var RawMemory: RawMemory

declare namespace b3 {
  class BaseNode {
    constructor()
  }
}