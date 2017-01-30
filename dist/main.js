module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Config = __webpack_require__(/*! ./config/general */ 1);
	const log_1 = __webpack_require__(/*! ./components/support/log */ 3);
	const Claims_1 = __webpack_require__(/*! ./components/classes/Claims */ 16);
	__webpack_require__(/*! ./components/classes/Room */ 17);
	__webpack_require__(/*! ./components/classes/Creep */ 21);
	if (Config.USE_PATHFINDER == true) {
	    PathFinder.use(true);
	}
	function loop() {
	    let cpu = Game.cpu.getUsed();
	    if (!Memory.uuid || Memory.uuid > 100) {
	        Memory.uuid = 0;
	    }
	    for (let i in Game.rooms) {
	        let room = Game.rooms[i];
	        room.run();
	    }
	    for (let i in Game.creeps) {
	        let creep = Game.creeps[i];
	        creep.run();
	    }
	    let cpuNow = Game.cpu.getUsed();
	    if (cpuNow > 10) {
	        log_1.log.info("Used CPU: ", cpuNow - cpu);
	    }
	}
	exports.loop = loop;
	for (let name in Memory.creeps) {
	    if (!Game.creeps[name]) {
	        log_1.log.info("Clearing non-existing creep memory:", name);
	        delete Memory.creeps[name];
	    }
	}
	Claims_1.claims.clean();


/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./src/config/general.ts ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const log_levels_1 = __webpack_require__(/*! ../components/support/log.levels */ 2);
	exports.ENABLE_DEBUG_MODE = true;
	exports.USE_PATHFINDER = true;
	exports.LOG_LEVEL = log_levels_1.LogLevels.DEBUG;
	exports.LOG_PRINT_TICK = true;
	exports.LOG_PRINT_LINES = true;
	exports.LOG_LOAD_SOURCE_MAP = true;


/***/ },
/* 2 */
/*!**********************************************!*\
  !*** ./src/components/support/log.levels.ts ***!
  \**********************************************/
/***/ function(module, exports) {

	"use strict";
	class LogLevels {
	}
	LogLevels.ERROR = 0;
	LogLevels.WARNING = 1;
	LogLevels.INFO = 2;
	LogLevels.DEBUG = 3;
	exports.LogLevels = LogLevels;
	;


/***/ },
/* 3 */
/*!***************************************!*\
  !*** ./src/components/support/log.ts ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Config = __webpack_require__(/*! ../../config/general */ 1);
	const log_levels_1 = __webpack_require__(/*! ./log.levels */ 2);
	const stackLineRe = /([^ ]*) \(([^:]*):([0-9]*):([0-9]*)\)/;
	function resolve(fileLine) {
	    let split = _.trim(fileLine).match(stackLineRe);
	    if (!split || !Log.sourceMap) {
	        return { compiled: fileLine, final: fileLine };
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
	exports.resolve = resolve;
	function color(str, color) {
	    return `<font color='${color}'>${str}</font>`;
	}
	function time() {
	    return color(Game.time.toString(), 'gray');
	}
	class Log extends log_levels_1.LogLevels {
	    constructor() {
	        super();
	        this.color = color;
	        _.defaultsDeep(Memory, {
	            log: {
	                level: Config.LOG_LEVEL,
	                showSource: Config.LOG_PRINT_LINES,
	                showSourceOnlyDebug: false,
	                showTick: Config.LOG_PRINT_TICK,
	            }
	        });
	    }
	    static loadSourceMap() {
	        try {
	            var SourceMapConsumer = __webpack_require__(/*! source-map */ 4).SourceMapConsumer;
	            const map = __webpack_require__(/*! map */ 15).d;
	            if (map) {
	                Log.sourceMap = new SourceMapConsumer(map);
	            }
	        }
	        catch (err) {
	            console.log('failed lo load source map', err);
	        }
	    }
	    get level() { return Memory.log.level; }
	    set level(value) { Memory.log.level = value; }
	    get showSource() { return Memory.log.showSource; }
	    set showSource(value) { Memory.log.showSource = value; }
	    get showSourceOnlyDebug() { return Memory.log.showSourceOnlyDebug; }
	    set showSourceOnlyDebug(value) { Memory.log.showSourceOnlyDebug = value; }
	    get showTick() { return Memory.log.showTick; }
	    set showTick(value) { Memory.log.showTick = value; }
	    trace(error) {
	        if (this.level >= Log.ERROR && error.stack) {
	            console.log(this.resolveStack(error.stack));
	        }
	        return this;
	    }
	    error(...args) {
	        if (this.level >= Log.ERROR) {
	            console.log.apply(this, this.buildArguments(Log.ERROR).concat([].slice.call(args)));
	        }
	    }
	    warning(...args) {
	        if (this.level >= Log.WARNING) {
	            console.log.apply(this, this.buildArguments(Log.WARNING).concat([].slice.call(args)));
	        }
	    }
	    info(...args) {
	        if (this.level >= Log.INFO) {
	            console.log.apply(this, this.buildArguments(Log.INFO).concat([].slice.call(args)));
	        }
	    }
	    debug(...args) {
	        if (this.level >= Log.DEBUG) {
	            console.log.apply(this, this.buildArguments(Log.DEBUG).concat([].slice.call(args)));
	        }
	    }
	    getFileLine(upStack = 4) {
	        let stack = new Error('').stack;
	        if (stack) {
	            let lines = stack.split('\n');
	            if (lines.length > upStack) {
	                let originalLines = _.drop(lines, upStack).map(resolve);
	                return originalLines[0].final;
	            }
	        }
	        return '';
	    }
	    buildArguments(level) {
	        let out = [];
	        let showSource = false;
	        switch (level) {
	            case Log.ERROR:
	                showSource = this.showSource;
	                out.push(color('ERROR  ', 'red'));
	                break;
	            case Log.WARNING:
	                showSource = this.showSource;
	                out.push(color('WARNING', 'yellow'));
	                break;
	            case Log.INFO:
	                showSource = this.showSource && !this.showSourceOnlyDebug;
	                out.push(color('INFO   ', 'green'));
	                break;
	            case Log.DEBUG:
	                showSource = this.showSource;
	                out.push(color('DEBUG  ', 'gray'));
	                break;
	            default:
	                showSource = this.showSource && !this.showSourceOnlyDebug;
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
	    resolveStack(stack) {
	        if (!Log.sourceMap) {
	            return stack;
	        }
	        return _.map(stack.split('\n').map(resolve), 'final').join('\n');
	    }
	}
	exports.Log = Log;
	if (Config.LOG_LOAD_SOURCE_MAP) {
	    Log.loadSourceMap();
	}
	exports.log = new Log();
	global.log = exports.log;


/***/ },
/* 4 */
/*!************************************!*\
  !*** ./~/source-map/source-map.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2009-2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE.txt or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	exports.SourceMapGenerator = __webpack_require__(/*! ./lib/source-map-generator */ 5).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(/*! ./lib/source-map-consumer */ 11).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(/*! ./lib/source-node */ 14).SourceNode;


/***/ },
/* 5 */
/*!**************************************************!*\
  !*** ./~/source-map/lib/source-map-generator.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	var base64VLQ = __webpack_require__(/*! ./base64-vlq */ 6);
	var util = __webpack_require__(/*! ./util */ 8);
	var ArraySet = __webpack_require__(/*! ./array-set */ 9).ArraySet;
	var MappingList = __webpack_require__(/*! ./mapping-list */ 10).MappingList;
	
	/**
	 * An instance of the SourceMapGenerator represents a source map which is
	 * being built incrementally. You may pass an object with the following
	 * properties:
	 *
	 *   - file: The filename of the generated source.
	 *   - sourceRoot: A root for all relative URLs in this source map.
	 */
	function SourceMapGenerator(aArgs) {
	  if (!aArgs) {
	    aArgs = {};
	  }
	  this._file = util.getArg(aArgs, 'file', null);
	  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	  this._sources = new ArraySet();
	  this._names = new ArraySet();
	  this._mappings = new MappingList();
	  this._sourcesContents = null;
	}
	
	SourceMapGenerator.prototype._version = 3;
	
	/**
	 * Creates a new SourceMapGenerator based on a SourceMapConsumer
	 *
	 * @param aSourceMapConsumer The SourceMap.
	 */
	SourceMapGenerator.fromSourceMap =
	  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	    var sourceRoot = aSourceMapConsumer.sourceRoot;
	    var generator = new SourceMapGenerator({
	      file: aSourceMapConsumer.file,
	      sourceRoot: sourceRoot
	    });
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      var newMapping = {
	        generated: {
	          line: mapping.generatedLine,
	          column: mapping.generatedColumn
	        }
	      };
	
	      if (mapping.source != null) {
	        newMapping.source = mapping.source;
	        if (sourceRoot != null) {
	          newMapping.source = util.relative(sourceRoot, newMapping.source);
	        }
	
	        newMapping.original = {
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        };
	
	        if (mapping.name != null) {
	          newMapping.name = mapping.name;
	        }
	      }
	
	      generator.addMapping(newMapping);
	    });
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        generator.setSourceContent(sourceFile, content);
	      }
	    });
	    return generator;
	  };
	
	/**
	 * Add a single mapping from original source line and column to the generated
	 * source's line and column for this source map being created. The mapping
	 * object should have the following properties:
	 *
	 *   - generated: An object with the generated line and column positions.
	 *   - original: An object with the original line and column positions.
	 *   - source: The original source file (relative to the sourceRoot).
	 *   - name: An optional original token name for this mapping.
	 */
	SourceMapGenerator.prototype.addMapping =
	  function SourceMapGenerator_addMapping(aArgs) {
	    var generated = util.getArg(aArgs, 'generated');
	    var original = util.getArg(aArgs, 'original', null);
	    var source = util.getArg(aArgs, 'source', null);
	    var name = util.getArg(aArgs, 'name', null);
	
	    if (!this._skipValidation) {
	      this._validateMapping(generated, original, source, name);
	    }
	
	    if (source != null) {
	      source = String(source);
	      if (!this._sources.has(source)) {
	        this._sources.add(source);
	      }
	    }
	
	    if (name != null) {
	      name = String(name);
	      if (!this._names.has(name)) {
	        this._names.add(name);
	      }
	    }
	
	    this._mappings.add({
	      generatedLine: generated.line,
	      generatedColumn: generated.column,
	      originalLine: original != null && original.line,
	      originalColumn: original != null && original.column,
	      source: source,
	      name: name
	    });
	  };
	
	/**
	 * Set the source content for a source file.
	 */
	SourceMapGenerator.prototype.setSourceContent =
	  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	    var source = aSourceFile;
	    if (this._sourceRoot != null) {
	      source = util.relative(this._sourceRoot, source);
	    }
	
	    if (aSourceContent != null) {
	      // Add the source content to the _sourcesContents map.
	      // Create a new _sourcesContents map if the property is null.
	      if (!this._sourcesContents) {
	        this._sourcesContents = Object.create(null);
	      }
	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
	    } else if (this._sourcesContents) {
	      // Remove the source file from the _sourcesContents map.
	      // If the _sourcesContents map is empty, set the property to null.
	      delete this._sourcesContents[util.toSetString(source)];
	      if (Object.keys(this._sourcesContents).length === 0) {
	        this._sourcesContents = null;
	      }
	    }
	  };
	
	/**
	 * Applies the mappings of a sub-source-map for a specific source file to the
	 * source map being generated. Each mapping to the supplied source file is
	 * rewritten using the supplied source map. Note: The resolution for the
	 * resulting mappings is the minimium of this map and the supplied map.
	 *
	 * @param aSourceMapConsumer The source map to be applied.
	 * @param aSourceFile Optional. The filename of the source file.
	 *        If omitted, SourceMapConsumer's file property will be used.
	 * @param aSourceMapPath Optional. The dirname of the path to the source map
	 *        to be applied. If relative, it is relative to the SourceMapConsumer.
	 *        This parameter is needed when the two source maps aren't in the same
	 *        directory, and the source map to be applied contains relative source
	 *        paths. If so, those relative source paths need to be rewritten
	 *        relative to the SourceMapGenerator.
	 */
	SourceMapGenerator.prototype.applySourceMap =
	  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	    var sourceFile = aSourceFile;
	    // If aSourceFile is omitted, we will use the file property of the SourceMap
	    if (aSourceFile == null) {
	      if (aSourceMapConsumer.file == null) {
	        throw new Error(
	          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	          'or the source map\'s "file" property. Both were omitted.'
	        );
	      }
	      sourceFile = aSourceMapConsumer.file;
	    }
	    var sourceRoot = this._sourceRoot;
	    // Make "sourceFile" relative if an absolute Url is passed.
	    if (sourceRoot != null) {
	      sourceFile = util.relative(sourceRoot, sourceFile);
	    }
	    // Applying the SourceMap can add and remove items from the sources and
	    // the names array.
	    var newSources = new ArraySet();
	    var newNames = new ArraySet();
	
	    // Find mappings for the "sourceFile"
	    this._mappings.unsortedForEach(function (mapping) {
	      if (mapping.source === sourceFile && mapping.originalLine != null) {
	        // Check if it can be mapped by the source map, then update the mapping.
	        var original = aSourceMapConsumer.originalPositionFor({
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        });
	        if (original.source != null) {
	          // Copy mapping
	          mapping.source = original.source;
	          if (aSourceMapPath != null) {
	            mapping.source = util.join(aSourceMapPath, mapping.source)
	          }
	          if (sourceRoot != null) {
	            mapping.source = util.relative(sourceRoot, mapping.source);
	          }
	          mapping.originalLine = original.line;
	          mapping.originalColumn = original.column;
	          if (original.name != null) {
	            mapping.name = original.name;
	          }
	        }
	      }
	
	      var source = mapping.source;
	      if (source != null && !newSources.has(source)) {
	        newSources.add(source);
	      }
	
	      var name = mapping.name;
	      if (name != null && !newNames.has(name)) {
	        newNames.add(name);
	      }
	
	    }, this);
	    this._sources = newSources;
	    this._names = newNames;
	
	    // Copy sourcesContents of applied map.
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aSourceMapPath != null) {
	          sourceFile = util.join(aSourceMapPath, sourceFile);
	        }
	        if (sourceRoot != null) {
	          sourceFile = util.relative(sourceRoot, sourceFile);
	        }
	        this.setSourceContent(sourceFile, content);
	      }
	    }, this);
	  };
	
	/**
	 * A mapping can have one of the three levels of data:
	 *
	 *   1. Just the generated position.
	 *   2. The Generated position, original position, and original source.
	 *   3. Generated and original position, original source, as well as a name
	 *      token.
	 *
	 * To maintain consistency, we validate that any new mapping being added falls
	 * in to one of these categories.
	 */
	SourceMapGenerator.prototype._validateMapping =
	  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                              aName) {
	    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	        && aGenerated.line > 0 && aGenerated.column >= 0
	        && !aOriginal && !aSource && !aName) {
	      // Case 1.
	      return;
	    }
	    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	             && aGenerated.line > 0 && aGenerated.column >= 0
	             && aOriginal.line > 0 && aOriginal.column >= 0
	             && aSource) {
	      // Cases 2 and 3.
	      return;
	    }
	    else {
	      throw new Error('Invalid mapping: ' + JSON.stringify({
	        generated: aGenerated,
	        source: aSource,
	        original: aOriginal,
	        name: aName
	      }));
	    }
	  };
	
	/**
	 * Serialize the accumulated mappings in to the stream of base 64 VLQs
	 * specified by the source map format.
	 */
	SourceMapGenerator.prototype._serializeMappings =
	  function SourceMapGenerator_serializeMappings() {
	    var previousGeneratedColumn = 0;
	    var previousGeneratedLine = 1;
	    var previousOriginalColumn = 0;
	    var previousOriginalLine = 0;
	    var previousName = 0;
	    var previousSource = 0;
	    var result = '';
	    var next;
	    var mapping;
	    var nameIdx;
	    var sourceIdx;
	
	    var mappings = this._mappings.toArray();
	    for (var i = 0, len = mappings.length; i < len; i++) {
	      mapping = mappings[i];
	      next = ''
	
	      if (mapping.generatedLine !== previousGeneratedLine) {
	        previousGeneratedColumn = 0;
	        while (mapping.generatedLine !== previousGeneratedLine) {
	          next += ';';
	          previousGeneratedLine++;
	        }
	      }
	      else {
	        if (i > 0) {
	          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
	            continue;
	          }
	          next += ',';
	        }
	      }
	
	      next += base64VLQ.encode(mapping.generatedColumn
	                                 - previousGeneratedColumn);
	      previousGeneratedColumn = mapping.generatedColumn;
	
	      if (mapping.source != null) {
	        sourceIdx = this._sources.indexOf(mapping.source);
	        next += base64VLQ.encode(sourceIdx - previousSource);
	        previousSource = sourceIdx;
	
	        // lines are stored 0-based in SourceMap spec version 3
	        next += base64VLQ.encode(mapping.originalLine - 1
	                                   - previousOriginalLine);
	        previousOriginalLine = mapping.originalLine - 1;
	
	        next += base64VLQ.encode(mapping.originalColumn
	                                   - previousOriginalColumn);
	        previousOriginalColumn = mapping.originalColumn;
	
	        if (mapping.name != null) {
	          nameIdx = this._names.indexOf(mapping.name);
	          next += base64VLQ.encode(nameIdx - previousName);
	          previousName = nameIdx;
	        }
	      }
	
	      result += next;
	    }
	
	    return result;
	  };
	
	SourceMapGenerator.prototype._generateSourcesContent =
	  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	    return aSources.map(function (source) {
	      if (!this._sourcesContents) {
	        return null;
	      }
	      if (aSourceRoot != null) {
	        source = util.relative(aSourceRoot, source);
	      }
	      var key = util.toSetString(source);
	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
	        ? this._sourcesContents[key]
	        : null;
	    }, this);
	  };
	
	/**
	 * Externalize the source map.
	 */
	SourceMapGenerator.prototype.toJSON =
	  function SourceMapGenerator_toJSON() {
	    var map = {
	      version: this._version,
	      sources: this._sources.toArray(),
	      names: this._names.toArray(),
	      mappings: this._serializeMappings()
	    };
	    if (this._file != null) {
	      map.file = this._file;
	    }
	    if (this._sourceRoot != null) {
	      map.sourceRoot = this._sourceRoot;
	    }
	    if (this._sourcesContents) {
	      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	    }
	
	    return map;
	  };
	
	/**
	 * Render the source map being generated to a string.
	 */
	SourceMapGenerator.prototype.toString =
	  function SourceMapGenerator_toString() {
	    return JSON.stringify(this.toJSON());
	  };
	
	exports.SourceMapGenerator = SourceMapGenerator;


