module.exports = function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.l = !0, module.exports;
  }
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
  __webpack_require__.d = function(exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    });
  }, __webpack_require__.r = function(exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, __webpack_require__.t = function(value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
      return value[key];
    }.bind(null, key));
    return ns;
  }, __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 136);
}([ function(module, exports) {
  module.exports = require("path");
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports) {
  module.exports = require("util");
}, , , , function(module, exports) {
  module.exports = require("child_process");
}, , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(0), which = __webpack_require__(139), commandCache = new (__webpack_require__(30))({
    max: 50,
    maxAge: 3e4
  });
  module.exports = function(command, noExtension) {
    var resolved;
    if (noExtension = !!noExtension, resolved = commandCache.get(command + "!" + noExtension), 
    commandCache.has(command)) return commandCache.get(command);
    try {
      resolved = noExtension ? which.sync(command, {
        pathExt: path.delimiter + (process.env.PATHEXT || "")
      }) : which.sync(command);
    } catch (e) {}
    return commandCache.set(command + "!" + noExtension, resolved), resolved;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = LRUCache;
  var makeSymbol, Map = __webpack_require__(143), util = __webpack_require__(2), Yallist = __webpack_require__(145), MAX = (makeSymbol = "function" == typeof Symbol && "1" !== process.env._nodeLRUCacheForceNoSymbol ? function(key) {
    return Symbol(key);
  } : function(key) {
    return "_" + key;
  })("max"), LENGTH = makeSymbol("length"), LENGTH_CALCULATOR = makeSymbol("lengthCalculator"), ALLOW_STALE = makeSymbol("allowStale"), MAX_AGE = makeSymbol("maxAge"), DISPOSE = makeSymbol("dispose"), NO_DISPOSE_ON_SET = makeSymbol("noDisposeOnSet"), LRU_LIST = makeSymbol("lruList"), CACHE = makeSymbol("cache");
  function naiveLength() {
    return 1;
  }
  function LRUCache(options) {
    if (!(this instanceof LRUCache)) return new LRUCache(options);
    "number" == typeof options && (options = {
      max: options
    }), options || (options = {});
    var max = this[MAX] = options.max;
    (!max || "number" != typeof max || max <= 0) && (this[MAX] = 1 / 0);
    var lc = options.length || naiveLength;
    "function" != typeof lc && (lc = naiveLength), this[LENGTH_CALCULATOR] = lc, this[ALLOW_STALE] = options.stale || !1, 
    this[MAX_AGE] = options.maxAge || 0, this[DISPOSE] = options.dispose, this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || !1, 
    this.reset();
  }
  function forEachStep(self, fn, node, thisp) {
    var hit = node.value;
    isStale(self, hit) && (del(self, node), self[ALLOW_STALE] || (hit = void 0)), hit && fn.call(thisp, hit.value, hit.key, self);
  }
  function get(self, key, doUse) {
    var node = self[CACHE].get(key);
    if (node) {
      var hit = node.value;
      isStale(self, hit) ? (del(self, node), self[ALLOW_STALE] || (hit = void 0)) : doUse && self[LRU_LIST].unshiftNode(node), 
      hit && (hit = hit.value);
    }
    return hit;
  }
  function isStale(self, hit) {
    if (!hit || !hit.maxAge && !self[MAX_AGE]) return !1;
    var diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
  }
  function trim(self) {
    if (self[LENGTH] > self[MAX]) for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && null !== walker; ) {
      var prev = walker.prev;
      del(self, walker), walker = prev;
    }
  }
  function del(self, node) {
    if (node) {
      var hit = node.value;
      self[DISPOSE] && self[DISPOSE](hit.key, hit.value), self[LENGTH] -= hit.length, 
      self[CACHE].delete(hit.key), self[LRU_LIST].removeNode(node);
    }
  }
  function Entry(key, value, length, now, maxAge) {
    this.key = key, this.value = value, this.length = length, this.now = now, this.maxAge = maxAge || 0;
  }
  Object.defineProperty(LRUCache.prototype, "max", {
    set: function(mL) {
      (!mL || "number" != typeof mL || mL <= 0) && (mL = 1 / 0), this[MAX] = mL, trim(this);
    },
    get: function() {
      return this[MAX];
    },
    enumerable: !0
  }), Object.defineProperty(LRUCache.prototype, "allowStale", {
    set: function(allowStale) {
      this[ALLOW_STALE] = !!allowStale;
    },
    get: function() {
      return this[ALLOW_STALE];
    },
    enumerable: !0
  }), Object.defineProperty(LRUCache.prototype, "maxAge", {
    set: function(mA) {
      (!mA || "number" != typeof mA || mA < 0) && (mA = 0), this[MAX_AGE] = mA, trim(this);
    },
    get: function() {
      return this[MAX_AGE];
    },
    enumerable: !0
  }), Object.defineProperty(LRUCache.prototype, "lengthCalculator", {
    set: function(lC) {
      "function" != typeof lC && (lC = naiveLength), lC !== this[LENGTH_CALCULATOR] && (this[LENGTH_CALCULATOR] = lC, 
      this[LENGTH] = 0, this[LRU_LIST].forEach((function(hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key), this[LENGTH] += hit.length;
      }), this)), trim(this);
    },
    get: function() {
      return this[LENGTH_CALCULATOR];
    },
    enumerable: !0
  }), Object.defineProperty(LRUCache.prototype, "length", {
    get: function() {
      return this[LENGTH];
    },
    enumerable: !0
  }), Object.defineProperty(LRUCache.prototype, "itemCount", {
    get: function() {
      return this[LRU_LIST].length;
    },
    enumerable: !0
  }), LRUCache.prototype.rforEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this[LRU_LIST].tail; null !== walker; ) {
      var prev = walker.prev;
      forEachStep(this, fn, walker, thisp), walker = prev;
    }
  }, LRUCache.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this[LRU_LIST].head; null !== walker; ) {
      var next = walker.next;
      forEachStep(this, fn, walker, thisp), walker = next;
    }
  }, LRUCache.prototype.keys = function() {
    return this[LRU_LIST].toArray().map((function(k) {
      return k.key;
    }), this);
  }, LRUCache.prototype.values = function() {
    return this[LRU_LIST].toArray().map((function(k) {
      return k.value;
    }), this);
  }, LRUCache.prototype.reset = function() {
    this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length && this[LRU_LIST].forEach((function(hit) {
      this[DISPOSE](hit.key, hit.value);
    }), this), this[CACHE] = new Map, this[LRU_LIST] = new Yallist, this[LENGTH] = 0;
  }, LRUCache.prototype.dump = function() {
    return this[LRU_LIST].map((function(hit) {
      if (!isStale(this, hit)) return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      };
    }), this).toArray().filter((function(h) {
      return h;
    }));
  }, LRUCache.prototype.dumpLru = function() {
    return this[LRU_LIST];
  }, LRUCache.prototype.inspect = function(n, opts) {
    var str = "LRUCache {", extras = !1;
    this[ALLOW_STALE] && (str += "\n  allowStale: true", extras = !0);
    var max = this[MAX];
    max && max !== 1 / 0 && (extras && (str += ","), str += "\n  max: " + util.inspect(max, opts), 
    extras = !0);
    var maxAge = this[MAX_AGE];
    maxAge && (extras && (str += ","), str += "\n  maxAge: " + util.inspect(maxAge, opts), 
    extras = !0);
    var lc = this[LENGTH_CALCULATOR];
    lc && lc !== naiveLength && (extras && (str += ","), str += "\n  length: " + util.inspect(this[LENGTH], opts), 
    extras = !0);
    var didFirst = !1;
    return this[LRU_LIST].forEach((function(item) {
      didFirst ? str += ",\n  " : (extras && (str += ",\n"), didFirst = !0, str += "\n  ");
      var key = util.inspect(item.key).split("\n").join("\n  "), val = {
        value: item.value
      };
      item.maxAge !== maxAge && (val.maxAge = item.maxAge), lc !== naiveLength && (val.length = item.length), 
      isStale(this, item) && (val.stale = !0), val = util.inspect(val, opts).split("\n").join("\n  "), 
      str += key + " => " + val;
    })), (didFirst || extras) && (str += "\n"), str += "}";
  }, LRUCache.prototype.set = function(key, value, maxAge) {
    var now = (maxAge = maxAge || this[MAX_AGE]) ? Date.now() : 0, len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) return del(this, this[CACHE].get(key)), !1;
      var item = this[CACHE].get(key).value;
      return this[DISPOSE] && (this[NO_DISPOSE_ON_SET] || this[DISPOSE](key, item.value)), 
      item.now = now, item.maxAge = maxAge, item.value = value, this[LENGTH] += len - item.length, 
      item.length = len, this.get(key), trim(this), !0;
    }
    var hit = new Entry(key, value, len, now, maxAge);
    return hit.length > this[MAX] ? (this[DISPOSE] && this[DISPOSE](key, value), !1) : (this[LENGTH] += hit.length, 
    this[LRU_LIST].unshift(hit), this[CACHE].set(key, this[LRU_LIST].head), trim(this), 
    !0);
  }, LRUCache.prototype.has = function(key) {
    return !!this[CACHE].has(key) && !isStale(this, this[CACHE].get(key).value);
  }, LRUCache.prototype.get = function(key) {
    return get(this, key, !0);
  }, LRUCache.prototype.peek = function(key) {
    return get(this, key, !1);
  }, LRUCache.prototype.pop = function() {
    var node = this[LRU_LIST].tail;
    return node ? (del(this, node), node.value) : null;
  }, LRUCache.prototype.del = function(key) {
    del(this, this[CACHE].get(key));
  }, LRUCache.prototype.load = function(arr) {
    this.reset();
    for (var now = Date.now(), l = arr.length - 1; l >= 0; l--) {
      var hit = arr[l], expiresAt = hit.e || 0;
      if (0 === expiresAt) this.set(hit.k, hit.v); else {
        var maxAge = expiresAt - now;
        maxAge > 0 && this.set(hit.k, hit.v, maxAge);
      }
    }
  }, LRUCache.prototype.prune = function() {
    var self = this;
    this[CACHE].forEach((function(value, key) {
      get(self, key, !1);
    }));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(arg, quote) {
    return arg = "" + arg, arg = quote ? '"' + (arg = (arg = arg.replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")) + '"' : arg.replace(/([()%!^<>&|;,"'\s])/g, "^$1");
  };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  var childProcess = __webpack_require__(6), util = __webpack_require__(2), crossSpawn = __webpack_require__(137), stripEof = __webpack_require__(152), npmRunPath = __webpack_require__(153), isStream = __webpack_require__(155), _getStream = __webpack_require__(156), pFinally = __webpack_require__(159), onExit = __webpack_require__(160), errname = __webpack_require__(164), stdio = __webpack_require__(165);
  function handleArgs(cmd, args, opts) {
    var parsed;
    return (opts = Object.assign({
      extendEnv: !0,
      env: {}
    }, opts)).extendEnv && (opts.env = Object.assign({}, process.env, opts.env)), !0 === opts.__winShell ? (delete opts.__winShell, 
    parsed = {
      command: cmd,
      args: args,
      options: opts,
      file: cmd,
      original: cmd
    }) : parsed = crossSpawn._parse(cmd, args, opts), (opts = Object.assign({
      maxBuffer: 1e7,
      stripEof: !0,
      preferLocal: !0,
      localDir: parsed.options.cwd || process.cwd(),
      encoding: "utf8",
      reject: !0,
      cleanup: !0
    }, parsed.options)).stdio = stdio(opts), opts.preferLocal && (opts.env = npmRunPath.env(Object.assign({}, opts, {
      cwd: opts.localDir
    }))), {
      cmd: parsed.command,
      args: parsed.args,
      opts: opts,
      parsed: parsed
    };
  }
  function handleOutput(opts, val) {
    return val && opts.stripEof && (val = stripEof(val)), val;
  }
  function handleShell(fn, cmd, opts) {
    var file = "/bin/sh", args = [ "-c", cmd ];
    return opts = Object.assign({}, opts), "win32" === process.platform && (opts.__winShell = !0, 
    file = process.env.comspec || "cmd.exe", args = [ "/s", "/c", `"${cmd}"` ], opts.windowsVerbatimArguments = !0), 
    opts.shell && (file = opts.shell, delete opts.shell), fn(file, args, opts);
  }
  function getStream(process, stream, encoding, maxBuffer) {
    return process[stream] ? (encoding ? _getStream(process[stream], {
      encoding: encoding,
      maxBuffer: maxBuffer
    }) : _getStream.buffer(process[stream], {
      maxBuffer: maxBuffer
    })).catch(err => {
      throw err.stream = stream, err.message = `${stream} ${err.message}`, err;
    }) : null;
  }
  module.exports = (cmd, args, opts) => {
    var joinedCmd = cmd;
    Array.isArray(args) && args.length > 0 && (joinedCmd += " " + args.join(" "));
    var spawned, removeExitHandler, parsed = handleArgs(cmd, args, opts), encoding = parsed.opts.encoding, maxBuffer = parsed.opts.maxBuffer;
    try {
      spawned = childProcess.spawn(parsed.cmd, parsed.args, parsed.opts);
    } catch (err) {
      return Promise.reject(err);
    }
    parsed.opts.cleanup && (removeExitHandler = onExit(() => {
      spawned.kill();
    }));
    var timeoutId = null, timedOut = !1, cleanupTimeout = () => {
      timeoutId && (clearTimeout(timeoutId), timeoutId = null);
    };
    parsed.opts.timeout > 0 && (timeoutId = setTimeout(() => {
      timeoutId = null, timedOut = !0, spawned.kill(parsed.opts.killSignal);
    }, parsed.opts.timeout));
    var processDone = new Promise(resolve => {
      spawned.on("exit", (code, signal) => {
        cleanupTimeout(), resolve({
          code: code,
          signal: signal
        });
      }), spawned.on("error", err => {
        cleanupTimeout(), resolve({
          err: err
        });
      }), spawned.stdin && spawned.stdin.on("error", err => {
        cleanupTimeout(), resolve({
          err: err
        });
      });
    });
    function destroy() {
      spawned.stdout && spawned.stdout.destroy(), spawned.stderr && spawned.stderr.destroy();
    }
    var handlePromise = () => pFinally(Promise.all([ processDone, getStream(spawned, "stdout", encoding, maxBuffer), getStream(spawned, "stderr", encoding, maxBuffer) ]).then(arr => {
      var result = arr[0], stdout = arr[1], stderr = arr[2], err = result.err, code = result.code, signal = result.signal;
      if (removeExitHandler && removeExitHandler(), err || 0 !== code || null !== signal) {
        if (!err) {
          var output = "";
          Array.isArray(parsed.opts.stdio) ? ("inherit" !== parsed.opts.stdio[2] && (output += output.length > 0 ? stderr : "\n" + stderr), 
          "inherit" !== parsed.opts.stdio[1] && (output += "\n" + stdout)) : "inherit" !== parsed.opts.stdio && (output = `\n${stderr}${stdout}`), 
          (err = new Error(`Command failed: ${joinedCmd}${output}`)).code = code < 0 ? errname(code) : code;
        }
        if (err.killed = err.killed || spawned.killed, err.stdout = stdout, err.stderr = stderr, 
        err.failed = !0, err.signal = signal || null, err.cmd = joinedCmd, err.timedOut = timedOut, 
        !parsed.opts.reject) return err;
        throw err;
      }
      return {
        stdout: handleOutput(parsed.opts, stdout),
        stderr: handleOutput(parsed.opts, stderr),
        code: 0,
        failed: !1,
        killed: !1,
        signal: null,
        cmd: joinedCmd,
        timedOut: !1
      };
    }), destroy);
    return crossSpawn._enoent.hookChildProcess(spawned, parsed.parsed), function(spawned, opts) {
      var input = opts.input;
      null != input && (isStream(input) ? input.pipe(spawned.stdin) : spawned.stdin.end(input));
    }(spawned, parsed.opts), spawned.then = (onfulfilled, onrejected) => handlePromise().then(onfulfilled, onrejected), 
    spawned.catch = onrejected => handlePromise().catch(onrejected), spawned;
  }, module.exports.stdout = function() {
    return module.exports.apply(null, arguments).then(x => x.stdout);
  }, module.exports.stderr = function() {
    return module.exports.apply(null, arguments).then(x => x.stderr);
  }, module.exports.shell = (cmd, opts) => handleShell(module.exports, cmd, opts), 
  module.exports.sync = (cmd, args, opts) => {
    var parsed = handleArgs(cmd, args, opts);
    if (isStream(parsed.opts.input)) throw new TypeError("The `input` option cannot be a stream in sync mode");
    var result = childProcess.spawnSync(parsed.cmd, parsed.args, parsed.opts);
    if (result.error || 0 !== result.status) throw result.error || new Error("" === result.stderr ? result.stdout : result.stderr);
    return result.stdout = handleOutput(parsed.opts, result.stdout), result.stderr = handleOutput(parsed.opts, result.stderr), 
    result;
  }, module.exports.shellSync = (cmd, opts) => handleShell(module.exports.sync, cmd, opts), 
  module.exports.spawn = util.deprecate(module.exports, "execa.spawn() is deprecated. Use execa() instead.");
}, function(module, exports, __webpack_require__) {
  "use strict";
  __webpack_require__(6);
  var parse = __webpack_require__(138), enoent = __webpack_require__(151);
  module.exports._parse = parse, module.exports._enoent = enoent;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var resolveCommand = __webpack_require__(29), hasEmptyArgumentBug = __webpack_require__(146), escapeArgument = __webpack_require__(31), escapeCommand = __webpack_require__(147), readShebang = __webpack_require__(148), isWin = "win32" === process.platform, skipShellRegExp = /\.(?:com|exe)$/i, supportsShellOption = parseInt(process.version.substr(1).split(".")[0], 10) >= 6 || 4 === parseInt(process.version.substr(1).split(".")[0], 10) && parseInt(process.version.substr(1).split(".")[1], 10) >= 8;
  module.exports = function(command, args, options) {
    var parsed;
    return args && !Array.isArray(args) && (options = args, args = null), parsed = {
      command: command,
      args: args = args ? args.slice(0) : [],
      options: options = options || {},
      file: void 0,
      original: command
    }, options.shell ? function(parsed) {
      var shellCommand;
      return supportsShellOption || (shellCommand = [ parsed.command ].concat(parsed.args).join(" "), 
      isWin ? (parsed.command = "string" == typeof parsed.options.shell ? parsed.options.shell : process.env.comspec || "cmd.exe", 
      parsed.args = [ "/d", "/s", "/c", '"' + shellCommand + '"' ], parsed.options.windowsVerbatimArguments = !0) : ("string" == typeof parsed.options.shell ? parsed.command = parsed.options.shell : "android" === process.platform ? parsed.command = "/system/bin/sh" : parsed.command = "/bin/sh", 
      parsed.args = [ "-c", shellCommand ])), parsed;
    }(parsed) : function(parsed) {
      var shebang, needsShell, applyQuotes;
      return isWin ? (parsed.file = resolveCommand(parsed.command), parsed.file = parsed.file || resolveCommand(parsed.command, !0), 
      (shebang = parsed.file && readShebang(parsed.file)) ? (parsed.args.unshift(parsed.file), 
      parsed.command = shebang, needsShell = hasEmptyArgumentBug || !skipShellRegExp.test(resolveCommand(shebang) || resolveCommand(shebang, !0))) : needsShell = hasEmptyArgumentBug || !skipShellRegExp.test(parsed.file), 
      needsShell && (applyQuotes = "echo" !== parsed.command, parsed.command = escapeCommand(parsed.command), 
      parsed.args = parsed.args.map((function(arg) {
        return escapeArgument(arg, applyQuotes);
      })), parsed.args = [ "/d", "/s", "/c", '"' + parsed.command + (parsed.args.length ? " " + parsed.args.join(" ") : "") + '"' ], 
      parsed.command = process.env.comspec || "cmd.exe", parsed.options.windowsVerbatimArguments = !0), 
      parsed) : parsed;
    }(parsed);
  };
}, function(module, exports, __webpack_require__) {
  module.exports = which, which.sync = function(cmd, opt) {
    for (var info = getPathInfo(cmd, opt = opt || {}), pathEnv = info.env, pathExt = info.ext, pathExtExe = info.extExe, found = [], i = 0, l = pathEnv.length; i < l; i++) {
      var pathPart = pathEnv[i];
      '"' === pathPart.charAt(0) && '"' === pathPart.slice(-1) && (pathPart = pathPart.slice(1, -1));
      var p = path.join(pathPart, cmd);
      !pathPart && /^\.[\\\/]/.test(cmd) && (p = cmd.slice(0, 2) + p);
      for (var j = 0, ll = pathExt.length; j < ll; j++) {
        var cur = p + pathExt[j];
        try {
          if (isexe.sync(cur, {
            pathExt: pathExtExe
          })) {
            if (!opt.all) return cur;
            found.push(cur);
          }
        } catch (ex) {}
      }
    }
    if (opt.all && found.length) return found;
    if (opt.nothrow) return null;
    throw getNotFoundError(cmd);
  };
  var isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(0), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(140);
  function getNotFoundError(cmd) {
    var er = new Error("not found: " + cmd);
    return er.code = "ENOENT", er;
  }
  function getPathInfo(cmd, opt) {
    var colon = opt.colon || COLON, pathEnv = opt.path || process.env.PATH || "", pathExt = [ "" ];
    pathEnv = pathEnv.split(colon);
    var pathExtExe = "";
    return isWindows && (pathEnv.unshift(process.cwd()), pathExt = (pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM").split(colon), 
    -1 !== cmd.indexOf(".") && "" !== pathExt[0] && pathExt.unshift("")), (cmd.match(/\//) || isWindows && cmd.match(/\\/)) && (pathEnv = [ "" ]), 
    {
      env: pathEnv,
      ext: pathExt,
      extExe: pathExtExe
    };
  }
  function which(cmd, opt, cb) {
    "function" == typeof opt && (cb = opt, opt = {});
    var info = getPathInfo(cmd, opt), pathEnv = info.env, pathExt = info.ext, pathExtExe = info.extExe, found = [];
    !function F(i, l) {
      if (i === l) return opt.all && found.length ? cb(null, found) : cb(getNotFoundError(cmd));
      var pathPart = pathEnv[i];
      '"' === pathPart.charAt(0) && '"' === pathPart.slice(-1) && (pathPart = pathPart.slice(1, -1));
      var p = path.join(pathPart, cmd);
      !pathPart && /^\.[\\\/]/.test(cmd) && (p = cmd.slice(0, 2) + p), function E(ii, ll) {
        if (ii === ll) return F(i + 1, l);
        var ext = pathExt[ii];
        isexe(p + ext, {
          pathExt: pathExtExe
        }, (function(er, is) {
          if (!er && is) {
            if (!opt.all) return cb(null, p + ext);
            found.push(p + ext);
          }
          return E(ii + 1, ll);
        }));
      }(0, pathExt.length);
    }(0, pathEnv.length);
  }
}, function(module, exports, __webpack_require__) {
  var core;
  __webpack_require__(1);
  function isexe(path, options, cb) {
    if ("function" == typeof options && (cb = options, options = {}), !cb) {
      if ("function" != typeof Promise) throw new TypeError("callback not provided");
      return new Promise((function(resolve, reject) {
        isexe(path, options || {}, (function(er, is) {
          er ? reject(er) : resolve(is);
        }));
      }));
    }
    core(path, options || {}, (function(er, is) {
      er && ("EACCES" === er.code || options && options.ignoreErrors) && (er = null, is = !1), 
      cb(er, is);
    }));
  }
  core = "win32" === process.platform || global.TESTING_WINDOWS ? __webpack_require__(141) : __webpack_require__(142), 
  module.exports = isexe, isexe.sync = function(path, options) {
    try {
      return core.sync(path, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || "EACCES" === er.code) return !1;
      throw er;
    }
  };
}, function(module, exports, __webpack_require__) {
  module.exports = isexe, isexe.sync = function(path, options) {
    return checkStat(fs.statSync(path), path, options);
  };
  var fs = __webpack_require__(1);
  function checkStat(stat, path, options) {
    return !(!stat.isSymbolicLink() && !stat.isFile()) && function(path, options) {
      var pathext = void 0 !== options.pathExt ? options.pathExt : process.env.PATHEXT;
      if (!pathext) return !0;
      if (-1 !== (pathext = pathext.split(";")).indexOf("")) return !0;
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) return !0;
      }
      return !1;
    }(path, options);
  }
  function isexe(path, options, cb) {
    fs.stat(path, (function(er, stat) {
      cb(er, !er && checkStat(stat, path, options));
    }));
  }
}, function(module, exports, __webpack_require__) {
  module.exports = isexe, isexe.sync = function(path, options) {
    return checkStat(fs.statSync(path), options);
  };
  var fs = __webpack_require__(1);
  function isexe(path, options, cb) {
    fs.stat(path, (function(er, stat) {
      cb(er, !er && checkStat(stat, options));
    }));
  }
  function checkStat(stat, options) {
    return stat.isFile() && function(stat, options) {
      var mod = stat.mode, uid = stat.uid, gid = stat.gid, myUid = void 0 !== options.uid ? options.uid : process.getuid && process.getuid(), myGid = void 0 !== options.gid ? options.gid : process.getgid && process.getgid(), u = parseInt("100", 8), g = parseInt("010", 8), o = parseInt("001", 8), ug = u | g;
      return mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && 0 === myUid;
    }(stat, options);
  }
}, function(module, exports, __webpack_require__) {
  "pseudomap" === process.env.npm_package_name && "test" === process.env.npm_lifecycle_script && (process.env.TEST_PSEUDOMAP = "true"), 
  "function" != typeof Map || process.env.TEST_PSEUDOMAP ? module.exports = __webpack_require__(144) : module.exports = Map;
}, function(module, exports) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function PseudoMap(set) {
    if (!(this instanceof PseudoMap)) throw new TypeError("Constructor PseudoMap requires 'new'");
    if (this.clear(), set) if (set instanceof PseudoMap || "function" == typeof Map && set instanceof Map) set.forEach((function(value, key) {
      this.set(key, value);
    }), this); else {
      if (!Array.isArray(set)) throw new TypeError("invalid argument");
      set.forEach((function(kv) {
        this.set(kv[0], kv[1]);
      }), this);
    }
  }
  function same(a, b) {
    return a === b || a != a && b != b;
  }
  function Entry(k, v, i) {
    this.key = k, this.value = v, this._index = i;
  }
  function find(data, k) {
    for (var i = 0, s = "_" + k, key = s; hasOwnProperty.call(data, key); key = s + i++) if (same(data[key].key, k)) return data[key];
  }
  module.exports = PseudoMap, PseudoMap.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this, Object.keys(this._data).forEach((function(k) {
      "size" !== k && fn.call(thisp, this._data[k].value, this._data[k].key);
    }), this);
  }, PseudoMap.prototype.has = function(k) {
    return !!find(this._data, k);
  }, PseudoMap.prototype.get = function(k) {
    var res = find(this._data, k);
    return res && res.value;
  }, PseudoMap.prototype.set = function(k, v) {
    !function(data, k, v) {
      for (var i = 0, s = "_" + k, key = s; hasOwnProperty.call(data, key); key = s + i++) if (same(data[key].key, k)) return void (data[key].value = v);
      data.size++, data[key] = new Entry(k, v, key);
    }(this._data, k, v);
  }, PseudoMap.prototype.delete = function(k) {
    var res = find(this._data, k);
    res && (delete this._data[res._index], this._data.size--);
  }, PseudoMap.prototype.clear = function() {
    var data = Object.create(null);
    data.size = 0, Object.defineProperty(this, "_data", {
      value: data,
      enumerable: !1,
      configurable: !0,
      writable: !1
    });
  }, Object.defineProperty(PseudoMap.prototype, "size", {
    get: function() {
      return this._data.size;
    },
    set: function(n) {},
    enumerable: !0,
    configurable: !0
  }), PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function() {
    throw new Error("iterators are not implemented in this version");
  };
}, function(module, exports) {
  function Yallist(list) {
    var self = this;
    if (self instanceof Yallist || (self = new Yallist), self.tail = null, self.head = null, 
    self.length = 0, list && "function" == typeof list.forEach) list.forEach((function(item) {
      self.push(item);
    })); else if (arguments.length > 0) for (var i = 0, l = arguments.length; i < l; i++) self.push(arguments[i]);
    return self;
  }
  function push(self, item) {
    self.tail = new Node(item, self.tail, null, self), self.head || (self.head = self.tail), 
    self.length++;
  }
  function unshift(self, item) {
    self.head = new Node(item, null, self.head, self), self.tail || (self.tail = self.head), 
    self.length++;
  }
  function Node(value, prev, next, list) {
    if (!(this instanceof Node)) return new Node(value, prev, next, list);
    this.list = list, this.value = value, prev ? (prev.next = this, this.prev = prev) : this.prev = null, 
    next ? (next.prev = this, this.next = next) : this.next = null;
  }
  module.exports = Yallist, Yallist.Node = Node, Yallist.create = Yallist, Yallist.prototype.removeNode = function(node) {
    if (node.list !== this) throw new Error("removing node which does not belong to this list");
    var next = node.next, prev = node.prev;
    next && (next.prev = prev), prev && (prev.next = next), node === this.head && (this.head = next), 
    node === this.tail && (this.tail = prev), node.list.length--, node.next = null, 
    node.prev = null, node.list = null;
  }, Yallist.prototype.unshiftNode = function(node) {
    if (node !== this.head) {
      node.list && node.list.removeNode(node);
      var head = this.head;
      node.list = this, node.next = head, head && (head.prev = node), this.head = node, 
      this.tail || (this.tail = node), this.length++;
    }
  }, Yallist.prototype.pushNode = function(node) {
    if (node !== this.tail) {
      node.list && node.list.removeNode(node);
      var tail = this.tail;
      node.list = this, node.prev = tail, tail && (tail.next = node), this.tail = node, 
      this.head || (this.head = node), this.length++;
    }
  }, Yallist.prototype.push = function() {
    for (var i = 0, l = arguments.length; i < l; i++) push(this, arguments[i]);
    return this.length;
  }, Yallist.prototype.unshift = function() {
    for (var i = 0, l = arguments.length; i < l; i++) unshift(this, arguments[i]);
    return this.length;
  }, Yallist.prototype.pop = function() {
    if (this.tail) {
      var res = this.tail.value;
      return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, 
      this.length--, res;
    }
  }, Yallist.prototype.shift = function() {
    if (this.head) {
      var res = this.head.value;
      return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, 
      this.length--, res;
    }
  }, Yallist.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.head, i = 0; null !== walker; i++) fn.call(thisp, walker.value, i, this), 
    walker = walker.next;
  }, Yallist.prototype.forEachReverse = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.tail, i = this.length - 1; null !== walker; i--) fn.call(thisp, walker.value, i, this), 
    walker = walker.prev;
  }, Yallist.prototype.get = function(n) {
    for (var i = 0, walker = this.head; null !== walker && i < n; i++) walker = walker.next;
    if (i === n && null !== walker) return walker.value;
  }, Yallist.prototype.getReverse = function(n) {
    for (var i = 0, walker = this.tail; null !== walker && i < n; i++) walker = walker.prev;
    if (i === n && null !== walker) return walker.value;
  }, Yallist.prototype.map = function(fn, thisp) {
    thisp = thisp || this;
    for (var res = new Yallist, walker = this.head; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
    walker = walker.next;
    return res;
  }, Yallist.prototype.mapReverse = function(fn, thisp) {
    thisp = thisp || this;
    for (var res = new Yallist, walker = this.tail; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
    walker = walker.prev;
    return res;
  }, Yallist.prototype.reduce = function(fn, initial) {
    var acc, walker = this.head;
    if (arguments.length > 1) acc = initial; else {
      if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
      walker = this.head.next, acc = this.head.value;
    }
    for (var i = 0; null !== walker; i++) acc = fn(acc, walker.value, i), walker = walker.next;
    return acc;
  }, Yallist.prototype.reduceReverse = function(fn, initial) {
    var acc, walker = this.tail;
    if (arguments.length > 1) acc = initial; else {
      if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
      walker = this.tail.prev, acc = this.tail.value;
    }
    for (var i = this.length - 1; null !== walker; i--) acc = fn(acc, walker.value, i), 
    walker = walker.prev;
    return acc;
  }, Yallist.prototype.toArray = function() {
    for (var arr = new Array(this.length), i = 0, walker = this.head; null !== walker; i++) arr[i] = walker.value, 
    walker = walker.next;
    return arr;
  }, Yallist.prototype.toArrayReverse = function() {
    for (var arr = new Array(this.length), i = 0, walker = this.tail; null !== walker; i++) arr[i] = walker.value, 
    walker = walker.prev;
    return arr;
  }, Yallist.prototype.slice = function(from, to) {
    (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
    var ret = new Yallist;
    if (to < from || to < 0) return ret;
    from < 0 && (from = 0), to > this.length && (to = this.length);
    for (var i = 0, walker = this.head; null !== walker && i < from; i++) walker = walker.next;
    for (;null !== walker && i < to; i++, walker = walker.next) ret.push(walker.value);
    return ret;
  }, Yallist.prototype.sliceReverse = function(from, to) {
    (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
    var ret = new Yallist;
    if (to < from || to < 0) return ret;
    from < 0 && (from = 0), to > this.length && (to = this.length);
    for (var i = this.length, walker = this.tail; null !== walker && i > to; i--) walker = walker.prev;
    for (;null !== walker && i > from; i--, walker = walker.prev) ret.push(walker.value);
    return ret;
  }, Yallist.prototype.reverse = function() {
    for (var head = this.head, tail = this.tail, walker = head; null !== walker; walker = walker.prev) {
      var p = walker.prev;
      walker.prev = walker.next, walker.next = p;
    }
    return this.head = tail, this.tail = head, this;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var nodeVer;
  module.exports = "win32" === process.platform && 0 === (nodeVer = process.version.substr(1).split(".").map((function(num) {
    return parseInt(num, 10);
  })))[0] && nodeVer[1] < 12;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var escapeArgument = __webpack_require__(31);
  module.exports = function(command) {
    return /^[a-z0-9_-]+$/i.test(command) ? command : escapeArgument(command, !0);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var fs = __webpack_require__(1), LRU = __webpack_require__(30), shebangCommand = __webpack_require__(149), shebangCache = new LRU({
    max: 50,
    maxAge: 3e4
  });
  module.exports = function(command) {
    var buffer, fd, shebang;
    if (shebangCache.has(command)) return shebangCache.get(command);
    buffer = new Buffer(150);
    try {
      fd = fs.openSync(command, "r"), fs.readSync(fd, buffer, 0, 150, 0), fs.closeSync(fd);
    } catch (e) {}
    return shebang = shebangCommand(buffer.toString()), shebangCache.set(command, shebang), 
    shebang;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var shebangRegex = __webpack_require__(150);
  module.exports = function(str) {
    var match = str.match(shebangRegex);
    if (!match) return null;
    var arr = match[0].replace(/#! ?/, "").split(" "), bin = arr[0].split("/").pop(), arg = arr[1];
    return "env" === bin ? arg : bin + (arg ? " " + arg : "");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = /^#!.*/;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var isWin = "win32" === process.platform;
  __webpack_require__(29), process.version.indexOf("v0.10.");
  function notFoundError(command, syscall) {
    var err;
    return (err = new Error(syscall + " " + command + " ENOENT")).code = err.errno = "ENOENT", 
    err.syscall = syscall + " " + command, err;
  }
  function verifyENOENT(status, parsed) {
    return isWin && 1 === status && !parsed.file ? notFoundError(parsed.original, "spawn") : null;
  }
  module.exports.hookChildProcess = function(cp, parsed) {
    var originalEmit;
    isWin && (originalEmit = cp.emit, cp.emit = function(name, arg1) {
      var err;
      return "exit" === name && (err = verifyENOENT(arg1, parsed)) ? originalEmit.call(cp, "error", err) : originalEmit.apply(cp, arguments);
    });
  }, module.exports.verifyENOENT = verifyENOENT, module.exports.notFoundError = notFoundError;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(x) {
    var lf = "string" == typeof x ? "\n" : "\n".charCodeAt(), cr = "string" == typeof x ? "\r" : "\r".charCodeAt();
    return x[x.length - 1] === lf && (x = x.slice(0, x.length - 1)), x[x.length - 1] === cr && (x = x.slice(0, x.length - 1)), 
    x;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(0), pathKey = __webpack_require__(154);
  module.exports = opts => {
    var prev;
    opts = Object.assign({
      cwd: process.cwd(),
      path: process.env[pathKey()]
    }, opts);
    for (var pth = path.resolve(opts.cwd), ret = []; prev !== pth; ) ret.push(path.join(pth, "node_modules/.bin")), 
    prev = pth, pth = path.resolve(pth, "..");
    return ret.push(path.dirname(process.execPath)), ret.concat(opts.path).join(path.delimiter);
  }, module.exports.env = opts => {
    opts = Object.assign({
      env: process.env
    }, opts);
    var env = Object.assign({}, opts.env), path = pathKey({
      env: env
    });
    return opts.path = env[path], env[path] = module.exports(opts), env;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = opts => {
    var env = (opts = opts || {}).env || process.env;
    return "win32" !== (opts.platform || process.platform) ? "PATH" : Object.keys(env).find(x => "PATH" === x.toUpperCase()) || "Path";
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var isStream = module.exports = function(stream) {
    return null !== stream && "object" == typeof stream && "function" == typeof stream.pipe;
  };
  isStream.writable = function(stream) {
    return isStream(stream) && !1 !== stream.writable && "function" == typeof stream._write && "object" == typeof stream._writableState;
  }, isStream.readable = function(stream) {
    return isStream(stream) && !1 !== stream.readable && "function" == typeof stream._read && "object" == typeof stream._readableState;
  }, isStream.duplex = function(stream) {
    return isStream.writable(stream) && isStream.readable(stream);
  }, isStream.transform = function(stream) {
    return isStream.duplex(stream) && "function" == typeof stream._transform && "object" == typeof stream._transformState;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var bufferStream = __webpack_require__(157);
  function getStream(inputStream, opts) {
    if (!inputStream) return Promise.reject(new Error("Expected a stream"));
    var stream, clean, maxBuffer = (opts = Object.assign({
      maxBuffer: 1 / 0
    }, opts)).maxBuffer, p = new Promise((resolve, reject) => {
      var error = err => {
        err && (err.bufferedData = stream.getBufferedValue()), reject(err);
      };
      stream = bufferStream(opts), inputStream.once("error", error), inputStream.pipe(stream), 
      stream.on("data", () => {
        stream.getBufferedLength() > maxBuffer && reject(new Error("maxBuffer exceeded"));
      }), stream.once("error", error), stream.on("end", resolve), clean = () => {
        inputStream.unpipe && inputStream.unpipe(stream);
      };
    });
    return p.then(clean, clean), p.then(() => stream.getBufferedValue());
  }
  module.exports = getStream, module.exports.buffer = (stream, opts) => getStream(stream, Object.assign({}, opts, {
    encoding: "buffer"
  })), module.exports.array = (stream, opts) => getStream(stream, Object.assign({}, opts, {
    array: !0
  }));
}, function(module, exports, __webpack_require__) {
  "use strict";
  var PassThrough = __webpack_require__(158).PassThrough;
  module.exports = opts => {
    var array = (opts = Object.assign({}, opts)).array, encoding = opts.encoding, buffer = "buffer" === encoding, objectMode = !1;
    array ? objectMode = !(encoding || buffer) : encoding = encoding || "utf8", buffer && (encoding = null);
    var len = 0, ret = [], stream = new PassThrough({
      objectMode: objectMode
    });
    return encoding && stream.setEncoding(encoding), stream.on("data", chunk => {
      ret.push(chunk), objectMode ? len = ret.length : len += chunk.length;
    }), stream.getBufferedValue = () => array ? ret : buffer ? Buffer.concat(ret, len) : ret.join(""), 
    stream.getBufferedLength = () => len, stream;
  };
}, function(module, exports) {
  module.exports = require("stream");
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = (promise, onFinally) => (onFinally = onFinally || (() => {}), promise.then(val => new Promise(resolve => {
    resolve(onFinally());
  }).then(() => val), err => new Promise(resolve => {
    resolve(onFinally());
  }).then(() => {
    throw err;
  })));
}, function(module, exports, __webpack_require__) {
  var emitter, assert = __webpack_require__(161), signals = __webpack_require__(162), isWin = /^win/i.test(process.platform), EE = __webpack_require__(163);
  function unload() {
    loaded && (loaded = !1, signals.forEach((function(sig) {
      try {
        process.removeListener(sig, sigListeners[sig]);
      } catch (er) {}
    })), process.emit = originalProcessEmit, process.reallyExit = originalProcessReallyExit, 
    emitter.count -= 1);
  }
  function emit(event, code, signal) {
    emitter.emitted[event] || (emitter.emitted[event] = !0, emitter.emit(event, code, signal));
  }
  "function" != typeof EE && (EE = EE.EventEmitter), process.__signal_exit_emitter__ ? emitter = process.__signal_exit_emitter__ : ((emitter = process.__signal_exit_emitter__ = new EE).count = 0, 
  emitter.emitted = {}), emitter.infinite || (emitter.setMaxListeners(1 / 0), emitter.infinite = !0), 
  module.exports = function(cb, opts) {
    assert.equal(typeof cb, "function", "a callback must be provided for exit handler"), 
    !1 === loaded && load();
    var ev = "exit";
    opts && opts.alwaysLast && (ev = "afterexit");
    return emitter.on(ev, cb), function() {
      emitter.removeListener(ev, cb), 0 === emitter.listeners("exit").length && 0 === emitter.listeners("afterexit").length && unload();
    };
  }, module.exports.unload = unload;
  var sigListeners = {};
  signals.forEach((function(sig) {
    sigListeners[sig] = function() {
      process.listeners(sig).length === emitter.count && (unload(), emit("exit", null, sig), 
      emit("afterexit", null, sig), isWin && "SIGHUP" === sig && (sig = "SIGINT"), process.kill(process.pid, sig));
    };
  })), module.exports.signals = function() {
    return signals;
  }, module.exports.load = load;
  var loaded = !1;
  function load() {
    loaded || (loaded = !0, emitter.count += 1, signals = signals.filter((function(sig) {
      try {
        return process.on(sig, sigListeners[sig]), !0;
      } catch (er) {
        return !1;
      }
    })), process.emit = processEmit, process.reallyExit = processReallyExit);
  }
  var originalProcessReallyExit = process.reallyExit;
  function processReallyExit(code) {
    process.exitCode = code || 0, emit("exit", process.exitCode, null), emit("afterexit", process.exitCode, null), 
    originalProcessReallyExit.call(process, process.exitCode);
  }
  var originalProcessEmit = process.emit;
  function processEmit(ev, arg) {
    if ("exit" === ev) {
      void 0 !== arg && (process.exitCode = arg);
      var ret = originalProcessEmit.apply(this, arguments);
      return emit("exit", process.exitCode, null), emit("afterexit", process.exitCode, null), 
      ret;
    }
    return originalProcessEmit.apply(this, arguments);
  }
}, function(module, exports) {
  module.exports = require("assert");
}, function(module, exports) {
  module.exports = [ "SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM" ], "win32" !== process.platform && module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT"), 
  "linux" === process.platform && module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
}, function(module, exports) {
  module.exports = require("events");
}, function(module, exports, __webpack_require__) {
  "use strict";
  var uv;
  try {
    if ("function" != typeof (uv = process.binding("uv")).errname) throw new TypeError("uv.errname is not a function");
  } catch (err) {
    console.error("execa/lib/errname: unable to establish process.binding('uv')", err), 
    uv = null;
  }
  function errname(uv, code) {
    if (uv) return uv.errname(code);
    if (!(code < 0)) throw new Error("err >= 0");
    return "Unknown system error " + code;
  }
  module.exports = code => errname(uv, code), module.exports.__test__ = errname;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var alias = [ "stdin", "stdout", "stderr" ];
  module.exports = opts => {
    if (!opts) return null;
    if (opts.stdio && (opts => alias.some(x => Boolean(opts[x])))(opts)) throw new Error("It's not possible to provide `stdio` in combination with one of " + alias.map(x => `\`${x}\``).join(", "));
    if ("string" == typeof opts.stdio) return opts.stdio;
    var stdio = opts.stdio || [];
    if (!Array.isArray(stdio)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
    for (var result = [], len = Math.max(stdio.length, alias.length), i = 0; i < len; i++) {
      var value = null;
      void 0 !== stdio[i] ? value = stdio[i] : void 0 !== opts[alias[i]] && (value = opts[alias[i]]), 
      result[i] = value;
    }
    return result;
  };
} ]);