/***/ },
/* 6 */
/*!****************************************!*\
  !*** ./~/source-map/lib/base64-vlq.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	
	var base64 = __webpack_require__(/*! ./base64 */ 7);
	
	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011
	
	var VLQ_BASE_SHIFT = 5;
	
	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	
	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	
	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	
	/**
	 * Converts from a two-complement value to a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	 */
	function toVLQSigned(aValue) {
	  return aValue < 0
	    ? ((-aValue) << 1) + 1
	    : (aValue << 1) + 0;
	}
	
	/**
	 * Converts to a two-complement value from a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	 */
	function fromVLQSigned(aValue) {
	  var isNegative = (aValue & 1) === 1;
	  var shifted = aValue >> 1;
	  return isNegative
	    ? -shifted
	    : shifted;
	}
	
	/**
	 * Returns the base 64 VLQ encoded value.
	 */
	exports.encode = function base64VLQ_encode(aValue) {
	  var encoded = "";
	  var digit;
	
	  var vlq = toVLQSigned(aValue);
	
	  do {
	    digit = vlq & VLQ_BASE_MASK;
	    vlq >>>= VLQ_BASE_SHIFT;
	    if (vlq > 0) {
	      // There are still more digits in this value, so we must make sure the
	      // continuation bit is marked.
	      digit |= VLQ_CONTINUATION_BIT;
	    }
	    encoded += base64.encode(digit);
	  } while (vlq > 0);
	
	  return encoded;
	};
	
	/**
	 * Decodes the next base 64 VLQ value from the given string and returns the
	 * value and the rest of the string via the out parameter.
	 */
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
	  var strLen = aStr.length;
	  var result = 0;
	  var shift = 0;
	  var continuation, digit;
	
	  do {
	    if (aIndex >= strLen) {
	      throw new Error("Expected more digits in base 64 VLQ value.");
	    }
	
	    digit = base64.decode(aStr.charCodeAt(aIndex++));
	    if (digit === -1) {
	      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
	    }
	
	    continuation = !!(digit & VLQ_CONTINUATION_BIT);
	    digit &= VLQ_BASE_MASK;
	    result = result + (digit << shift);
	    shift += VLQ_BASE_SHIFT;
	  } while (continuation);
	
	  aOutParam.value = fromVLQSigned(result);
	  aOutParam.rest = aIndex;
	};


/***/ },
/* 7 */
/*!************************************!*\
  !*** ./~/source-map/lib/base64.js ***!
  \************************************/
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
	
	/**
	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	 */
	exports.encode = function (number) {
	  if (0 <= number && number < intToCharMap.length) {
	    return intToCharMap[number];
	  }
	  throw new TypeError("Must be between 0 and 63: " + number);
	};
	
	/**
	 * Decode a single base 64 character code digit to an integer. Returns -1 on
	 * failure.
	 */
	exports.decode = function (charCode) {
	  var bigA = 65;     // 'A'
	  var bigZ = 90;     // 'Z'
	
	  var littleA = 97;  // 'a'
	  var littleZ = 122; // 'z'
	
	  var zero = 48;     // '0'
	  var nine = 57;     // '9'
	
	  var plus = 43;     // '+'
	  var slash = 47;    // '/'
	
	  var littleOffset = 26;
	  var numberOffset = 52;
	
	  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
	  if (bigA <= charCode && charCode <= bigZ) {
	    return (charCode - bigA);
	  }
	
	  // 26 - 51: abcdefghijklmnopqrstuvwxyz
	  if (littleA <= charCode && charCode <= littleZ) {
	    return (charCode - littleA + littleOffset);
	  }
	
	  // 52 - 61: 0123456789
	  if (zero <= charCode && charCode <= nine) {
	    return (charCode - zero + numberOffset);
	  }
	
	  // 62: +
	  if (charCode == plus) {
	    return 62;
	  }
	
	  // 63: /
	  if (charCode == slash) {
	    return 63;
	  }
	
	  // Invalid base64 digit.
	  return -1;
	};


/***/ },
/* 8 */
/*!**********************************!*\
  !*** ./~/source-map/lib/util.js ***!
  \**********************************/
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  } else {
	    throw new Error('"' + aName + '" is a required argument.');
	  }
	}
	exports.getArg = getArg;
	
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	
	function urlParse(aUrl) {
	  var match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null;
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5]
	  };
	}
	exports.urlParse = urlParse;
	
	function urlGenerate(aParsedUrl) {
	  var url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ":" + aParsedUrl.port
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url;
	}
	exports.urlGenerate = urlGenerate;
	
	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	function normalize(aPath) {
	  var path = aPath;
	  var url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath;
	    }
	    path = url.path;
	  }
	  var isAbsolute = exports.isAbsolute(path);
	
	  var parts = path.split(/\/+/);
	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	    part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');
	
	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }
	
	  if (url) {
	    url.path = path;
	    return urlGenerate(url);
	  }
	  return path;
	}
	exports.normalize = normalize;
	
	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	  if (aPath === "") {
	    aPath = ".";
	  }
	  var aPathUrl = urlParse(aPath);
	  var aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }
	
	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl);
	  }
	
	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath;
	  }
	
	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl);
	  }
	
	  var joined = aPath.charAt(0) === '/'
	    ? aPath
	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
	
	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl);
	  }
	  return joined;
	}
	exports.join = join;
	
	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	};
	
	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	
	  aRoot = aRoot.replace(/\/$/, '');
	
	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  var level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    var index = aRoot.lastIndexOf("/");
	    if (index < 0) {
	      return aPath;
	    }
	
	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath;
	    }
	
	    ++level;
	  }
	
	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	
	var supportsNullProto = (function () {
	  var obj = Object.create(null);
	  return !('__proto__' in obj);
	}());
	
	function identity (s) {
	  return s;
	}
	
	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr;
	  }
	
	  return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	
	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }
	
	  return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	
	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }
	
	  var length = s.length;
	
	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }
	
	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
	    return false;
	  }
	
	  for (var i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp = mappingA.source - mappingB.source;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }
	
	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  return mappingA.name - mappingB.name;
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	
	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }
	
	  cmp = mappingA.source - mappingB.source;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  return mappingA.name - mappingB.name;
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	
	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }
	
	  if (aStr1 > aStr2) {
	    return 1;
	  }
	
	  return -1;
	}
	
	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ },
/* 9 */
/*!***************************************!*\
  !*** ./~/source-map/lib/array-set.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	var util = __webpack_require__(/*! ./util */ 8);
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * A data structure which is a combination of an array and a set. Adding a new
	 * member is O(1), testing for membership is O(1), and finding the index of an
	 * element is O(1). Removing elements from the set is not supported. Only
	 * strings are supported for membership.
	 */
	function ArraySet() {
	  this._array = [];
	  this._set = Object.create(null);
	}
	
	/**
	 * Static method for creating ArraySet instances from an existing array.
	 */
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	  var set = new ArraySet();
	  for (var i = 0, len = aArray.length; i < len; i++) {
	    set.add(aArray[i], aAllowDuplicates);
	  }
	  return set;
	};
	
	/**
	 * Return how many unique items are in this ArraySet. If duplicates have been
	 * added, than those do not count towards the size.
	 *
	 * @returns Number
	 */
	ArraySet.prototype.size = function ArraySet_size() {
	  return Object.getOwnPropertyNames(this._set).length;
	};
	
	/**
	 * Add the given string to this set.
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	  var sStr = util.toSetString(aStr);
	  var isDuplicate = has.call(this._set, sStr);
	  var idx = this._array.length;
	  if (!isDuplicate || aAllowDuplicates) {
	    this._array.push(aStr);
	  }
	  if (!isDuplicate) {
	    this._set[sStr] = idx;
	  }
	};
	
	/**
	 * Is the given string a member of this set?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.has = function ArraySet_has(aStr) {
	  var sStr = util.toSetString(aStr);
	  return has.call(this._set, sStr);
	};
	
	/**
	 * What is the index of the given string in the array?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	  var sStr = util.toSetString(aStr);
	  if (has.call(this._set, sStr)) {
	    return this._set[sStr];
	  }
	  throw new Error('"' + aStr + '" is not in the set.');
	};
	
	/**
	 * What is the element at the given index?
	 *
	 * @param Number aIdx
	 */
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
	  if (aIdx >= 0 && aIdx < this._array.length) {
	    return this._array[aIdx];
	  }
	  throw new Error('No element indexed by ' + aIdx);
	};
	
	/**
	 * Returns the array representation of this set (which has the proper indices
	 * indicated by indexOf). Note that this is a copy of the internal array used
	 * for storing the members so that no one can mess with internal state.
	 */
	ArraySet.prototype.toArray = function ArraySet_toArray() {
	  return this._array.slice();
	};
	
	exports.ArraySet = ArraySet;


/***/ },
/* 10 */
/*!******************************************!*\
  !*** ./~/source-map/lib/mapping-list.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	var util = __webpack_require__(/*! ./util */ 8);
	
	/**
	 * Determine whether mappingB is after mappingA with respect to generated
	 * position.
	 */
	function generatedPositionAfter(mappingA, mappingB) {
	  // Optimized for most common case
	  var lineA = mappingA.generatedLine;
	  var lineB = mappingB.generatedLine;
	  var columnA = mappingA.generatedColumn;
	  var columnB = mappingB.generatedColumn;
	  return lineB > lineA || lineB == lineA && columnB >= columnA ||
	         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	
	/**
	 * A data structure to provide a sorted view of accumulated mappings in a
	 * performance conscious manner. It trades a neglibable overhead in general
	 * case for a large speedup in case of mappings being added in order.
	 */
	function MappingList() {
	  this._array = [];
	  this._sorted = true;
	  // Serves as infimum
	  this._last = {generatedLine: -1, generatedColumn: 0};
	}
	
	/**
	 * Iterate through internal items. This method takes the same arguments that
	 * `Array.prototype.forEach` takes.
	 *
	 * NOTE: The order of the mappings is NOT guaranteed.
	 */
	MappingList.prototype.unsortedForEach =
	  function MappingList_forEach(aCallback, aThisArg) {
	    this._array.forEach(aCallback, aThisArg);
	  };
	
	/**
	 * Add the given source mapping.
	 *
	 * @param Object aMapping
	 */
	MappingList.prototype.add = function MappingList_add(aMapping) {
	  if (generatedPositionAfter(this._last, aMapping)) {
	    this._last = aMapping;
	    this._array.push(aMapping);
	  } else {
	    this._sorted = false;
	    this._array.push(aMapping);
	  }
	};
	
	/**
	 * Returns the flat, sorted array of mappings. The mappings are sorted by
	 * generated position.
	 *
	 * WARNING: This method returns internal data without copying, for
	 * performance. The return value must NOT be mutated, and should be treated as
	 * an immutable borrow. If you want to take ownership, you must make your own
	 * copy.
	 */
	MappingList.prototype.toArray = function MappingList_toArray() {
	  if (!this._sorted) {
	    this._array.sort(util.compareByGeneratedPositionsInflated);
	    this._sorted = true;
	  }
	  return this._array;
	};
	
	exports.MappingList = MappingList;


/***/ },
/* 11 */
/*!*************************************************!*\
  !*** ./~/source-map/lib/source-map-consumer.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	var util = __webpack_require__(/*! ./util */ 8);
	var binarySearch = __webpack_require__(/*! ./binary-search */ 12);
	var ArraySet = __webpack_require__(/*! ./array-set */ 9).ArraySet;
	var base64VLQ = __webpack_require__(/*! ./base64-vlq */ 6);
	var quickSort = __webpack_require__(/*! ./quick-sort */ 13).quickSort;
	
	function SourceMapConsumer(aSourceMap) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	  }
	
	  return sourceMap.sections != null
	    ? new IndexedSourceMapConsumer(sourceMap)
	    : new BasicSourceMapConsumer(sourceMap);
	}
	
	SourceMapConsumer.fromSourceMap = function(aSourceMap) {
	  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	}
	
	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	SourceMapConsumer.prototype._version = 3;
	
	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.
	
	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	  get: function () {
	    if (!this.__generatedMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }
	
	    return this.__generatedMappings;
	  }
	});
	
	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	  get: function () {
	    if (!this.__originalMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }
	
	    return this.__originalMappings;
	  }
	});
	
	SourceMapConsumer.prototype._charIsMappingSeparator =
	  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
	    var c = aStr.charAt(index);
	    return c === ";" || c === ",";
	  };
	
	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	SourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    throw new Error("Subclasses must implement _parseMappings");
	  };
	
	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;
	
	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;
	
	/**
	 * Iterate over each mapping between an original source/line/column and a
	 * generated line/column in this source map.
	 *
	 * @param Function aCallback
	 *        The function that is called with each mapping.
	 * @param Object aContext
	 *        Optional. If specified, this object will be the value of `this` every
	 *        time that `aCallback` is called.
	 * @param aOrder
	 *        Either `SourceMapConsumer.GENERATED_ORDER` or
	 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	 *        iterate over the mappings sorted by the generated file's line/column
	 *        order or the original's source/line/column order, respectively. Defaults to
	 *        `SourceMapConsumer.GENERATED_ORDER`.
	 */
	SourceMapConsumer.prototype.eachMapping =
	  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	    var context = aContext || null;
	    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
	
	    var mappings;
	    switch (order) {
	    case SourceMapConsumer.GENERATED_ORDER:
	      mappings = this._generatedMappings;
	      break;
	    case SourceMapConsumer.ORIGINAL_ORDER:
	      mappings = this._originalMappings;
	      break;
	    default:
	      throw new Error("Unknown order of iteration.");
	    }
	
	    var sourceRoot = this.sourceRoot;
	    mappings.map(function (mapping) {
	      var source = mapping.source === null ? null : this._sources.at(mapping.source);
	      if (source != null && sourceRoot != null) {
	        source = util.join(sourceRoot, source);
	      }
	      return {
	        source: source,
	        generatedLine: mapping.generatedLine,
	        generatedColumn: mapping.generatedColumn,
	        originalLine: mapping.originalLine,
	        originalColumn: mapping.originalColumn,
	        name: mapping.name === null ? null : this._names.at(mapping.name)
	      };
	    }, this).forEach(aCallback, context);
	  };
	
	/**
	 * Returns all generated line and column information for the original source,
	 * line, and column provided. If no column is provided, returns all mappings
	 * corresponding to a either the line we are searching for or the next
	 * closest line that has any mappings. Otherwise, returns all mappings
	 * corresponding to the given line and either the column we are searching for
	 * or the next closest column that has any offsets.
	 *
	 * The only argument is an object with the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.
	 *   - column: Optional. the column number in the original source.
	 *
	 * and an array of objects is returned, each with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.
	 *   - column: The column number in the generated source, or null.
	 */
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
	  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	    var line = util.getArg(aArgs, 'line');
	
	    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
	    // returns the index of the closest mapping less than the needle. By
	    // setting needle.originalColumn to 0, we thus find the last mapping for
	    // the given line, provided such a mapping exists.
	    var needle = {
	      source: util.getArg(aArgs, 'source'),
	      originalLine: line,
	      originalColumn: util.getArg(aArgs, 'column', 0)
	    };
	
	    if (this.sourceRoot != null) {
	      needle.source = util.relative(this.sourceRoot, needle.source);
	    }
	    if (!this._sources.has(needle.source)) {
	      return [];
	    }
	    needle.source = this._sources.indexOf(needle.source);
	
	    var mappings = [];
	
	    var index = this._findMapping(needle,
	                                  this._originalMappings,
	                                  "originalLine",
	                                  "originalColumn",
	                                  util.compareByOriginalPositions,
	                                  binarySearch.LEAST_UPPER_BOUND);
	    if (index >= 0) {
	      var mapping = this._originalMappings[index];
	
	      if (aArgs.column === undefined) {
	        var originalLine = mapping.originalLine;
	
	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we found. Since
	        // mappings are sorted, this is guaranteed to find all mappings for
	        // the line we found.
	        while (mapping && mapping.originalLine === originalLine) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });
	
	          mapping = this._originalMappings[++index];
	        }
	      } else {
	        var originalColumn = mapping.originalColumn;
	
	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we were searching for.
	        // Since mappings are sorted, this is guaranteed to find all mappings for
	        // the line we are searching for.
	        while (mapping &&
	               mapping.originalLine === line &&
	               mapping.originalColumn == originalColumn) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });
	
	          mapping = this._originalMappings[++index];
	        }
	      }
	    }
	
	    return mappings;
	  };
	
	exports.SourceMapConsumer = SourceMapConsumer;
	
	/**
	 * A BasicSourceMapConsumer instance represents a parsed source map which we can
	 * query for information about the original file positions by giving it a file
	 * position in the generated source.
	 *
	 * The only parameter is the raw source map (either as a JSON string, or
	 * already parsed to an object). According to the spec, source maps have the
	 * following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - sources: An array of URLs to the original source files.
	 *   - names: An array of identifiers which can be referrenced by individual mappings.
	 *   - sourceRoot: Optional. The URL root from which all sources are relative.
	 *   - sourcesContent: Optional. An array of contents of the original source files.
	 *   - mappings: A string of base64 VLQs which contain the actual mappings.
	 *   - file: Optional. The generated file this source map is associated with.
	 *
	 * Here is an example source map, taken from the source map spec[0]:
	 *
	 *     {
	 *       version : 3,
	 *       file: "out.js",
	 *       sourceRoot : "",
	 *       sources: ["foo.js", "bar.js"],
	 *       names: ["src", "maps", "are", "fun"],
	 *       mappings: "AA,AB;;ABCDE;"
	 *     }
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	 */
	function BasicSourceMapConsumer(aSourceMap) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	  }
	
	  var version = util.getArg(sourceMap, 'version');
	  var sources = util.getArg(sourceMap, 'sources');
	  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	  // requires the array) to play nice here.
	  var names = util.getArg(sourceMap, 'names', []);
	  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	  var mappings = util.getArg(sourceMap, 'mappings');
	  var file = util.getArg(sourceMap, 'file', null);
	
	  // Once again, Sass deviates from the spec and supplies the version as a
	  // string rather than a number, so we use loose equality checking here.
	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }
	
	  sources = sources
	    .map(String)
	    // Some source maps produce relative source paths like "./foo.js" instead of
	    // "foo.js".  Normalize these first so that future comparisons will succeed.
	    // See bugzil.la/1090768.
	    .map(util.normalize)
	    // Always ensure that absolute sources are internally stored relative to
	    // the source root, if the source root is absolute. Not doing this would
	    // be particularly problematic when the source root is a prefix of the
	    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
	    .map(function (source) {
	      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
	        ? util.relative(sourceRoot, source)
	        : source;
	    });
	
	  // Pass `true` below to allow duplicate names and sources. While source maps
	  // are intended to be compressed and deduplicated, the TypeScript compiler
	  // sometimes generates source maps with duplicates in them. See Github issue
	  // #72 and bugzil.la/889492.
	  this._names = ArraySet.fromArray(names.map(String), true);
	  this._sources = ArraySet.fromArray(sources, true);
	
	  this.sourceRoot = sourceRoot;
	  this.sourcesContent = sourcesContent;
	  this._mappings = mappings;
	  this.file = file;
	}
	
	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	
	/**
	 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	 *
	 * @param SourceMapGenerator aSourceMap
	 *        The source map that will be consumed.
	 * @returns BasicSourceMapConsumer
	 */
	BasicSourceMapConsumer.fromSourceMap =
	  function SourceMapConsumer_fromSourceMap(aSourceMap) {
	    var smc = Object.create(BasicSourceMapConsumer.prototype);
	
	    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	    smc.sourceRoot = aSourceMap._sourceRoot;
	    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                            smc.sourceRoot);
	    smc.file = aSourceMap._file;
	
	    // Because we are modifying the entries (by converting string sources and
	    // names to indices into the sources and names ArraySets), we have to make
	    // a copy of the entry or else bad things happen. Shared mutable state
	    // strikes again! See github issue #191.
	
	    var generatedMappings = aSourceMap._mappings.toArray().slice();
	    var destGeneratedMappings = smc.__generatedMappings = [];
	    var destOriginalMappings = smc.__originalMappings = [];
	
	    for (var i = 0, length = generatedMappings.length; i < length; i++) {
	      var srcMapping = generatedMappings[i];
	      var destMapping = new Mapping;
	      destMapping.generatedLine = srcMapping.generatedLine;
	      destMapping.generatedColumn = srcMapping.generatedColumn;
	
	      if (srcMapping.source) {
	        destMapping.source = sources.indexOf(srcMapping.source);
	        destMapping.originalLine = srcMapping.originalLine;
	        destMapping.originalColumn = srcMapping.originalColumn;
	
	        if (srcMapping.name) {
	          destMapping.name = names.indexOf(srcMapping.name);
	        }
	
	        destOriginalMappings.push(destMapping);
	      }
	
	      destGeneratedMappings.push(destMapping);
	    }
	
	    quickSort(smc.__originalMappings, util.compareByOriginalPositions);
	
	    return smc;
	  };
	
	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	BasicSourceMapConsumer.prototype._version = 3;
	
	/**
	 * The list of original sources.
	 */
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    return this._sources.toArray().map(function (s) {
	      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
	    }, this);
	  }
	});
	
	/**
	 * Provide the JIT with a nice shape / hidden class.
	 */
	function Mapping() {
	  this.generatedLine = 0;
	  this.generatedColumn = 0;
	  this.source = null;
	  this.originalLine = null;
	  this.originalColumn = null;
	  this.name = null;
	}
	
	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	BasicSourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    var generatedLine = 1;
	    var previousGeneratedColumn = 0;
	    var previousOriginalLine = 0;
	    var previousOriginalColumn = 0;
	    var previousSource = 0;
	    var previousName = 0;
	    var length = aStr.length;
	    var index = 0;
	    var cachedSegments = {};
	    var temp = {};
	    var originalMappings = [];
	    var generatedMappings = [];
	    var mapping, str, segment, end, value;
	
	    while (index < length) {
	      if (aStr.charAt(index) === ';') {
	        generatedLine++;
	        index++;
	        previousGeneratedColumn = 0;
	      }
	      else if (aStr.charAt(index) === ',') {
	        index++;
	      }
	      else {
	        mapping = new Mapping();
	        mapping.generatedLine = generatedLine;
	
	        // Because each offset is encoded relative to the previous one,
	        // many segments often have the same encoding. We can exploit this
	        // fact by caching the parsed variable length fields of each segment,
	        // allowing us to avoid a second parse if we encounter the same
	        // segment again.
	        for (end = index; end < length; end++) {
	          if (this._charIsMappingSeparator(aStr, end)) {
	            break;
	          }
	        }
	        str = aStr.slice(index, end);
	
	        segment = cachedSegments[str];
	        if (segment) {
	          index += str.length;
	        } else {
	          segment = [];
	          while (index < end) {
	            base64VLQ.decode(aStr, index, temp);
	            value = temp.value;
	            index = temp.rest;
	            segment.push(value);
	          }
	
	          if (segment.length === 2) {
	            throw new Error('Found a source, but no line and column');
	          }
	
	          if (segment.length === 3) {
	            throw new Error('Found a source and line, but no column');
	          }
	
	          cachedSegments[str] = segment;
	        }
	
	        // Generated column.
	        mapping.generatedColumn = previousGeneratedColumn + segment[0];
	        previousGeneratedColumn = mapping.generatedColumn;
	
	        if (segment.length > 1) {
	          // Original source.
	          mapping.source = previousSource + segment[1];
	          previousSource += segment[1];
	
	          // Original line.
	          mapping.originalLine = previousOriginalLine + segment[2];
	          previousOriginalLine = mapping.originalLine;
	          // Lines are stored 0-based
	          mapping.originalLine += 1;
	
	          // Original column.
	          mapping.originalColumn = previousOriginalColumn + segment[3];
	          previousOriginalColumn = mapping.originalColumn;
	
	          if (segment.length > 4) {
	            // Original name.
	            mapping.name = previousName + segment[4];
	            previousName += segment[4];
	          }
	        }
	
	        generatedMappings.push(mapping);
	        if (typeof mapping.originalLine === 'number') {
	          originalMappings.push(mapping);
	        }
	      }
	    }
	
	    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
	    this.__generatedMappings = generatedMappings;
	
	    quickSort(originalMappings, util.compareByOriginalPositions);
	    this.__originalMappings = originalMappings;
	  };
	
	/**
	 * Find the mapping that best matches the hypothetical "needle" mapping that
	 * we are searching for in the given "haystack" of mappings.
	 */
	BasicSourceMapConsumer.prototype._findMapping =
	  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                         aColumnName, aComparator, aBias) {
	    // To return the position we are searching for, we must first find the
	    // mapping for the given position and then return the opposite position it
	    // points to. Because the mappings are sorted, we can use binary search to
	    // find the best mapping.
	
	    if (aNeedle[aLineName] <= 0) {
	      throw new TypeError('Line must be greater than or equal to 1, got '
	                          + aNeedle[aLineName]);
	    }
	    if (aNeedle[aColumnName] < 0) {
	      throw new TypeError('Column must be greater than or equal to 0, got '
	                          + aNeedle[aColumnName]);
	    }
	
	    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	  };
	
	/**
	 * Compute the last column for each generated mapping. The last column is
	 * inclusive.
	 */
	BasicSourceMapConsumer.prototype.computeColumnSpans =
	  function SourceMapConsumer_computeColumnSpans() {
	    for (var index = 0; index < this._generatedMappings.length; ++index) {
	      var mapping = this._generatedMappings[index];
	
	      // Mappings do not contain a field for the last generated columnt. We
	      // can come up with an optimistic estimate, however, by assuming that
	      // mappings are contiguous (i.e. given two consecutive mappings, the
	      // first mapping ends where the second one starts).
	      if (index + 1 < this._generatedMappings.length) {
	        var nextMapping = this._generatedMappings[index + 1];
	
	        if (mapping.generatedLine === nextMapping.generatedLine) {
	          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	          continue;
	        }
	      }
	
	      // The last mapping for each line spans the entire line.
	      mapping.lastGeneratedColumn = Infinity;
	    }
	  };
	
	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.
	 *   - column: The column number in the generated source.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.
	 *   - column: The column number in the original source, or null.
	 *   - name: The original identifier, or null.
	 */
	BasicSourceMapConsumer.prototype.originalPositionFor =
	  function SourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };
	
	    var index = this._findMapping(
	      needle,
	      this._generatedMappings,
	      "generatedLine",
	      "generatedColumn",
	      util.compareByGeneratedPositionsDeflated,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );
	
	    if (index >= 0) {
	      var mapping = this._generatedMappings[index];
	
	      if (mapping.generatedLine === needle.generatedLine) {
	        var source = util.getArg(mapping, 'source', null);
	        if (source !== null) {
	          source = this._sources.at(source);
	          if (this.sourceRoot != null) {
	            source = util.join(this.sourceRoot, source);
	          }
	        }
	        var name = util.getArg(mapping, 'name', null);
	        if (name !== null) {
	          name = this._names.at(name);
	        }
	        return {
	          source: source,
	          line: util.getArg(mapping, 'originalLine', null),
	          column: util.getArg(mapping, 'originalColumn', null),
	          name: name
	        };
	      }
	    }
	
	    return {
	      source: null,
	      line: null,
	      column: null,
	      name: null
	    };
	  };
	
	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function BasicSourceMapConsumer_hasContentsOfAllSources() {
	    if (!this.sourcesContent) {
	      return false;
	    }
	    return this.sourcesContent.length >= this._sources.size() &&
	      !this.sourcesContent.some(function (sc) { return sc == null; });
	  };
	
	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	BasicSourceMapConsumer.prototype.sourceContentFor =
	  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    if (!this.sourcesContent) {
	      return null;
	    }
	
	    if (this.sourceRoot != null) {
	      aSource = util.relative(this.sourceRoot, aSource);
	    }
	
	    if (this._sources.has(aSource)) {
	      return this.sourcesContent[this._sources.indexOf(aSource)];
	    }
	
	    var url;
	    if (this.sourceRoot != null
	        && (url = util.urlParse(this.sourceRoot))) {
	      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	      // many users. We can help them out when they expect file:// URIs to
	      // behave like it would if they were running a local HTTP server. See
	      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
	      if (url.scheme == "file"
	          && this._sources.has(fileUriAbsPath)) {
	        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	      }
	
	      if ((!url.path || url.path == "/")
	          && this._sources.has("/" + aSource)) {
	        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
	      }
	    }
	
	    // This function is used recursively from
	    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	    // don't want to throw if we can't find the source - we just want to
	    // return null, so we provide a flag to exit gracefully.
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    }
	  };
	
	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.
	 *   - column: The column number in the original source.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.
	 *   - column: The column number in the generated source, or null.
	 */
	BasicSourceMapConsumer.prototype.generatedPositionFor =
	  function SourceMapConsumer_generatedPositionFor(aArgs) {
	    var source = util.getArg(aArgs, 'source');
	    if (this.sourceRoot != null) {
	      source = util.relative(this.sourceRoot, source);
	    }
	    if (!this._sources.has(source)) {
	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    }
	    source = this._sources.indexOf(source);
	
	    var needle = {
	      source: source,
	      originalLine: util.getArg(aArgs, 'line'),
	      originalColumn: util.getArg(aArgs, 'column')
	    };
	
	    var index = this._findMapping(
	      needle,
	      this._originalMappings,
	      "originalLine",
	      "originalColumn",
	      util.compareByOriginalPositions,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );
	
	    if (index >= 0) {
	      var mapping = this._originalMappings[index];
	
	      if (mapping.source === needle.source) {
	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null),
	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	        };
	      }
	    }
	
	    return {
	      line: null,
	      column: null,
	      lastColumn: null
	    };
	  };
	
	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	
	/**
	 * An IndexedSourceMapConsumer instance represents a parsed source map which
	 * we can query for information. It differs from BasicSourceMapConsumer in
	 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	 * input.
	 *
	 * The only parameter is a raw source map (either as a JSON string, or already
	 * parsed to an object). According to the spec for indexed source maps, they
	 * have the following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - file: Optional. The generated file this source map is associated with.
	 *   - sections: A list of section definitions.
	 *
	 * Each value under the "sections" field has two fields:
	 *   - offset: The offset into the original specified at which this section
	 *       begins to apply, defined as an object with a "line" and "column"
	 *       field.
	 *   - map: A source map definition. This source map could also be indexed,
	 *       but doesn't have to be.
	 *
	 * Instead of the "map" field, it's also possible to have a "url" field
	 * specifying a URL to retrieve a source map from, but that's currently
	 * unsupported.
	 *
	 * Here's an example source map, taken from the source map spec[0], but
	 * modified to omit a section which uses the "url" field.
	 *
	 *  {
	 *    version : 3,
	 *    file: "app.js",
	 *    sections: [{
	 *      offset: {line:100, column:10},
	 *      map: {
	 *        version : 3,
	 *        file: "section.js",
	 *        sources: ["foo.js", "bar.js"],
	 *        names: ["src", "maps", "are", "fun"],
	 *        mappings: "AAAA,E;;ABCDE;"
	 *      }
	 *    }],
	 *  }
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	 */
	function IndexedSourceMapConsumer(aSourceMap) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	  }
	
	  var version = util.getArg(sourceMap, 'version');
	  var sections = util.getArg(sourceMap, 'sections');
	
	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }
	
	  this._sources = new ArraySet();
	  this._names = new ArraySet();
	
	  var lastOffset = {
	    line: -1,
	    column: 0
	  };
	  this._sections = sections.map(function (s) {
	    if (s.url) {
	      // The url field will require support for asynchronicity.
	      // See https://github.com/mozilla/source-map/issues/16
	      throw new Error('Support for url field in sections not implemented.');
	    }
	    var offset = util.getArg(s, 'offset');
	    var offsetLine = util.getArg(offset, 'line');
	    var offsetColumn = util.getArg(offset, 'column');
	
	    if (offsetLine < lastOffset.line ||
	        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
	      throw new Error('Section offsets must be ordered and non-overlapping.');
	    }
	    lastOffset = offset;
	
	    return {
	      generatedOffset: {
	        // The offset fields are 0-based, but we use 1-based indices when
	        // encoding/decoding from VLQ.
	        generatedLine: offsetLine + 1,
	        generatedColumn: offsetColumn + 1
	      },
	      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
	    }
	  });
	}
	
	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
	
	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	IndexedSourceMapConsumer.prototype._version = 3;
	
	/**
	 * The list of original sources.
	 */
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    var sources = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
	        sources.push(this._sections[i].consumer.sources[j]);
	      }
	    }
	    return sources;
	  }
	});
	
	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.
	 *   - column: The column number in the generated source.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.
	 *   - column: The column number in the original source, or null.
	 *   - name: The original identifier, or null.
	 */
	IndexedSourceMapConsumer.prototype.originalPositionFor =
	  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };
	
	    // Find the section containing the generated position we're trying to map
	    // to an original position.
	    var sectionIndex = binarySearch.search(needle, this._sections,
	      function(needle, section) {
	        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
	        if (cmp) {
	          return cmp;
	        }
	
	        return (needle.generatedColumn -
	                section.generatedOffset.generatedColumn);
	      });
	    var section = this._sections[sectionIndex];
	
	    if (!section) {
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    }
	
	    return section.consumer.originalPositionFor({
	      line: needle.generatedLine -
	        (section.generatedOffset.generatedLine - 1),
	      column: needle.generatedColumn -
	        (section.generatedOffset.generatedLine === needle.generatedLine
	         ? section.generatedOffset.generatedColumn - 1
	         : 0),
	      bias: aArgs.bias
	    });
	  };
	
	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
	    return this._sections.every(function (s) {
	      return s.consumer.hasContentsOfAllSources();
	    });
	  };
	
	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	IndexedSourceMapConsumer.prototype.sourceContentFor =
	  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];
	
	      var content = section.consumer.sourceContentFor(aSource, true);
	      if (content) {
	        return content;
	      }
	    }
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    }
	  };
	
	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.
	 *   - column: The column number in the original source.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.
	 *   - column: The column number in the generated source, or null.
	 */
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
	  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];
	
	      // Only consider this section if the requested source is in the list of
	      // sources of the consumer.
	      if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
	        continue;
	      }
	      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
	      if (generatedPosition) {
	        var ret = {
	          line: generatedPosition.line +
	            (section.generatedOffset.generatedLine - 1),
	          column: generatedPosition.column +
	            (section.generatedOffset.generatedLine === generatedPosition.line
	             ? section.generatedOffset.generatedColumn - 1
	             : 0)
	        };
	        return ret;
	      }
	    }
	
	    return {
	      line: null,
	      column: null
	    };
	  };
	
	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	IndexedSourceMapConsumer.prototype._parseMappings =
	  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    this.__generatedMappings = [];
	    this.__originalMappings = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];
	      var sectionMappings = section.consumer._generatedMappings;
	      for (var j = 0; j < sectionMappings.length; j++) {
	        var mapping = sectionMappings[j];
	
	        var source = section.consumer._sources.at(mapping.source);
	        if (section.consumer.sourceRoot !== null) {
	          source = util.join(section.consumer.sourceRoot, source);
	        }
	        this._sources.add(source);
	        source = this._sources.indexOf(source);
	
	        var name = section.consumer._names.at(mapping.name);
	        this._names.add(name);
	        name = this._names.indexOf(name);
	
	        // The mappings coming from the consumer for the section have
	        // generated positions relative to the start of the section, so we
	        // need to offset them to be relative to the start of the concatenated
	        // generated file.
	        var adjustedMapping = {
	          source: source,
	          generatedLine: mapping.generatedLine +
	            (section.generatedOffset.generatedLine - 1),
	          generatedColumn: mapping.generatedColumn +
	            (section.generatedOffset.generatedLine === mapping.generatedLine
	            ? section.generatedOffset.generatedColumn - 1
	            : 0),
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: name
	        };
	
	        this.__generatedMappings.push(adjustedMapping);
	        if (typeof adjustedMapping.originalLine === 'number') {
	          this.__originalMappings.push(adjustedMapping);
	        }
	      }
	    }
	
	    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
	    quickSort(this.__originalMappings, util.compareByOriginalPositions);
	  };
	
	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ },
/* 12 */
/*!*******************************************!*\
  !*** ./~/source-map/lib/binary-search.js ***!
  \*******************************************/
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;
	
	/**
	 * Recursive implementation of binary search.
	 *
	 * @param aLow Indices here and lower do not contain the needle.
	 * @param aHigh Indices here and higher do not contain the needle.
	 * @param aNeedle The element being searched for.
	 * @param aHaystack The non-empty array being searched.
	 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 */
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
	  // This function terminates when one of the following is true:
	  //
	  //   1. We find the exact element we are looking for.
	  //
	  //   2. We did not find the exact element, but we can return the index of
	  //      the next-closest element.
	  //
	  //   3. We did not find the exact element, and there is no next-closest
	  //      element than the one we are searching for, so we return -1.
	  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	  var cmp = aCompare(aNeedle, aHaystack[mid], true);
	  if (cmp === 0) {
	    // Found the element we are looking for.
	    return mid;
	  }
	  else if (cmp > 0) {
	    // Our needle is greater than aHaystack[mid].
	    if (aHigh - mid > 1) {
	      // The element is in the upper half.
	      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
	    }
	
	    // The exact needle element was not found in this haystack. Determine if
	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return aHigh < aHaystack.length ? aHigh : -1;
	    } else {
	      return mid;
	    }
	  }
	  else {
	    // Our needle is less than aHaystack[mid].
	    if (mid - aLow > 1) {
	      // The element is in the lower half.
	      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
	    }
	
	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return mid;
	    } else {
	      return aLow < 0 ? -1 : aLow;
	    }
	  }
	}
	
	/**
	 * This is an implementation of binary search which will always try and return
	 * the index of the closest element if there is no exact hit. This is because
	 * mappings between original and generated line/col pairs are single points,
	 * and there is an implicit region between each of them, so a miss just means
	 * that you aren't on the very start of a region.
	 *
	 * @param aNeedle The element you are looking for.
	 * @param aHaystack The array that is being searched.
	 * @param aCompare A function which takes the needle and an element in the
	 *     array and returns -1, 0, or 1 depending on whether the needle is less
	 *     than, equal to, or greater than the element, respectively.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	 */
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
	  if (aHaystack.length === 0) {
	    return -1;
	  }
	
	  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
	                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
	  if (index < 0) {
	    return -1;
	  }
	
	  // We have found either the exact element, or the next-closest element than
	  // the one we are searching for. However, there may be more than one such
	  // element. Make sure we always return the smallest of these.
	  while (index - 1 >= 0) {
	    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
	      break;
	    }
	    --index;
	  }
	
	  return index;
	};


/***/ },
/* 13 */
/*!****************************************!*\
  !*** ./~/source-map/lib/quick-sort.js ***!
  \****************************************/
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.
	
	/**
	 * Swap the elements indexed by `x` and `y` in the array `ary`.
	 *
	 * @param {Array} ary
	 *        The array.
	 * @param {Number} x
	 *        The index of the first item.
	 * @param {Number} y
	 *        The index of the second item.
	 */
	function swap(ary, x, y) {
	  var temp = ary[x];
	  ary[x] = ary[y];
	  ary[y] = temp;
	}
	
	/**
	 * Returns a random integer within the range `low .. high` inclusive.
	 *
	 * @param {Number} low
	 *        The lower bound on the range.
	 * @param {Number} high
	 *        The upper bound on the range.
	 */
	function randomIntInRange(low, high) {
	  return Math.round(low + (Math.random() * (high - low)));
	}
	
	/**
	 * The Quick Sort algorithm.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 * @param {Number} p
	 *        Start index of the array
	 * @param {Number} r
	 *        End index of the array
	 */
	function doQuickSort(ary, comparator, p, r) {
	  // If our lower bound is less than our upper bound, we (1) partition the
	  // array into two pieces and (2) recurse on each half. If it is not, this is
	  // the empty array and our base case.
	
	  if (p < r) {
	    // (1) Partitioning.
	    //
	    // The partitioning chooses a pivot between `p` and `r` and moves all
	    // elements that are less than or equal to the pivot to the before it, and
	    // all the elements that are greater than it after it. The effect is that
	    // once partition is done, the pivot is in the exact place it will be when
	    // the array is put in sorted order, and it will not need to be moved
	    // again. This runs in O(n) time.
	
	    // Always choose a random pivot so that an input array which is reverse
	    // sorted does not cause O(n^2) running time.
	    var pivotIndex = randomIntInRange(p, r);
	    var i = p - 1;
	
	    swap(ary, pivotIndex, r);
	    var pivot = ary[r];
	
	    // Immediately after `j` is incremented in this loop, the following hold
	    // true:
	    //
	    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
	    //
	    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
	    for (var j = p; j < r; j++) {
	      if (comparator(ary[j], pivot) <= 0) {
	        i += 1;
	        swap(ary, i, j);
	      }
	    }
	
	    swap(ary, i + 1, j);
	    var q = i + 1;
	
	    // (2) Recurse on each half.
	
	    doQuickSort(ary, comparator, p, q - 1);
	    doQuickSort(ary, comparator, q + 1, r);
	  }
	}
	
	/**
	 * Sort the given array in-place with the given comparator function.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 */
	exports.quickSort = function (ary, comparator) {
	  doQuickSort(ary, comparator, 0, ary.length - 1);
	};


/***/ },
/* 14 */
/*!*****************************************!*\
  !*** ./~/source-map/lib/source-node.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	var SourceMapGenerator = __webpack_require__(/*! ./source-map-generator */ 5).SourceMapGenerator;
	var util = __webpack_require__(/*! ./util */ 8);
	
	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;
	
	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;
	
	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";
	
	/**
	 * SourceNodes provide a way to abstract over interpolating/concatenating
	 * snippets of generated JavaScript source code while maintaining the line and
	 * column information associated with the original source code.
	 *
	 * @param aLine The original line number.
	 * @param aColumn The original column number.
	 * @param aSource The original source's filename.
	 * @param aChunks Optional. An array of strings which are snippets of
	 *        generated JS, or other SourceNodes.
	 * @param aName The original identifier.
	 */
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	  this.children = [];
	  this.sourceContents = {};
	  this.line = aLine == null ? null : aLine;
	  this.column = aColumn == null ? null : aColumn;
	  this.source = aSource == null ? null : aSource;
	  this.name = aName == null ? null : aName;
	  this[isSourceNode] = true;
	  if (aChunks != null) this.add(aChunks);
	}
	
	/**
	 * Creates a SourceNode from generated code and a SourceMapConsumer.
	 *
	 * @param aGeneratedCode The generated code
	 * @param aSourceMapConsumer The SourceMap for the generated code
	 * @param aRelativePath Optional. The path that relative sources in the
	 *        SourceMapConsumer should be relative to.
	 */
	SourceNode.fromStringWithSourceMap =
	  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
	    // The SourceNode we want to fill with the generated code
	    // and the SourceMap
	    var node = new SourceNode();
	
	    // All even indices of this array are one line of the generated code,
	    // while all odd indices are the newlines between two adjacent lines
	    // (since `REGEX_NEWLINE` captures its match).
	    // Processed fragments are removed from this array, by calling `shiftNextLine`.
	    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	    var shiftNextLine = function() {
	      var lineContents = remainingLines.shift();
	      // The last line of a file might not have a newline.
	      var newLine = remainingLines.shift() || "";
	      return lineContents + newLine;
	    };
	
	    // We need to remember the position of "remainingLines"
	    var lastGeneratedLine = 1, lastGeneratedColumn = 0;
	
	    // The generate SourceNodes we need a code range.
	    // To extract it current and last mapping is used.
	    // Here we store the last mapping.
	    var lastMapping = null;
	
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      if (lastMapping !== null) {
	        // We add the code from "lastMapping" to "mapping":
	        // First check if there is a new line in between.
	        if (lastGeneratedLine < mapping.generatedLine) {
	          // Associate first line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	          lastGeneratedLine++;
	          lastGeneratedColumn = 0;
	          // The remaining code is added without mapping
	        } else {
	          // There is no new line in between.
	          // Associate the code between "lastGeneratedColumn" and
	          // "mapping.generatedColumn" with "lastMapping"
	          var nextLine = remainingLines[0];
	          var code = nextLine.substr(0, mapping.generatedColumn -
	                                        lastGeneratedColumn);
	          remainingLines[0] = nextLine.substr(mapping.generatedColumn -
	                                              lastGeneratedColumn);
	          lastGeneratedColumn = mapping.generatedColumn;
	          addMappingWithCode(lastMapping, code);
	          // No more remaining code, continue
	          lastMapping = mapping;
	          return;
	        }
	      }
	      // We add the generated code until the first mapping
	      // to the SourceNode without any mapping.
	      // Each line is added as separate string.
	      while (lastGeneratedLine < mapping.generatedLine) {
	        node.add(shiftNextLine());
	        lastGeneratedLine++;
	      }
	      if (lastGeneratedColumn < mapping.generatedColumn) {
	        var nextLine = remainingLines[0];
	        node.add(nextLine.substr(0, mapping.generatedColumn));
	        remainingLines[0] = nextLine.substr(mapping.generatedColumn);
	        lastGeneratedColumn = mapping.generatedColumn;
	      }
	      lastMapping = mapping;
	    }, this);
	    // We have processed all mappings.
	    if (remainingLines.length > 0) {
	      if (lastMapping) {
	        // Associate the remaining code in the current line with "lastMapping"
	        addMappingWithCode(lastMapping, shiftNextLine());
	      }
	      // and add the remaining lines without any mapping
	      node.add(remainingLines.join(""));
	    }
	
	    // Copy sourcesContent into SourceNode
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aRelativePath != null) {
	          sourceFile = util.join(aRelativePath, sourceFile);
	        }
	        node.setSourceContent(sourceFile, content);
	      }
	    });
	
	    return node;
	
	    function addMappingWithCode(mapping, code) {
	      if (mapping === null || mapping.source === undefined) {
	        node.add(code);
	      } else {
	        var source = aRelativePath
	          ? util.join(aRelativePath, mapping.source)
	          : mapping.source;
	        node.add(new SourceNode(mapping.originalLine,
	                                mapping.originalColumn,
	                                source,
	                                code,
	                                mapping.name));
	      }
	    }
	  };
	
	/**
	 * Add a chunk of generated JS to this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
	  if (Array.isArray(aChunk)) {
	    aChunk.forEach(function (chunk) {
	      this.add(chunk);
	    }, this);
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    if (aChunk) {
	      this.children.push(aChunk);
	    }
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};
	
	/**
	 * Add a chunk of generated JS to the beginning of this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	  if (Array.isArray(aChunk)) {
	    for (var i = aChunk.length-1; i >= 0; i--) {
	      this.prepend(aChunk[i]);
	    }
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    this.children.unshift(aChunk);
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};
	
	/**
	 * Walk over the tree of JS snippets in this node and its children. The
	 * walking function is called once for each snippet of JS and is passed that
	 * snippet and the its original associated source's line/column location.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	  var chunk;
	  for (var i = 0, len = this.children.length; i < len; i++) {
	    chunk = this.children[i];
	    if (chunk[isSourceNode]) {
	      chunk.walk(aFn);
	    }
	    else {
	      if (chunk !== '') {
	        aFn(chunk, { source: this.source,
	                     line: this.line,
	                     column: this.column,
	                     name: this.name });
	      }
	    }
	  }
	};
	
	/**
	 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	 * each of `this.children`.
	 *
	 * @param aSep The separator.
	 */
	SourceNode.prototype.join = function SourceNode_join(aSep) {
	  var newChildren;
	  var i;
	  var len = this.children.length;
	  if (len > 0) {
	    newChildren = [];
	    for (i = 0; i < len-1; i++) {
	      newChildren.push(this.children[i]);
	      newChildren.push(aSep);
	    }
	    newChildren.push(this.children[i]);
	    this.children = newChildren;
	  }
	  return this;
	};
	
	/**
	 * Call String.prototype.replace on the very right-most source snippet. Useful
	 * for trimming whitespace from the end of a source node, etc.
	 *
	 * @param aPattern The pattern to replace.
	 * @param aReplacement The thing to replace the pattern with.
	 */
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	  var lastChild = this.children[this.children.length - 1];
	  if (lastChild[isSourceNode]) {
	    lastChild.replaceRight(aPattern, aReplacement);
	  }
	  else if (typeof lastChild === 'string') {
	    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	  }
	  else {
	    this.children.push(''.replace(aPattern, aReplacement));
	  }
	  return this;
	};
	
	/**
	 * Set the source content for a source file. This will be added to the SourceMapGenerator
	 * in the sourcesContent field.
	 *
	 * @param aSourceFile The filename of the source file
	 * @param aSourceContent The content of the source file
	 */
	SourceNode.prototype.setSourceContent =
	  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	  };
	
	/**
	 * Walk over the tree of SourceNodes. The walking function is called for each
	 * source file content and is passed the filename and source content.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walkSourceContents =
	  function SourceNode_walkSourceContents(aFn) {
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      if (this.children[i][isSourceNode]) {
	        this.children[i].walkSourceContents(aFn);
	      }
	    }
	
	    var sources = Object.keys(this.sourceContents);
	    for (var i = 0, len = sources.length; i < len; i++) {
	      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	    }
	  };
	
	/**
	 * Return the string representation of this source node. Walks over the tree
	 * and concatenates all the various snippets together to one string.
	 */
	SourceNode.prototype.toString = function SourceNode_toString() {
	  var str = "";
	  this.walk(function (chunk) {
	    str += chunk;
	  });
	  return str;
	};
	
	/**
	 * Returns the string representation of this source node along with a source
	 * map.
	 */
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	  var generated = {
	    code: "",
	    line: 1,
	    column: 0
	  };
	  var map = new SourceMapGenerator(aArgs);
	  var sourceMappingActive = false;
	  var lastOriginalSource = null;
	  var lastOriginalLine = null;
	  var lastOriginalColumn = null;
	  var lastOriginalName = null;
	  this.walk(function (chunk, original) {
	    generated.code += chunk;
	    if (original.source !== null
	        && original.line !== null
	        && original.column !== null) {
	      if(lastOriginalSource !== original.source
	         || lastOriginalLine !== original.line
	         || lastOriginalColumn !== original.column
	         || lastOriginalName !== original.name) {
	        map.addMapping({
	          source: original.source,
	          original: {
	            line: original.line,
	            column: original.column
	          },
	          generated: {
	            line: generated.line,
	            column: generated.column
	          },
	          name: original.name
	        });
	      }
	      lastOriginalSource = original.source;
	      lastOriginalLine = original.line;
	      lastOriginalColumn = original.column;
	      lastOriginalName = original.name;
	      sourceMappingActive = true;
	    } else if (sourceMappingActive) {
	      map.addMapping({
	        generated: {
	          line: generated.line,
	          column: generated.column
	        }
	      });
	      lastOriginalSource = null;
	      sourceMappingActive = false;
	    }
	    for (var idx = 0, length = chunk.length; idx < length; idx++) {
	      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	        generated.line++;
	        generated.column = 0;
	        // Mappings end at eol
	        if (idx + 1 === length) {
	          lastOriginalSource = null;
	          sourceMappingActive = false;
	        } else if (sourceMappingActive) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	      } else {
	        generated.column++;
	      }
	    }
	  });
	  this.walkSourceContents(function (sourceFile, sourceContent) {
	    map.setSourceContent(sourceFile, sourceContent);
	  });
	
	  return { code: generated.code, map: map };
	};
	
	exports.SourceNode = SourceNode;


/***/ },
/* 15 */
/*!**********************!*\
  !*** external "map" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("map");

/***/ },
/* 16 */
/*!******************************************!*\
  !*** ./src/components/classes/Claims.ts ***!
  \******************************************/
/***/ function(module, exports) {

	"use strict";
	class Claims {
	    constructor() {
	        if (Memory['claims'] == undefined) {
	            Memory['claims'] = {};
	        }
	    }
	    _getClaimMemory(id) {
	        if (Memory['claims'][id] == undefined) {
	            Memory['claims'][id] = { amount: 0, list: {} };
	        }
	        return Memory['claims'][id];
	    }
	    set(claimer, claimTarget, amount = 1, ticks = 100) {
	        let claim = this._getClaimMemory(claimTarget.id);
	        if (claimTarget.store) {
	            if (claimTarget.store.energy - claim.amount > amount) {
	                claim.amount += amount;
	                claim.list[claimer.id] = [Game.time + ticks, amount];
	                return true;
	            }
	        }
	        else if (claimTarget.amount) {
	            if (claimTarget.amount - claim.amount > amount) {
	                claim.amount += amount;
	                claim.list[claimer.id] = [Game.time + ticks, amount];
	                return true;
	            }
	        }
	        else {
	            if (claim.amount == 0) {
	                claim.amount++;
	                claim.list[claimer.id] = [Game.time + ticks, 1];
	                return true;
	            }
	        }
	        return false;
	    }
	    remove(claimer, claimTarget) {
	        let claim = this._getClaimMemory(claimTarget.id);
	        if (claim.list[claimer.id]) {
	            let data = claim.list[claimer.id];
	            claim.amount -= data[1];
	            delete claim.list[claimer.id];
	        }
	    }
	    isClaimable(claimer, claimTarget, amount) {
	        let claim = this._getClaimMemory(claimTarget.id);
	        if (claim.list[claimer.id]) {
	            return false;
	        }
	        if (claimTarget.store) {
	            if (claimTarget.store.energy - claim.amount > amount) {
	                return true;
	            }
	        }
	        if (claimTarget.amount) {
	            if (claimTarget.amount - claim.amount > amount) {
	                return true;
	            }
	        }
	        else {
	            return claim.amount == 0;
	        }
	    }
	    clean() {
	        _(Memory['claims']).eachRight((claim, claimId) => {
	            if (Game.getObjectById(claimId) == undefined) {
	                delete Memory['claims'][claimId];
	            }
	            else {
	                _(claim.list).each((claimerId, data) => {
	                    if (Game.getObjectById(claimerId) == undefined || data[0] < Game.time) {
	                        claim.amount -= data[0];
	                        delete claim[claimerId];
	                    }
	                });
	            }
	        });
	    }
	}
	exports.claims = new Claims();
	class DummyClaimer {
	}
	exports.DummyClaimer = DummyClaimer;
	exports.dummyClaimer = new DummyClaimer();


/***/ },
/* 17 */
/*!****************************************!*\
  !*** ./src/components/classes/Room.ts ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const log_1 = __webpack_require__(/*! ../support/log */ 3);
	const Task_1 = __webpack_require__(/*! ./Task */ 18);
	const Claims_1 = __webpack_require__(/*! ./Claims */ 16);
	const RoomConfig = __webpack_require__(/*! ../../config/room */ 19);
	const CreepConfig = __webpack_require__(/*! ../../config/creep */ 20);
	Task_1.MixinTaskable(Room);
	Room.prototype.run = function () {
	    _init(this);
	    _runTasks(this);
	};
	function _init(self) {
	    if (self.memory.init == undefined) {
	        self.memory.init = true;
	        if (self.controller && self.controller.level > 0) {
	            self.memory.role = 'master';
	        }
	        else {
	            self.memory.role = 'unowned';
	        }
	        let tasks = self.getRoleTasks();
	        let time = Game.time;
	        _.forEach(tasks, taskName => {
	            time++;
	            self.taskUnshift(time, taskName);
	        });
	    }
	}
	function _runTasks(self) {
	    let doNext = true;
	    while (doNext) {
	        doNext = false;
	        let task = self.taskShift();
	        if (!task) {
	            break;
	        }
	        if (task.time <= Game.time) {
	            doNext = self.taskRun(task);
	        }
	        else {
	            self.taskPush(task);
	        }
	    }
	}
	Room.prototype.getRole = function () {
	    let roleName = this.memory.role;
	    let role = RoomConfig.roles[roleName];
	    if (!role) {
	        return 'unowned';
	    }
	    return roleName;
	};
	Room.prototype.getRoleTasks = function () {
	    let role = this.getRole();
	    return RoomConfig.roles[role]['tasks'];
	};
	Room.prototype.getSlaves = function () {
	    if (this.memory['slaves'] == undefined) {
	        this.memory['slaves'] = {};
	    }
	    return this.memory['slaves'];
	};
	Room.prototype.getSpawns = function () {
	    if (this.spawns == undefined) {
	        this.spawns = [];
	        this.find(FIND_MY_SPAWNS, {
	            filter: (s) => { this.spawns.push(s); }
	        });
	    }
	    return this.spawns;
	};
	Room.prototype.getAvailableSources = function () {
	    if (!this.memory.sources) {
	        return [];
	    }
	    let sources = _(this.memory.sources)
	        .map((sourceId) => { return Game.getObjectById(sourceId); })
	        .filter((source) => { return source != undefined && Claims_1.claims.isClaimable(Claims_1.dummyClaimer, source, 1); })
	        .value();
	    return sources;
	};
	Room.prototype.getAvailableResources = function () {
	    if (!this.memory.resources) {
	        return [];
	    }
	    let resources = _(this.memory.resources)
	        .map((sourceId) => { return Game.getObjectById(sourceId); })
	        .filter((source) => { return source != undefined && Claims_1.claims.isClaimable(Claims_1.dummyClaimer, source, 1); })
	        .value();
	    debugger;
	    return resources;
	};
	Room.prototype.tasks = {};
	let tasks = Room.prototype.tasks;
	tasks[RoomConfig.TASK_CHECK_SOURCES] = function () {
	    let sources = [];
	    this.find(FIND_SOURCES, {
	        filter: (x) => {
	            if (x.pos.findInRange(FIND_HOSTILE_STRUCTURES, 5).length > 0) {
	                return;
	            }
	            sources.push(x.id);
	            _.forEach(this.find(FIND_MY_SPAWNS), (spawn) => {
	                this.taskPush(sources.length + 1, RoomConfig.TASK_PLAN_PATH, [spawn.pos.x, spawn.pos.y, spawn.pos.roomName, x.pos.x, x.pos.y, x.pos.roomName]);
	            });
	        }
	    });
	    this.memory.sources = sources;
	    this.taskPush(100, RoomConfig.TASK_CHECK_SOURCES);
	    log_1.log.info(log_1.log.color('[' + this.name + ']', 'cyan'), 'Checking sources. Found', log_1.log.color(sources.length.toString(), 'orange'));
	};
	tasks[RoomConfig.TASK_PLAN_PATH] = function (task) {
	    let data = task.data;
	    let target = new RoomPosition(data[0], data[1], data[2]);
	    let origin = new RoomPosition(data[3], data[4], data[5]);
	    if (target.roomName == origin.roomName) {
	        let opts = { ignoreCreeps: true, plainCost: 1, swampCost: 1 };
	        let goal = { pos: target, range: 1 };
	        let path = PathFinder.search(origin, goal, opts);
	        let chunk = [];
	        _.each(path.path, (x) => {
	            if (chunk.length >= 10) {
	                this.taskPush(1 + Math.random() * 10, RoomConfig.TASK_PLAN_ROAD, chunk);
	                chunk = [];
	            }
	            chunk.push([x.x, x.y, x.roomName]);
	        });
	        if (chunk.length > 0) {
	            this.taskPush(1 + Math.random() * 10, RoomConfig.TASK_PLAN_ROAD, chunk);
	        }
	    }
	};
	tasks[RoomConfig.TASK_PLAN_ROAD] = function (task) {
	    let data = task.data;
	    if (_.keys(Game.constructionSites).length + data.length > 80) {
	        this.taskPush(10 + Math.random() * 30, RoomConfig.TASK_PLAN_ROAD, data);
	        log_1.log.warning('Hit build limit');
	        return;
	    }
	    for (var i = 0; i < data.length; i++) {
	        var pos = new RoomPosition(data[i][0], data[i][1], data[i][2]);
	        let roads = pos.lookFor(LOOK_STRUCTURES);
	        let constr = pos.lookFor(LOOK_CONSTRUCTION_SITES);
	        if (!roads.length && !constr.length) {
	            pos.createConstructionSite(STRUCTURE_ROAD);
	        }
	    }
	};
	function getRandomName(title) {
	    let name = '';
	    do {
	        name = title + ' ' + CreepConfig.names[Math.floor(Math.random() * CreepConfig.names.length - 1)];
	    } while (Game.creeps[name]);
	    return name;
	}
	tasks[RoomConfig.TASK_MANAGE_ROOM] = function (task) {
	    task.time = Game.time + 25;
	    this.taskPush(task);
	    let spawnTimer = this.memory.spawnTimer || 0;
	    let roomLevel = RoomConfig.level[this.memory.level];
	    let creeps = _.countBy(Game.creeps, 'memory.role');
	    if (spawnTimer <= Game.time) {
	        let spawns = _.filter(this.getSpawns(), { spawning: null });
	        let builder;
	        if (spawns.length > 0) {
	            for (let creepType in roomLevel.availableCreeps) {
	                switch (creepType) {
	                    case 'allrounder':
	                        if ((creeps[creepType] || 0) < roomLevel.availableCreeps[creepType]) {
	                            builder = CreepConfig.Roles[creepType];
	                        }
	                        break;
	                    case 'harvester-energy':
	                        if (this.memory.sources && (creeps[creepType] || 0) < this.memory.sources.length) {
	                            builder = CreepConfig.Roles[creepType];
	                        }
	                        break;
	                    default:
	                        log_1.log.warning('Unrecognized creep class tried to sneak into spawn.');
	                }
	                if (builder != undefined) {
	                    let fn = builder['build'];
	                    let pattern;
	                    if (fn) {
	                        pattern = fn(this.energyAvailable);
	                    }
	                    else {
	                        log_1.log.warning(creepType, 'is missing a builder function');
	                    }
	                    let mem = { role: creepType };
	                    spawns[0].createCreep(pattern, getRandomName(builder['name']), mem);
	                    break;
	                }
	            }
	        }
	    }
	    this.taskUnshift(1, '_scanResources');
	};
	tasks['_scanResources'] = function () {
	    let resources = [];
	    this.find(FIND_MY_STRUCTURES, {
	        filter: (s) => {
	            if (s.structureType == STRUCTURE_CONTAINER) {
	                resources.push(s.id);
	            }
	        }
	    });
	    this.find(FIND_DROPPED_RESOURCES, {
	        filter: (r) => {
	            resources.push(r.id);
	        }
	    });
	    this.memory.resources = resources;
	    return true;
	};
	tasks[RoomConfig.TASK_CHECK_ROOM_LEVEL] = function (task) {
	    task.time = Game.time + 200;
	    let currentLevel = this.memory.level || 0;
	    let creeps = _.countBy(Game.creeps, 'role');
	    let energy = this.energyAvailable + (this.storage ? this.storage.store.energy : 0);
	    let extensions = 0;
	    let newLevel = -1;
	    for (let v of RoomConfig.level) {
	        if (!v.require.creeps(creeps) ||
	            !(v.require.energy <= energy) ||
	            !(v.require.extensions <= extensions)) {
	            break;
	        }
	        newLevel++;
	    }
	    if (newLevel > currentLevel) {
	        log_1.log.info(log_1.log.color('[' + this.name + ']', 'cyan'), 'reached', log_1.log.color(RoomConfig.level[newLevel].name, 'brown'), 'status');
	    }
	    else if (newLevel < currentLevel) {
	        log_1.log.info(log_1.log.color('[' + this.name + ']', 'cyan'), 'lost it\'s status and is now', log_1.log.color(RoomConfig.level[newLevel].name, 'brown'));
	    }
	    this.memory.level = newLevel;
	    this.taskPush(task);
	};


/***/ },
/* 18 */
/*!****************************************!*\
  !*** ./src/components/classes/Task.ts ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const log_1 = __webpack_require__(/*! ../support/log */ 3);
	function MixinTaskable(derive) {
	    let base = Taskable;
	    Object.getOwnPropertyNames(base.prototype).forEach(name => {
	        derive.prototype[name] = base.prototype[name];
	    });
	}
	exports.MixinTaskable = MixinTaskable;
	class Taskable {
	    taskPush(arg, task, data) {
	        if (this.memory.queue == undefined) {
	            this.memory.queue = [];
	        }
	        let queue = this.memory.queue;
	        if (task != undefined) {
	            let o = {
	                name: task,
	                time: Math.floor(Game.time + arg)
	            };
	            if (data != undefined) {
	                o.data = data;
	            }
	            queue.push(o);
	        }
	        else if (typeof arg == 'object') {
	            queue.push(arg);
	        }
	    }
	    taskUnshift(arg, task, data) {
	        if (this.memory.queue == undefined) {
	            this.memory.queue = [];
	        }
	        let queue = this.memory.queue;
	        if (task != undefined) {
	            let o = {
	                name: task,
	                time: Math.floor(Game.time + arg)
	            };
	            if (data != undefined) {
	                o.data = data;
	            }
	            queue.unshift(o);
	        }
	        else if (typeof arg == 'object') {
	            queue.unshift(arg);
	        }
	    }
	    taskShift() {
	        if (this.memory.queue == undefined) {
	            return false;
	        }
	        if (this.memory.queue.length == 0) {
	            return false;
	        }
	        return this.memory.queue.shift(0);
	    }
	    taskTop() {
	        if (this.memory.queue == undefined) {
	            return false;
	        }
	        if (this.memory.queue.length == 0) {
	            return false;
	        }
	        return this.memory.queue[0];
	    }
	    taskCount() {
	        if (this.memory.queue == undefined) {
	            return 0;
	        }
	        return this.memory.queue.length;
	    }
	    taskRun(task) {
	        let taskFn = this.tasks[task.name];
	        if (taskFn == undefined) {
	            log_1.log.warning('Task:', log_1.log.color(task.name, 'orange'), 'is not defined.');
	            return true;
	        }
	        else {
	            return taskFn.bind(this)(task) === true;
	        }
	    }
	}


/***/ },
/* 19 */
/*!****************************!*\
  !*** ./src/config/room.ts ***!
  \****************************/
/***/ function(module, exports) {

	"use strict";
	exports.TASK_CHECK_SOURCES = 'checkSources';
	exports.TASK_PLAN_ROAD = 'planRoad';
	exports.TASK_PLAN_PATH = 'planPath';
	exports.TASK_SCOUT_ROOMS = 'scoutRooms';
	exports.TASK_MANAGE_SLAVE = 'manageSlave';
	exports.TASK_MANAGE_ROOM = 'manageRoom';
	exports.TASK_CHECK_ROOM_LEVEL = 'checkRoomLevel';
	exports.roles = {
	    'master': {
	        'tasks': [exports.TASK_CHECK_ROOM_LEVEL, exports.TASK_CHECK_SOURCES, exports.TASK_MANAGE_ROOM, exports.TASK_SCOUT_ROOMS]
	    },
	    'slave': {
	        'tasks': [exports.TASK_CHECK_SOURCES, exports.TASK_MANAGE_SLAVE]
	    },
	    'unowned': {
	        'tasks': []
	    }
	};
	exports.level = [
	    {
	        name: 'Rough Land',
	        maxSlaves: 0,
	        availableCreeps: {},
	        require: {
	            extensions: 0,
	            energy: 0,
	            creeps: () => { return true; },
	        },
	    },
	    {
	        name: 'Feudal',
	        maxSlaves: 0,
	        availableCreeps: {
	            'allrounder': 2,
	            'harvester-energy': true,
	        },
	        require: {
	            extensions: 0,
	            energy: 0,
	            creeps: () => { return true; },
	        },
	    },
	];


/***/ },
/* 20 */
/*!*****************************!*\
  !*** ./src/config/creep.ts ***!
  \*****************************/
/***/ function(module, exports) {

	"use strict";
	exports.Roles = {};
	exports.Roles = {
	    'allrounder': {
	        'name': 'Worker',
	        'build': (energy) => {
	            let pattern = [WORK, CARRY, MOVE, MOVE];
	            let cost = 250;
	            let body = { carry: 1, work: 1 };
	            while (cost + 100 <= energy) {
	                let delta = energy - cost;
	                switch (true) {
	                    case delta >= 150 && body.work < body.carry * 3:
	                        cost += 150;
	                        body.work++;
	                        pattern.push(CARRY, MOVE);
	                        break;
	                    case delta >= 100 && body.carry < 20:
	                        cost += 100;
	                        body.carry++;
	                        pattern.push(CARRY, MOVE);
	                        break;
	                }
	            }
	            return pattern;
	        },
	    },
	    'harvester-energy': {
	        'name': 'Farmer',
	        'build': (energy) => {
	            let pattern = [WORK, WORK, CARRY, MOVE];
	            let cost = 300;
	            let body = { work: 2, move: 1 };
	            while (cost + 100 <= energy) {
	                let delta = energy - cost;
	                switch (true) {
	                    case delta >= 100 && body.work < 5:
	                        cost += 100;
	                        body.work++;
	                        pattern.push(WORK);
	                        break;
	                    case delta >= 50 && body.move < body.work:
	                        cost += 50;
	                        body.move++;
	                        pattern.push(MOVE);
	                    default:
	                        cost = energy;
	                        break;
	                }
	            }
	            return pattern;
	        },
	    },
	    'harvester-extractor': {
	        'name': 'Miner',
	        'build': null,
	    },
	    'manager': {
	        'name': 'Distributor',
	        'build': null,
	    },
	    'carrier': {
	        'name': 'Hauler',
	        'build': null,
	    },
	    'updater': {
	        'name': 'Upgrader',
	        'build': null,
	    },
	    'builder': {
	        'name': 'Builder',
	        'build': null,
	    },
	    'scout': {
	        'name': 'Scout',
	        'build': null,
	    },
	    'attack-range': {
	        'name': 'Puncher',
	        'build': null,
	    },
	    'attack-close': {
	        'name': 'Shooter',
	        'build': null,
	    },
	    'attack-heal': {
	        'name': 'Healer',
	        'build': null,
	    }
	};
	exports.names = [
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
	];


/***/ },
/* 21 */
/*!*****************************************!*\
  !*** ./src/components/classes/Creep.ts ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const creep_1 = __webpack_require__(/*! ../../config/creep */ 20);
	const btrees_1 = __webpack_require__(/*! ../../config/btrees */ 22);
	const creep_bt_1 = __webpack_require__(/*! ../roles/creep.bt */ 23);
	Creep.prototype.run = function () {
	    if (this.spawning) {
	        return;
	    }
	    let roleName = this.getRole();
	    if (roleTrees[roleName] == undefined) {
	        throw 'Role tree not found ' + roleName;
	    }
	    let blackboard = new creep_bt_1.Blackboard(this.memory);
	    if (roleName == 'harvester-energy') {
	        debugger;
	    }
	    roleTrees[roleName].tick(this, blackboard);
	};
	Creep.prototype.getRole = function () {
	    let roleName = this.memory.role;
	    let role = creep_1.Roles[roleName];
	    if (role == undefined) {
	        throw 'Creep without role: ' + this.name;
	    }
	    return roleName;
	};
	Creep.prototype.getTarget = function () {
	    if (this.memory.target) {
	        let target = Game.getObjectById(this.memory.target);
	        if (target) {
	            return target;
	        }
	    }
	    if (this.memory.targetPos) {
	        return new RoomPosition(this.memory.targetPos.x, this.memory.targetPos.y, this.memory.targetPos.roomName);
	    }
	    return null;
	};
	let roleTrees = {
	    'allrounder': creep_bt_1.loadTree(btrees_1.creepBTree.allrounder, creep_bt_1.customNodes),
	    'harvester-energy': creep_bt_1.loadTree(btrees_1.creepBTree['harvester-energy'], creep_bt_1.customNodes),
	};
	roleTrees['allrounder'].id = 'allrounder';
	roleTrees['harvester-energy'].id = 'harvester-energy';


/***/ },
/* 22 */
/*!******************************!*\
  !*** ./src/config/btrees.ts ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";
	exports.creepBTree = {
	    'allrounder': {
	        "title": "A Behavior Tree",
	        "description": "",
	        "root": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
	        "display": {
	            "camera_x": 396,
	            "camera_y": 762,
	            "camera_z": 0.75,
	            "x": 16,
	            "y": -848
	        },
	        "properties": {},
	        "nodes": {
	            "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d": {
	                "id": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 128,
	                    "y": -848
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "ec725cce-f1bc-47ea-940e-25fe7e247a24",
	                    "d87d243c-f149-4430-a7e5-435dddac4e7f"
	                ]
	            },
	            "e211c7a6-ec74-4493-8d39-a5f37e5d8918": {
	                "id": "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
	                "name": "SearchSources",
	                "title": "SearchSources",
	                "description": "",
	                "display": {
	                    "x": 816,
	                    "y": -416
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "097ebed6-e4c7-4742-8b25-cd9960416107": {
	                "id": "097ebed6-e4c7-4742-8b25-cd9960416107",
	                "name": "HasTarget",
	                "title": "HasTarget",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -320
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "04bd105b-d19f-4548-89d7-3e35584b03b6": {
	                "id": "04bd105b-d19f-4548-89d7-3e35584b03b6",
	                "name": "FindPath",
	                "title": "FindPath",
	                "description": "",
	                "display": {
	                    "x": 1008,
	                    "y": -208
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "06f63f43-a3ed-4710-8ebb-2c8077e9ca06": {
	                "id": "06f63f43-a3ed-4710-8ebb-2c8077e9ca06",
	                "name": "Move",
	                "title": "Move",
	                "description": "",
	                "display": {
	                    "x": 1008,
	                    "y": -160
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "49d543e5-9148-4c6a-9196-52414ffb3bdd": {
	                "id": "49d543e5-9148-4c6a-9196-52414ffb3bdd",
	                "name": "Harvest",
	                "title": "Harvest",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -144
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "463eb1b3-3384-4d87-84d3-78a08e3d01ea": {
	                "id": "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
	                "name": "RepeatUntilSuccess",
	                "title": "Repeat Until Success",
	                "description": "",
	                "display": {
	                    "x": 672,
	                    "y": -208
	                },
	                "parameters": {
	                    "maxLoop": 3
	                },
	                "properties": {},
	                "child": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d"
	            },
	            "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d": {
	                "id": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 848,
	                    "y": -208
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "04bd105b-d19f-4548-89d7-3e35584b03b6",
	                    "06f63f43-a3ed-4710-8ebb-2c8077e9ca06"
	                ]
	            },
	            "4a8d1dd1-3d2f-4197-815b-3efd6d227970": {
	                "id": "4a8d1dd1-3d2f-4197-815b-3efd6d227970",
	                "name": "Carry",
	                "title": "Carry",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": 176
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "f3b91bd2-3499-47a0-8855-cfbc258f57fe": {
	                "id": "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
	                "name": "Claim",
	                "title": "Claim",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -272
	                },
	                "parameters": {
	                    "target": "target"
	                },
	                "properties": {}
	            },
	            "ff57bb17-1f99-4dc3-bd34-e747308dab40": {
	                "id": "ff57bb17-1f99-4dc3-bd34-e747308dab40",
	                "name": "Unclaim",
	                "title": "Unclaim",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -96
	                },
	                "parameters": {
	                    "target": "target"
	                },
	                "properties": {}
	            },
	            "3439fb13-8e68-42f8-8a95-6e6025853de8": {
	                "id": "3439fb13-8e68-42f8-8a95-6e6025853de8",
	                "name": "MemPriority",
	                "title": "MemPriority",
	                "description": "",
	                "display": {
	                    "x": 576,
	                    "y": -416
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
	                    "7ead04a1-9f16-4363-80d3-396c61528e9e"
	                ]
	            },
	            "7ead04a1-9f16-4363-80d3-396c61528e9e": {
	                "id": "7ead04a1-9f16-4363-80d3-396c61528e9e",
	                "name": "Wait",
	                "title": "Wait",
	                "description": "",
	                "display": {
	                    "x": 816,
	                    "y": -368
	                },
	                "parameters": {
	                    "time": 5
	                },
	                "properties": {}
	            },
	            "8bae7832-782d-4362-8dc8-a6239aa59cac": {
	                "id": "8bae7832-782d-4362-8dc8-a6239aa59cac",
	                "name": "GetCarryTarget",
	                "title": "Get Carry Target",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": 0
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5": {
	                "id": "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5",
	                "name": "GetUpgradeTarget",
	                "title": "Get Upgrade Target",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": 240
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "b087b7c1-e03c-4d84-b8b0-337dae9c8b6b": {
	                "id": "b087b7c1-e03c-4d84-b8b0-337dae9c8b6b",
	                "name": "Upgrade",
	                "title": "Upgrade",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": 416
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "f877357a-5c8c-46ac-8e25-09a8e358eec1": {
	                "id": "f877357a-5c8c-46ac-8e25-09a8e358eec1",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 480,
	                    "y": 0
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "8bae7832-782d-4362-8dc8-a6239aa59cac",
	                    "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f",
	                    "85d7db7e-9111-4d3f-857d-1f077c9bc6d9",
	                    "4a8d1dd1-3d2f-4197-815b-3efd6d227970"
	                ]
	            },
	            "85d7db7e-9111-4d3f-857d-1f077c9bc6d9": {
	                "id": "85d7db7e-9111-4d3f-857d-1f077c9bc6d9",
	                "name": "RepeatUntilSuccess",
	                "title": "Repeat Until Success",
	                "description": "",
	                "display": {
	                    "x": 672,
	                    "y": 112
	                },
	                "parameters": {
	                    "maxLoop": -1
	                },
	                "properties": {},
	                "child": "6becd852-7a86-4709-8781-e946840e9474"
	            },
	            "6becd852-7a86-4709-8781-e946840e9474": {
	                "id": "6becd852-7a86-4709-8781-e946840e9474",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 848,
	                    "y": 112
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "71c7eb7a-e3be-40bd-839b-9aecfc80dae4",
	                    "6135fb65-e9e4-4902-98d9-f26e38da68e3"
	                ]
	            },
	            "71c7eb7a-e3be-40bd-839b-9aecfc80dae4": {
	                "id": "71c7eb7a-e3be-40bd-839b-9aecfc80dae4",
	                "name": "FindPath",
	                "title": "FindPath",
	                "description": "",
	                "display": {
	                    "x": 1008,
	                    "y": 64
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "6135fb65-e9e4-4902-98d9-f26e38da68e3": {
	                "id": "6135fb65-e9e4-4902-98d9-f26e38da68e3",
	                "name": "Move",
	                "title": "Move",
	                "description": "",
	                "display": {
	                    "x": 1008,
	                    "y": 112
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f": {
	                "id": "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f",
	                "name": "HasTarget",
	                "title": "HasTarget",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": 48
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "6a372c7c-70e4-4b82-af13-65131072a289": {
	                "id": "6a372c7c-70e4-4b82-af13-65131072a289",
	                "name": "RepeatUntilSuccess",
	                "title": "Repeat Until Success",
	                "description": "",
	                "display": {
	                    "x": 672,
	                    "y": 352
	                },
	                "parameters": {
	                    "maxLoop": -1
	                },
	                "properties": {},
	                "child": "c4906621-d1d3-4738-bae1-88c7227f702f"
	            },
	            "c4906621-d1d3-4738-bae1-88c7227f702f": {
	                "id": "c4906621-d1d3-4738-bae1-88c7227f702f",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 848,
	                    "y": 352
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "16a19228-1814-4b0a-96e7-17ace05fa849",
	                    "d512c04a-f561-474b-894d-c577f04413de"
	                ]
	            },
	            "16a19228-1814-4b0a-96e7-17ace05fa849": {
	                "id": "16a19228-1814-4b0a-96e7-17ace05fa849",
	                "name": "FindPath",
	                "title": "FindPath",
	                "description": "",
	                "display": {
	                    "x": 1008,
	                    "y": 304
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "d512c04a-f561-474b-894d-c577f04413de": {
	                "id": "d512c04a-f561-474b-894d-c577f04413de",
	                "name": "Move",
	                "title": "Move",
	                "description": "",
	                "display": {
	                    "x": 1008,
	                    "y": 352
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "172f676a-10bb-4fd6-98b0-e89f36dbf6bf": {
	                "id": "172f676a-10bb-4fd6-98b0-e89f36dbf6bf",
	                "name": "HasTarget",
	                "title": "HasTarget",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": 288
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "62d33030-4dc2-45d1-8938-da3baaf0ab7f": {
	                "id": "62d33030-4dc2-45d1-8938-da3baaf0ab7f",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 480,
	                    "y": 240
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5",
	                    "172f676a-10bb-4fd6-98b0-e89f36dbf6bf",
	                    "6a372c7c-70e4-4b82-af13-65131072a289",
	                    "b087b7c1-e03c-4d84-b8b0-337dae9c8b6b"
	                ]
	            },
	            "d87d243c-f149-4430-a7e5-435dddac4e7f": {
	                "id": "d87d243c-f149-4430-a7e5-435dddac4e7f",
	                "name": "MemPriority",
	                "title": "MemPriority",
	                "description": "",
	                "display": {
	                    "x": 240,
	                    "y": 0
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "f877357a-5c8c-46ac-8e25-09a8e358eec1",
	                    "62d33030-4dc2-45d1-8938-da3baaf0ab7f"
	                ]
	            },
	            "552e8bea-37b7-4698-acc7-d78e5d8c8366": {
	                "id": "552e8bea-37b7-4698-acc7-d78e5d8c8366",
	                "name": "HasTarget",
	                "title": "HasTarget",
	                "description": "",
	                "display": {
	                    "x": 624,
	                    "y": -752
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "a49acbbd-b33f-4d33-a74d-960b2482f48d": {
	                "id": "a49acbbd-b33f-4d33-a74d-960b2482f48d",
	                "name": "FindPath",
	                "title": "FindPath",
	                "description": "",
	                "display": {
	                    "x": 992,
	                    "y": -640
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "a587df6b-1c79-4e06-8d81-63d2b8355a4e": {
	                "id": "a587df6b-1c79-4e06-8d81-63d2b8355a4e",
	                "name": "Move",
	                "title": "Move",
	                "description": "",
	                "display": {
	                    "x": 992,
	                    "y": -592
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "c299c71f-02dc-4f13-bc7f-808a00f9d1fa": {
	                "id": "c299c71f-02dc-4f13-bc7f-808a00f9d1fa",
	                "name": "RepeatUntilSuccess",
	                "title": "Repeat Until Success",
	                "description": "",
	                "display": {
	                    "x": 656,
	                    "y": -640
	                },
	                "parameters": {
	                    "maxLoop": -1
	                },
	                "properties": {},
	                "child": "8755fbaa-ec35-4a87-8724-a0b57d9ce092"
	            },
	            "8755fbaa-ec35-4a87-8724-a0b57d9ce092": {
	                "id": "8755fbaa-ec35-4a87-8724-a0b57d9ce092",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 832,
	                    "y": -640
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "a49acbbd-b33f-4d33-a74d-960b2482f48d",
	                    "a587df6b-1c79-4e06-8d81-63d2b8355a4e"
	                ]
	            },
	            "e0830063-a070-449f-8dea-bf75107c80c7": {
	                "id": "e0830063-a070-449f-8dea-bf75107c80c7",
	                "name": "Claim",
	                "title": "Claim",
	                "description": "",
	                "display": {
	                    "x": 624,
	                    "y": -704
	                },
	                "parameters": {
	                    "target": "target"
	                },
	                "properties": {}
	            },
	            "53b097e6-ac21-47ba-9cf8-a60383e09498": {
	                "id": "53b097e6-ac21-47ba-9cf8-a60383e09498",
	                "name": "Unclaim",
	                "title": "Unclaim",
	                "description": "",
	                "display": {
	                    "x": 624,
	                    "y": -528
	                },
	                "parameters": {
	                    "target": "target"
	                },
	                "properties": {}
	            },
	            "ed719d4e-15d7-4b0e-9130-b5b163e1ebd9": {
	                "id": "ed719d4e-15d7-4b0e-9130-b5b163e1ebd9",
	                "name": "MemPriority",
	                "title": "MemPriority",
	                "description": "",
	                "display": {
	                    "x": 560,
	                    "y": -848
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "11e07d8a-6af9-4acf-b885-90fdf8dbf987",
	                    "7d4d0286-42eb-42ba-8609-ee2662a0900b"
	                ]
	            },
	            "7d4d0286-42eb-42ba-8609-ee2662a0900b": {
	                "id": "7d4d0286-42eb-42ba-8609-ee2662a0900b",
	                "name": "Wait",
	                "title": "Wait",
	                "description": "",
	                "display": {
	                    "x": 800,
	                    "y": -800
	                },
	                "parameters": {
	                    "timer": 2
	                },
	                "properties": {}
	            },
	            "f6925e55-9377-443a-8bf0-0412d94a38d7": {
	                "id": "f6925e55-9377-443a-8bf0-0412d94a38d7",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 384,
	                    "y": -416
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "3439fb13-8e68-42f8-8a95-6e6025853de8",
	                    "097ebed6-e4c7-4742-8b25-cd9960416107",
	                    "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
	                    "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
	                    "49d543e5-9148-4c6a-9196-52414ffb3bdd",
	                    "ff57bb17-1f99-4dc3-bd34-e747308dab40"
	                ]
	            },
	            "3fb029a8-b3c9-4a51-bfc5-9ed83f339b90": {
	                "id": "3fb029a8-b3c9-4a51-bfc5-9ed83f339b90",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 416,
	                    "y": -848
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "ed719d4e-15d7-4b0e-9130-b5b163e1ebd9",
	                    "552e8bea-37b7-4698-acc7-d78e5d8c8366",
	                    "e0830063-a070-449f-8dea-bf75107c80c7",
	                    "c299c71f-02dc-4f13-bc7f-808a00f9d1fa",
	                    "eec469dc-9393-46d2-89da-32f02486dd6d",
	                    "53b097e6-ac21-47ba-9cf8-a60383e09498"
	                ]
	            },
	            "ec725cce-f1bc-47ea-940e-25fe7e247a24": {
	                "id": "ec725cce-f1bc-47ea-940e-25fe7e247a24",
	                "name": "MemPriority",
	                "title": "MemPriority",
	                "description": "",
	                "display": {
	                    "x": 272,
	                    "y": -848
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "3fb029a8-b3c9-4a51-bfc5-9ed83f339b90",
	                    "f6925e55-9377-443a-8bf0-0412d94a38d7"
	                ]
	            },
	            "11e07d8a-6af9-4acf-b885-90fdf8dbf987": {
	                "id": "11e07d8a-6af9-4acf-b885-90fdf8dbf987",
	                "name": "GetResources",
	                "title": "GetResources",
	                "description": "",
	                "display": {
	                    "x": 800,
	                    "y": -848
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "eec469dc-9393-46d2-89da-32f02486dd6d": {
	                "id": "eec469dc-9393-46d2-89da-32f02486dd6d",
	                "name": "TakeResources",
	                "title": "TakeResources",
	                "description": "",
	                "display": {
	                    "x": 624,
	                    "y": -576
	                },
	                "parameters": {},
	                "properties": {}
	            }
	        },
	        "custom_nodes": [
	            {
	                "name": "SearchSources",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "HasTarget",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "FindPath",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Move",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Harvest",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Carry",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Claim",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Unclaim",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "StoreNear",
	                "title": "Store",
	                "category": "action"
	            },
	            {
	                "name": "GetCarryTarget",
	                "title": "Get Carry Target",
	                "category": "action"
	            },
	            {
	                "name": "GetUpgradeTarget",
	                "title": "Get Upgrade Target",
	                "category": "action"
	            },
	            {
	                "name": "Upgrade",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "GetResources",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "TakeResources",
	                "title": "",
	                "category": "action"
	            }
	        ]
	    },
	    'harvester-energy': {
	        "title": "A Behavior Tree",
	        "description": "",
	        "root": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
	        "display": {
	            "camera_x": 579,
	            "camera_y": 652,
	            "camera_z": 1.25,
	            "x": -64,
	            "y": -48
	        },
	        "properties": {},
	        "nodes": {
	            "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d": {
	                "id": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 16,
	                    "y": -48
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "cd5d1a9c-e71e-4a05-a0e5-2a69b8298b22",
	                    "097ebed6-e4c7-4742-8b25-cd9960416107",
	                    "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
	                    "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
	                    "ba79a9eb-5b33-4da5-9db1-aded73ea3ee0"
	                ]
	            },
	            "e211c7a6-ec74-4493-8d39-a5f37e5d8918": {
	                "id": "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
	                "name": "SearchSources",
	                "title": "SearchSources",
	                "description": "",
	                "display": {
	                    "x": 464,
	                    "y": -368
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "097ebed6-e4c7-4742-8b25-cd9960416107": {
	                "id": "097ebed6-e4c7-4742-8b25-cd9960416107",
	                "name": "HasTarget",
	                "title": "HasTarget",
	                "description": "",
	                "display": {
	                    "x": 272,
	                    "y": -272
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "04bd105b-d19f-4548-89d7-3e35584b03b6": {
	                "id": "04bd105b-d19f-4548-89d7-3e35584b03b6",
	                "name": "FindPath",
	                "title": "FindPath",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -208
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "06f63f43-a3ed-4710-8ebb-2c8077e9ca06": {
	                "id": "06f63f43-a3ed-4710-8ebb-2c8077e9ca06",
	                "name": "Move",
	                "title": "Move",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -160
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "49d543e5-9148-4c6a-9196-52414ffb3bdd": {
	                "id": "49d543e5-9148-4c6a-9196-52414ffb3bdd",
	                "name": "Harvest",
	                "title": "Harvest",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -112
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "463eb1b3-3384-4d87-84d3-78a08e3d01ea": {
	                "id": "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
	                "name": "RepeatUntilSuccess",
	                "title": "Repeat Until Success",
	                "description": "",
	                "display": {
	                    "x": 304,
	                    "y": -160
	                },
	                "parameters": {
	                    "maxLoop": 3
	                },
	                "properties": {},
	                "child": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d"
	            },
	            "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d": {
	                "id": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 480,
	                    "y": -160
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "04bd105b-d19f-4548-89d7-3e35584b03b6",
	                    "06f63f43-a3ed-4710-8ebb-2c8077e9ca06"
	                ]
	            },
	            "f3b91bd2-3499-47a0-8855-cfbc258f57fe": {
	                "id": "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
	                "name": "Claim",
	                "title": "Claim",
	                "description": "",
	                "display": {
	                    "x": 272,
	                    "y": -224
	                },
	                "parameters": {
	                    "target": "target"
	                },
	                "properties": {}
	            },
	            "ba79a9eb-5b33-4da5-9db1-aded73ea3ee0": {
	                "id": "ba79a9eb-5b33-4da5-9db1-aded73ea3ee0",
	                "name": "Repeater",
	                "title": "Repeater",
	                "description": "",
	                "display": {
	                    "x": 256,
	                    "y": -64
	                },
	                "parameters": {
	                    "maxLoop": "1e999"
	                },
	                "properties": {},
	                "child": "e2844393-cf37-42f4-83ee-7b57dd4d9359"
	            },
	            "7dd677a2-8de4-44c7-9d6a-59b5b43f3247": {
	                "id": "7dd677a2-8de4-44c7-9d6a-59b5b43f3247",
	                "name": "StoreNear",
	                "title": "Store",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -64
	                },
	                "parameters": {},
	                "properties": {}
	            },
	            "e2844393-cf37-42f4-83ee-7b57dd4d9359": {
	                "id": "e2844393-cf37-42f4-83ee-7b57dd4d9359",
	                "name": "MemSequence",
	                "title": "MemSequence",
	                "description": "",
	                "display": {
	                    "x": 464,
	                    "y": -64
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "49d543e5-9148-4c6a-9196-52414ffb3bdd",
	                    "7dd677a2-8de4-44c7-9d6a-59b5b43f3247",
	                    "c82e59b6-befe-4f8e-9010-4ec9fd2f6966"
	                ]
	            },
	            "de04a0f8-e874-4b27-8451-f2f1ff070283": {
	                "id": "de04a0f8-e874-4b27-8451-f2f1ff070283",
	                "name": "Wait",
	                "title": "Wait",
	                "description": "",
	                "display": {
	                    "x": 464,
	                    "y": -320
	                },
	                "parameters": {
	                    "time": 10
	                },
	                "properties": {}
	            },
	            "cd5d1a9c-e71e-4a05-a0e5-2a69b8298b22": {
	                "id": "cd5d1a9c-e71e-4a05-a0e5-2a69b8298b22",
	                "name": "MemPriority",
	                "title": "MemPriority",
	                "description": "",
	                "display": {
	                    "x": 208,
	                    "y": -320
	                },
	                "parameters": {},
	                "properties": {},
	                "children": [
	                    "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
	                    "de04a0f8-e874-4b27-8451-f2f1ff070283"
	                ]
	            },
	            "c82e59b6-befe-4f8e-9010-4ec9fd2f6966": {
	                "id": "c82e59b6-befe-4f8e-9010-4ec9fd2f6966",
	                "name": "Wait",
	                "title": "Wait",
	                "description": "",
	                "display": {
	                    "x": 640,
	                    "y": -16
	                },
	                "parameters": {
	                    "time": 1
	                },
	                "properties": {}
	            }
	        },
	        "custom_nodes": [
	            {
	                "name": "SearchSources",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "HasTarget",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "FindPath",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Move",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Harvest",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Carry",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Claim",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "Unclaim",
	                "title": "",
	                "category": "action"
	            },
	            {
	                "name": "StoreNear",
	                "title": "Store",
	                "category": "action"
	            },
	            {
	                "name": "GetCarryTarget",
	                "title": "Get Carry Target",
	                "category": "action"
	            },
	            {
	                "name": "GetUpgradeTarget",
	                "title": "Get Upgrade Target",
	                "category": "action"
	            },
	            {
	                "name": "Upgrade",
	                "title": "",
	                "category": "action"
	            }
	        ]
	    },
	};


/***/ },
/* 23 */
/*!******************************************!*\
  !*** ./src/components/roles/creep.bt.ts ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const b3 = __webpack_require__(/*! ../../lib/behavior3ts */ 24);
	const Claims_1 = __webpack_require__(/*! ../classes/Claims */ 16);
	var customNodes;
	(function (customNodes) {
	    const Action = b3.Action;
	    const STATUS = b3.STATUS;
	    class SearchSources extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            let sources = creep.room.getAvailableSources();
	            let source;
	            if (sources.length > 0) {
	                source = creep.pos.findClosestByPath(sources);
	                creep.memory.target = source.id;
	                return STATUS.SUCCESS;
	            }
	            return STATUS.FAILURE;
	        }
	    }
	    customNodes.SearchSources = SearchSources;
	    class GetResources extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            let sources = creep.room.getAvailableResources();
	            if (sources.length > 0) {
	                let source = creep.pos.findClosestByPath(sources);
	                creep.memory.target = source.id;
	                return STATUS.SUCCESS;
	            }
	            return STATUS.FAILURE;
	        }
	    }
	    customNodes.GetResources = GetResources;
	    class HasTarget extends Action {
	        tick(tick) {
	            if (tick.target.getTarget()) {
	                return STATUS.SUCCESS;
	            }
	            return STATUS.FAILURE;
	        }
	    }
	    customNodes.HasTarget = HasTarget;
	    class FindPath extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            let target = creep.getTarget();
	            if (target == undefined) {
	                return STATUS.FAILURE;
	            }
	            let path = creep.pos.findPathTo(target);
	            if (path.length == 0) {
	                return STATUS.FAILURE;
	            }
	            creep.memory.path = Room.serializePath(path);
	            return STATUS.SUCCESS;
	        }
	    }
	    customNodes.FindPath = FindPath;
	    class Move extends Action {
	        tick(tick) {
	            if (tick.target.memory.path == undefined) {
	                return STATUS.FAILURE;
	            }
	            let target = tick.target.getTarget();
	            if (target == undefined) {
	                return STATUS.FAILURE;
	            }
	            if (tick.target.pos.getRangeTo(target) < 2) {
	                return STATUS.SUCCESS;
	            }
	            switch (tick.target.moveByPath(tick.target.memory.path)) {
	                case OK:
	                    break;
	                case ERR_TIRED:
	                    break;
	                default:
	                    return STATUS.FAILURE;
	            }
	            return STATUS.RUNNING;
	        }
	    }
	    customNodes.Move = Move;
	    class Harvest extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            if (creep.carry.energy == creep.carryCapacity) {
	                return STATUS.SUCCESS;
	            }
	            let target = creep.getTarget();
	            if (target instanceof Source) {
	                if (creep.harvest(target) != OK) {
	                    return STATUS.FAILURE;
	                }
	            }
	            else {
	                return STATUS.FAILURE;
	            }
	            return STATUS.RUNNING;
	        }
	    }
	    customNodes.Harvest = Harvest;
	    class TakeResources extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            if (creep.carry.energy == creep.carryCapacity) {
	                return STATUS.SUCCESS;
	            }
	            let target = creep.getTarget();
	            if (target.store) {
	                creep.withdraw(target, RESOURCE_ENERGY);
	            }
	            else if (target.amount) {
	                creep.pickup(target);
	            }
	            else {
	                return STATUS.FAILURE;
	            }
	            return STATUS.SUCCESS;
	        }
	    }
	    customNodes.TakeResources = TakeResources;
	    class Claim extends Action {
	        constructor(props, id) {
	            super(props, id);
	            this.claimTarget = props['target'];
	        }
	        tick(tick) {
	            let creep = tick.target;
	            let target = Game.getObjectById(creep.memory[this.claimTarget]);
	            if (target == undefined) {
	                return STATUS.ERROR;
	            }
	            return Claims_1.claims.set(creep, target, creep.carryCapacity - creep.carry.energy, target instanceof Source ? creep.ticksToLive : 100) ? STATUS.SUCCESS : STATUS.FAILURE;
	        }
	    }
	    customNodes.Claim = Claim;
	    class Unclaim extends Action {
	        constructor(props, id) {
	            super(props, id);
	            this.claimTarget = props['target'];
	        }
	        tick(tick) {
	            let creep = tick.target;
	            let target = Game.getObjectById(creep.memory[this.claimTarget]);
	            if (target == undefined) {
	                return STATUS.ERROR;
	            }
	            Claims_1.claims.remove(creep, target);
	            return STATUS.SUCCESS;
	        }
	    }
	    customNodes.Unclaim = Unclaim;
	    class Carry extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            if (creep.carry.energy == 0) {
	                return STATUS.SUCCESS;
	            }
	            let target = creep.getTarget();
	            if (target == undefined) {
	                return STATUS.FAILURE;
	            }
	            creep.transfer(target, RESOURCE_ENERGY);
	            return STATUS.SUCCESS;
	        }
	    }
	    customNodes.Carry = Carry;
	    class GetCarryTarget extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            let target = creep.pos.findClosestByRange(FIND_MY_SPAWNS, { filter: (s) => { return s.energy < s.energyCapacity; } });
	            if (target) {
	                creep.memory.target = target.id;
	                return STATUS.SUCCESS;
	            }
	            target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (s) => { return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity; } });
	            if (target) {
	                creep.memory.target = target.id;
	                return STATUS.SUCCESS;
	            }
	            return STATUS.FAILURE;
	        }
	    }
	    customNodes.GetCarryTarget = GetCarryTarget;
	    class Upgrade extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            if (creep.carry.energy == 0) {
	                return STATUS.SUCCESS;
	            }
	            let target = creep.getTarget();
	            creep.upgradeController(target);
	            return STATUS.RUNNING;
	        }
	    }
	    customNodes.Upgrade = Upgrade;
	    class GetUpgradeTarget extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            creep.memory.target = creep.room.controller.id;
	            return STATUS.SUCCESS;
	        }
	    }
	    customNodes.GetUpgradeTarget = GetUpgradeTarget;
	    class StoreNear extends Action {
	        tick(tick) {
	            let creep = tick.target;
	            let opts = { filter: (s) => { return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity; } };
	            let container = creep.pos.findInRange(FIND_STRUCTURES, 1, opts);
	            if (container.length > 0) {
	                creep.transfer(container[0], RESOURCE_ENERGY);
	            }
	            else {
	                creep.drop(RESOURCE_ENERGY);
	            }
	            return b3.STATUS.SUCCESS;
	        }
	    }
	    customNodes.StoreNear = StoreNear;
	})(customNodes = exports.customNodes || (exports.customNodes = {}));
	class Blackboard {
	    constructor(mem) {
	        if (mem['blackboard'] == undefined) {
	            mem['blackboard'] = {};
	        }
	        this._memory = mem['blackboard'];
	        if (this._memory.tree == undefined) {
	            this._memory.tree = {};
	        }
	        if (this._memory.base == undefined) {
	            this._memory.base = {};
	        }
	    }
	    _getTreeMemory(treeScope) {
	        if (this._memory.tree[treeScope] == undefined) {
	            this._memory.tree[treeScope] = {};
	        }
	        return this._memory.tree[treeScope];
	    }
	    _getNodeMemory(mem, nodeScope) {
	        if (mem[nodeScope] == undefined) {
	            mem[nodeScope] = {};
	        }
	        return mem[nodeScope];
	    }
	    _getMemory(treeScope, nodeScope) {
	        if (treeScope) {
	            var memory = this._getTreeMemory(treeScope);
	            if (nodeScope) {
	                return this._getNodeMemory(memory, nodeScope);
	            }
	            return memory;
	        }
	        return this._memory.base;
	    }
	    set(key, value, treeScope, nodeScope) {
	        this._getMemory(treeScope ? treeScope.toString() : undefined, nodeScope ? nodeScope.toString() : undefined)[key] = value;
	    }
	    get(key, treeScope, nodeScope) {
	        return this._getMemory(treeScope ? treeScope.toString() : undefined, nodeScope ? nodeScope.toString() : undefined)[key];
	    }
	}
	exports.Blackboard = Blackboard;
	function loadTree(data, names = {}) {
	    let tree = new b3.BehaviorTree();
	    let nodes = {};
	    let id, spec, node;
	    for (id in data.nodes) {
	        spec = data.nodes[id];
	        let Cls;
	        if (spec.name in names) {
	            Cls = names[spec.name];
	        }
	        else if (spec.name in b3) {
	            Cls = b3[spec.name];
	        }
	        else {
	            throw new EvalError('BehaviorTree.load: Invalid node name "' + spec.name + '".');
	        }
	        node = new Cls(spec.parameters, spec.id);
	        nodes[id] = node;
	    }
	    for (id in data.nodes) {
	        spec = data.nodes[id];
	        node = nodes[id];
	        switch (node.category) {
	            case b3.CATEGORY.COMPOSITE:
	                for (let i = 0; i < spec.children.length; i++) {
	                    let cid = spec.children[i];
	                    node.children.push(cid);
	                }
	                break;
	            case b3.CATEGORY.DECORATOR:
	                let cid = spec.child;
	                node.child = cid;
	                break;
	            default:
	                break;
	        }
	    }
	    tree.root = data.root;
	    tree.nodes = nodes;
	    return tree;
	}
	exports.loadTree = loadTree;


/***/ },
/* 24 */
/*!**************************************!*\
  !*** ./src/lib/behavior3ts/index.ts ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(/*! ./helper */ 25));
	__export(__webpack_require__(/*! ./core/BaseNode */ 26));
	__export(__webpack_require__(/*! ./core/BehaviorTree */ 27));
	__export(__webpack_require__(/*! ./core/Tick */ 28));
	__export(__webpack_require__(/*! ./core/Types */ 29));
	__export(__webpack_require__(/*! ./actions/Wait */ 30));
	__export(__webpack_require__(/*! ./composites/MemPriority */ 31));
	__export(__webpack_require__(/*! ./composites/MemSequence */ 32));
	__export(__webpack_require__(/*! ./decorators/Inverter */ 33));
	__export(__webpack_require__(/*! ./decorators/Limiter */ 34));
	__export(__webpack_require__(/*! ./decorators/RepeatUntilSuccess */ 35));
	__export(__webpack_require__(/*! ./decorators/RepeatUntilFailure */ 36));
	__export(__webpack_require__(/*! ./decorators/Repeater */ 37));


/***/ },
/* 25 */
/*!***************************************!*\
  !*** ./src/lib/behavior3ts/helper.ts ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	function createUUID() {
	    let s = [];
	    let hexDigits = '0123456789abcdef';
	    for (let i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = '4';
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	    s[8] = s[13] = s[18] = s[23] = '-';
	    let uuid = s.join('');
	    return uuid;
	}
	exports.createUUID = createUUID;
	exports.VERSION = '0.1.0';
	var STATUS;
	(function (STATUS) {
	    STATUS[STATUS["SUCCESS"] = 0] = "SUCCESS";
	    STATUS[STATUS["FAILURE"] = 1] = "FAILURE";
	    STATUS[STATUS["RUNNING"] = 2] = "RUNNING";
	    STATUS[STATUS["ERROR"] = 3] = "ERROR";
	})(STATUS = exports.STATUS || (exports.STATUS = {}));
	var CATEGORY;
	(function (CATEGORY) {
	    CATEGORY[CATEGORY["COMPOSITE"] = 0] = "COMPOSITE";
	    CATEGORY[CATEGORY["DECORATOR"] = 1] = "DECORATOR";
	    CATEGORY[CATEGORY["ACTION"] = 2] = "ACTION";
	    CATEGORY[CATEGORY["CONDITION"] = 3] = "CONDITION";
	})(CATEGORY = exports.CATEGORY || (exports.CATEGORY = {}));


/***/ },
/* 26 */
/*!**********************************************!*\
  !*** ./src/lib/behavior3ts/core/BaseNode.ts ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class BaseNode {
	    constructor(props, id) {
	        this.id = id || helper_1.createUUID();
	        this.properties = props;
	    }
	    execute(tick) {
	        this._enter(tick);
	        let open = tick.blackboard.get('openNodes', tick.tree.id);
	        if (!(open && open[this.id] != undefined)) {
	            this._open(tick);
	        }
	        let status = this._tick(tick);
	        if (status !== helper_1.STATUS.RUNNING) {
	            this._close(tick);
	            if (open) {
	                delete open[this.id];
	            }
	        }
	        this._exit(tick);
	        return status;
	    }
	    _enter(tick) {
	        tick.enterNode(this);
	        if (this.enter) {
	            this.enter(tick);
	        }
	    }
	    _open(tick) {
	        if (this.open) {
	            this.open(tick);
	        }
	    }
	    _tick(tick) {
	        if (this.tick) {
	            return this.tick(tick);
	        }
	        return helper_1.STATUS.ERROR;
	    }
	    _close(tick) {
	        tick.closeNode();
	        if (this.close) {
	            this.close(tick);
	        }
	    }
	    _exit(tick) {
	        if (this.exit) {
	            this.exit(tick);
	        }
	    }
	}
	exports.BaseNode = BaseNode;


/***/ },
/* 27 */
/*!**************************************************!*\
  !*** ./src/lib/behavior3ts/core/BehaviorTree.ts ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Tick_1 = __webpack_require__(/*! ./Tick */ 28);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class BehaviorTree {
	    constructor() {
	        this.id = helper_1.createUUID();
	        this.title = 'A behavior tree';
	        this.description = 'default';
	        this.properties = {};
	        this.root = '';
	        this.nodes = {};
	    }
	    tick(target, blackboard) {
	        let tick = new Tick_1.Tick();
	        tick.target = target;
	        tick.blackboard = blackboard;
	        tick.tree = this;
	        let status = this.nodes[this.root].execute(tick);
	        let lastOpenNodes = _.map(blackboard.get('openNodes', this.id) || [], (_v, nodeId) => { return this.nodes[nodeId]; });
	        let currOpenNodes = tick.openNodes.slice(0);
	        let start = 0;
	        const count = Math.min(lastOpenNodes.length, currOpenNodes.length);
	        let i;
	        for (i = 0; i < count; i++) {
	            start = i + 1;
	            if (lastOpenNodes[i] !== currOpenNodes[i]) {
	                break;
	            }
	        }
	        for (i = lastOpenNodes.length - 1; i >= start; i--) {
	            lastOpenNodes[i]._close(tick);
	        }
	        let _openNodes = {};
	        _.each(currOpenNodes, (node) => { _openNodes[node.id] = true; });
	        blackboard.set('openNodes', _openNodes, this.id);
	        blackboard.set('nodeCount', tick.nodeCount, this.id);
	        return status;
	    }
	}
	exports.BehaviorTree = BehaviorTree;


/***/ },
/* 28 */
/*!******************************************!*\
  !*** ./src/lib/behavior3ts/core/Tick.ts ***!
  \******************************************/
/***/ function(module, exports) {

	"use strict";
	class Tick {
	    constructor() {
	        this._nodeCount = 0;
	        this._openNodes = [];
	    }
	    enterNode(node) {
	        this._nodeCount++;
	        this._openNodes.push(node);
	    }
	    closeNode() {
	        this._openNodes.pop();
	    }
	    get openNodes() {
	        return this._openNodes;
	    }
	    get nodeCount() {
	        return this._nodeCount;
	    }
	}
	exports.Tick = Tick;


/***/ },
/* 29 */
/*!*******************************************!*\
  !*** ./src/lib/behavior3ts/core/Types.ts ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const BaseNode_1 = __webpack_require__(/*! ./BaseNode */ 26);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class Decorator extends BaseNode_1.BaseNode {
	    constructor() {
	        super(...arguments);
	        this.category = helper_1.CATEGORY.DECORATOR;
	        this.child = '';
	    }
	}
	exports.Decorator = Decorator;
	class Condition extends BaseNode_1.BaseNode {
	    constructor() {
	        super(...arguments);
	        this.category = helper_1.CATEGORY.CONDITION;
	        this.child = '';
	    }
	}
	exports.Condition = Condition;
	class Composite extends BaseNode_1.BaseNode {
	    constructor() {
	        super(...arguments);
	        this.category = helper_1.CATEGORY.COMPOSITE;
	        this.children = [];
	    }
	}
	exports.Composite = Composite;
	class Action extends BaseNode_1.BaseNode {
	    constructor() {
	        super(...arguments);
	        this.category = helper_1.CATEGORY.ACTION;
	    }
	}
	exports.Action = Action;


/***/ },
/* 30 */
/*!*********************************************!*\
  !*** ./src/lib/behavior3ts/actions/Wait.ts ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class Wait extends Types_1.Action {
	    constructor(props, id) {
	        super(props, id);
	        this.endTime = props.time || 0;
	    }
	    open(tick) {
	        let startTime = Game.time;
	        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
	    }
	    tick(tick) {
	        let currTime = Game.time;
	        let startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
	        if (currTime - startTime > this.endTime) {
	            return helper_1.STATUS.SUCCESS;
	        }
	        return helper_1.STATUS.RUNNING;
	    }
	}
	exports.Wait = Wait;


/***/ },
/* 31 */
/*!*******************************************************!*\
  !*** ./src/lib/behavior3ts/composites/MemPriority.ts ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class MemPriority extends Types_1.Composite {
	    open(tick) {
	        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
	    }
	    tick(tick) {
	        let child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
	        for (let i = child; i < this.children.length; i++) {
	            var status = tick.tree.nodes[this.children[i]].execute(tick);
	            if (status !== helper_1.STATUS.FAILURE) {
	                if (status === helper_1.STATUS.RUNNING) {
	                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
	                }
	                return status;
	            }
	        }
	        return helper_1.STATUS.FAILURE;
	    }
	}
	exports.MemPriority = MemPriority;


/***/ },
/* 32 */
/*!*******************************************************!*\
  !*** ./src/lib/behavior3ts/composites/MemSequence.ts ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class MemSequence extends Types_1.Composite {
	    open(tick) {
	        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
	    }
	    tick(tick) {
	        let child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
	        for (let i = child; i < this.children.length; i++) {
	            var status = tick.tree.nodes[this.children[i]].execute(tick);
	            if (status !== helper_1.STATUS.SUCCESS) {
	                if (status === helper_1.STATUS.RUNNING) {
	                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
	                }
	                return status;
	            }
	        }
	        return helper_1.STATUS.SUCCESS;
	    }
	}
	exports.MemSequence = MemSequence;


/***/ },
/* 33 */
/*!****************************************************!*\
  !*** ./src/lib/behavior3ts/decorators/Inverter.ts ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class Inverter extends Types_1.Decorator {
	    tick(tick) {
	        if (this.child === '') {
	            return helper_1.STATUS.ERROR;
	        }
	        let status = tick.tree.nodes[this.child].execute(tick);
	        if (status == helper_1.STATUS.SUCCESS) {
	            status = helper_1.STATUS.FAILURE;
	        }
	        else if (status == helper_1.STATUS.FAILURE) {
	            status = helper_1.STATUS.SUCCESS;
	        }
	        return status;
	    }
	}
	exports.Inverter = Inverter;


/***/ },
/* 34 */
/*!***************************************************!*\
  !*** ./src/lib/behavior3ts/decorators/Limiter.ts ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class Limiter extends Types_1.Decorator {
	    constructor(props, id) {
	        super(props, id);
	        this.maxLoop = props['maxLoop'];
	    }
	    open(tick) {
	        tick.blackboard.set('i', 0, tick.tree.id, this.id);
	    }
	    tick(tick) {
	        if (this.child == '') {
	            return helper_1.STATUS.ERROR;
	        }
	        let i = tick.blackboard.get('i', tick.tree.id, this.id);
	        if (i < this.maxLoop) {
	            let status = tick.tree.nodes[this.child].execute(tick);
	            if (status == helper_1.STATUS.SUCCESS || status == helper_1.STATUS.FAILURE) {
	                tick.blackboard.set('i', i + 1, tick.tree.id, this.id);
	            }
	            return status;
	        }
	        return helper_1.STATUS.FAILURE;
	    }
	}
	exports.Limiter = Limiter;


/***/ },
/* 35 */
/*!**************************************************************!*\
  !*** ./src/lib/behavior3ts/decorators/RepeatUntilSuccess.ts ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class RepeatUntilSuccess extends Types_1.Decorator {
	    constructor(props, id) {
	        super(props, id);
	        this.maxLoop = props['maxLoop'];
	    }
	    open(tick) {
	        tick.blackboard.set('i', 0, tick.tree.id, this.id);
	    }
	    tick(tick) {
	        if (this.child == '') {
	            return helper_1.STATUS.ERROR;
	        }
	        let i = tick.blackboard.get('i', tick.tree.id, this.id);
	        let status = helper_1.STATUS.ERROR;
	        while (this.maxLoop < 0 || i < this.maxLoop) {
	            status = tick.tree.nodes[this.child].execute(tick);
	            if (status == helper_1.STATUS.FAILURE) {
	                i++;
	            }
	            else {
	                break;
	            }
	        }
	        i = tick.blackboard.set('i', i, tick.tree.id, this.id);
	        return status;
	    }
	}
	exports.RepeatUntilSuccess = RepeatUntilSuccess;


/***/ },
/* 36 */
/*!**************************************************************!*\
  !*** ./src/lib/behavior3ts/decorators/RepeatUntilFailure.ts ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class RepeatUntilFailure extends Types_1.Decorator {
	    constructor(props, id) {
	        super(props, id);
	        this.maxLoop = props['maxLoop'];
	    }
	    open(tick) {
	        tick.blackboard.set('i', 0, tick.tree.id, this.id);
	    }
	    tick(tick) {
	        if (this.child == '') {
	            return helper_1.STATUS.ERROR;
	        }
	        let i = tick.blackboard.get('i', tick.tree.id, this.id);
	        let status = helper_1.STATUS.ERROR;
	        while (this.maxLoop < 0 || i < this.maxLoop) {
	            status = tick.tree.nodes[this.child].execute(tick);
	            if (status == helper_1.STATUS.SUCCESS) {
	                i++;
	            }
	            else {
	                break;
	            }
	        }
	        i = tick.blackboard.set('i', i, tick.tree.id, this.id);
	        return status;
	    }
	}
	exports.RepeatUntilFailure = RepeatUntilFailure;


/***/ },
/* 37 */
/*!****************************************************!*\
  !*** ./src/lib/behavior3ts/decorators/Repeater.ts ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Types_1 = __webpack_require__(/*! ../core/Types */ 29);
	const helper_1 = __webpack_require__(/*! ../helper */ 25);
	class Repeater extends Types_1.Decorator {
	    constructor(props, id) {
	        super(props, id);
	        this.maxLoop = props['maxLoop'];
	    }
	    open(tick) {
	        tick.blackboard.set('i', 0, tick.tree.id, this.id);
	    }
	    tick(tick) {
	        if (this.child == '') {
	            return helper_1.STATUS.ERROR;
	        }
	        let i = tick.blackboard.get('i', tick.tree.id, this.id);
	        let status = helper_1.STATUS.ERROR;
	        while (this.maxLoop < 0 || i < this.maxLoop) {
	            status = tick.tree.nodes[this.child].execute(tick);
	            if (status == helper_1.STATUS.SUCCESS || status == helper_1.STATUS.FAILURE) {
	                i++;
	            }
	            else {
	                break;
	            }
	        }
	        i = tick.blackboard.set('i', i, tick.tree.id, this.id);
	        return status;
	    }
	}
	exports.Repeater = Repeater;


/***/ }
/******/ ]);
//# sourceMappingURL=map.json