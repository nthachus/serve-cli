#!/usr/bin/env node
!function(modules) {
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
  __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 32);
}([ function(module, exports) {
  module.exports = require("path");
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports) {
  module.exports = require("util");
}, , function(module, exports) {
  module.exports = require("./vendor/execa");
}, function(module, exports) {
  module.exports = require("os");
}, function(module, exports) {
  module.exports = require("child_process");
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(fn, options) {
    if ("function" != typeof fn) throw new TypeError("first parameter is not a function");
    var opts = Object.assign({
      context: {},
      multiArgs: !1
    }, options);
    return function() {
      var callArgs = Array.prototype.slice.call(arguments);
      return new Promise((function(resolve, reject) {
        callArgs.push((function(err) {
          err ? reject(err) : opts.multiArgs ? resolve(Array.prototype.slice.call(arguments, 1)) : resolve(arguments[1]);
        })), fn.apply(opts.context, callArgs);
      }));
    };
  };
}, function(module, exports) {
  module.exports = require("url");
}, function(module, exports, __webpack_require__) {
  "use strict";
  var stripAnsi = __webpack_require__(68), isFullwidthCodePoint = __webpack_require__(70);
  module.exports = str => {
    if ("string" != typeof str || 0 === str.length) return 0;
    str = stripAnsi(str);
    for (var width = 0, i = 0; i < str.length; i++) {
      var code = str.codePointAt(i);
      code <= 31 || code >= 127 && code <= 159 || (code >= 768 && code <= 879 || (code > 65535 && i++, 
      width += isFullwidthCodePoint(code) ? 2 : 1));
    }
    return width;
  };
}, , , , function(module, exports) {
  module.exports = require("http");
}, function(module, exports) {
  module.exports = require("https");
}, function(module, exports, __webpack_require__) {
  var cc = __webpack_require__(36), join = __webpack_require__(0).join, deepExtend = __webpack_require__(39), win = "win32" === process.platform, home = win ? process.env.USERPROFILE : process.env.HOME;
  module.exports = function(name, defaults, argv, parse) {
    if ("string" != typeof name) throw new Error("rc(name): name *must* be string");
    argv || (argv = {}), defaults = ("string" == typeof defaults ? cc.json(defaults) : defaults) || {}, 
    parse = parse || cc.parse;
    var env = cc.env(name + "_"), configs = [ defaults ], configFiles = [];
    function addConfigFile(file) {
      if (!(configFiles.indexOf(file) >= 0)) {
        var fileConfig = cc.file(file);
        fileConfig && (configs.push(parse(fileConfig)), configFiles.push(file));
      }
    }
    return win || [ join("/etc", name, "config"), join("/etc", name + "rc") ].forEach(addConfigFile), 
    home && [ join(home, ".config", name, "config"), join(home, ".config", name), join(home, "." + name, "config"), join(home, "." + name + "rc") ].forEach(addConfigFile), 
    addConfigFile(cc.find("." + name + "rc")), env.config && addConfigFile(env.config), 
    argv.config && addConfigFile(argv.config), deepExtend.apply(null, configs.concat([ env, argv, configFiles.length ? {
      configs: configFiles,
      config: configFiles[configFiles.length - 1]
    } : void 0 ]));
  };
}, function(module, exports, __webpack_require__) {
  var buffer = __webpack_require__(42), Buffer = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) dst[key] = src[key];
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
  }
  Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? module.exports = buffer : (copyProps(buffer, exports), 
  exports.Buffer = SafeBuffer), copyProps(Buffer, SafeBuffer), SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if ("number" == typeof arg) throw new TypeError("Argument must not be a number");
    return Buffer(arg, encodingOrOffset, length);
  }, SafeBuffer.alloc = function(size, fill, encoding) {
    if ("number" != typeof size) throw new TypeError("Argument must be a number");
    var buf = Buffer(size);
    return void 0 !== fill ? "string" == typeof encoding ? buf.fill(fill, encoding) : buf.fill(fill) : buf.fill(0), 
    buf;
  }, SafeBuffer.allocUnsafe = function(size) {
    if ("number" != typeof size) throw new TypeError("Argument must be a number");
    return Buffer(size);
  }, SafeBuffer.allocUnsafeSlow = function(size) {
    if ("number" != typeof size) throw new TypeError("Argument must be a number");
    return buffer.SlowBuffer(size);
  };
}, function(module, exports) {
  module.exports = require("./vendor/chalk");
}, function(module, exports, __webpack_require__) {
  "use strict";
  var extensions, types, preference, db = __webpack_require__(19), extname = __webpack_require__(0).extname, EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/, TEXT_TYPE_REGEXP = /^text\//i;
  function charset(type) {
    if (!type || "string" != typeof type) return !1;
    var match = EXTRACT_TYPE_REGEXP.exec(type), mime = match && db[match[1].toLowerCase()];
    return mime && mime.charset ? mime.charset : !(!match || !TEXT_TYPE_REGEXP.test(match[1])) && "UTF-8";
  }
  exports.charset = charset, exports.charsets = {
    lookup: charset
  }, exports.contentType = function(str) {
    if (!str || "string" != typeof str) return !1;
    var mime = -1 === str.indexOf("/") ? exports.lookup(str) : str;
    if (!mime) return !1;
    if (-1 === mime.indexOf("charset")) {
      var charset = exports.charset(mime);
      charset && (mime += "; charset=" + charset.toLowerCase());
    }
    return mime;
  }, exports.extensions = Object.create(null), exports.lookup = function(path) {
    if (!path || "string" != typeof path) return !1;
    var extension = extname("x." + path).toLowerCase().substr(1);
    if (!extension) return !1;
    return exports.types[extension] || !1;
  }, exports.types = Object.create(null), extensions = exports.extensions, types = exports.types, 
  preference = [ "nginx", "apache", void 0, "iana" ], Object.keys(db).forEach((function(type) {
    var mime = db[type], exts = mime.extensions;
    if (exts && exts.length) {
      extensions[type] = exts;
      for (var i = 0; i < exts.length; i++) {
        var extension = exts[i];
        if (types[extension]) {
          var from = preference.indexOf(db[types[extension]].source), to = preference.indexOf(mime.source);
          if ("application/octet-stream" !== types[extension] && (from > to || from === to && "application/" === types[extension].substr(0, 12))) continue;
        }
        types[extension] = type;
      }
    }
  }));
}, function(module, exports) {
  module.exports = require("./vendor/mime-db.json");
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(value, options) {
    if ("string" == typeof value) return parse(value);
    if ("number" == typeof value) return format(value, options);
    return null;
  }, module.exports.format = format, module.exports.parse = parse;
  var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g, formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/, map = {
    b: 1,
    kb: 1024,
    mb: 1 << 20,
    gb: 1 << 30,
    tb: 1024 * (1 << 30)
  }, parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb)$/i;
  function format(value, options) {
    if (!Number.isFinite(value)) return null;
    var mag = Math.abs(value), thousandsSeparator = options && options.thousandsSeparator || "", unitSeparator = options && options.unitSeparator || "", decimalPlaces = options && void 0 !== options.decimalPlaces ? options.decimalPlaces : 2, fixedDecimals = Boolean(options && options.fixedDecimals), unit = options && options.unit || "";
    unit && map[unit.toLowerCase()] || (unit = mag >= map.tb ? "TB" : mag >= map.gb ? "GB" : mag >= map.mb ? "MB" : mag >= map.kb ? "KB" : "B");
    var str = (value / map[unit.toLowerCase()]).toFixed(decimalPlaces);
    return fixedDecimals || (str = str.replace(formatDecimalsRegExp, "$1")), thousandsSeparator && (str = str.replace(formatThousandsRegExp, thousandsSeparator)), 
    str + unitSeparator + unit;
  }
  function parse(val) {
    if ("number" == typeof val && !isNaN(val)) return val;
    if ("string" != typeof val) return null;
    var floatValue, results = parseRegExp.exec(val), unit = "b";
    return results ? (floatValue = parseFloat(results[1]), unit = results[4].toLowerCase()) : (floatValue = parseInt(val, 10), 
    unit = "b"), Math.floor(map[unit] * floatValue);
  }
}, , , , , , , , , , , , function(module, exports, __webpack_require__) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg), value = info.value;
    } catch (error) {
      return void reject(error);
    }
    info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise((function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      }));
    };
  }
  var http = __webpack_require__(13), https = __webpack_require__(14), path = __webpack_require__(0), fs = __webpack_require__(1), promisify = __webpack_require__(2).promisify || __webpack_require__(7), parse = __webpack_require__(8).parse, os = __webpack_require__(5), Ajv = __webpack_require__(33), checkForUpdate = __webpack_require__(34), chalk = __webpack_require__(17), arg = __webpack_require__(43), copy = __webpack_require__(44).write, handler = __webpack_require__(50), schema = __webpack_require__(66), boxen = __webpack_require__(67), compression = __webpack_require__(76), pkg = __webpack_require__(92), readFile = promisify(fs.readFile), compressionHandler = promisify(compression()), interfaces = os.networkInterfaces(), warning = message => chalk`{yellow WARNING:} ${message}`, info = message => chalk`{magenta INFO:} ${message}`, error = message => chalk`{red ERROR:} ${message}`, updateCheck = function() {
    var _ref = _asyncToGenerator((function*(isDebugging) {
      var update = null;
      try {
        update = yield checkForUpdate(pkg);
      } catch (err) {
        var suffix = isDebugging ? ":" : " (use `--debug` to see full error)";
        console.error(warning("Checking for updates failed" + suffix)), isDebugging && console.error(err);
      }
      update && console.log(`${chalk.bgRed("UPDATE AVAILABLE")} The latest version of \`serve\` is ${update.latest}`);
    }));
    return function(_x) {
      return _ref.apply(this, arguments);
    };
  }(), parseEndpoint = str => {
    if (!isNaN(str)) return [ str ];
    var url = parse(str);
    switch (url.protocol) {
     case "pipe:":
      var cutStr = str.replace(/^pipe:/, "");
      if ("\\\\.\\" !== cutStr.slice(0, 4)) throw new Error("Invalid Windows named pipe endpoint: " + str);
      return [ cutStr ];

     case "unix:":
      if (!url.pathname) throw new Error("Invalid UNIX domain socket endpoint: " + str);
      return [ url.pathname ];

     case "tcp:":
      return url.port = url.port || "5000", [ parseInt(url.port, 10), url.hostname ];

     default:
      throw new Error("Unknown --listen endpoint scheme (protocol): " + url.protocol);
    }
  }, registerShutdown = fn => {
    var run = !1, wrapper = () => {
      run || (run = !0, fn());
    };
    process.on("SIGINT", wrapper), process.on("SIGTERM", wrapper), process.on("exit", wrapper);
  }, startEndpoint = (endpoint, config, args, previous) => {
    var isTTY = process.stdout.isTTY, clipboard = !0 !== args["--no-clipboard"], compress = !0 !== args["--no-compression"], httpMode = args["--ssl-cert"] && args["--ssl-key"] ? "https" : "http", virtualPath = args["--virtual-path"] ? new RegExp(`^([^/]*//[^/]+)?/${args["--virtual-path"].replace(/[^\w\s]/g, "\\$&")}(/|$)`, "i") : null, serverHandler = function() {
      var _ref2 = _asyncToGenerator((function*(request, response) {
        return virtualPath && (request.url = request.url.replace(virtualPath, "$1/")), args["--cors"] && response.setHeader("Access-Control-Allow-Origin", "*"), 
        compress && (yield compressionHandler(request, response)), handler(request, response, config);
      }));
      return function(_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), server = "https" === httpMode ? https.createServer({
      key: fs.readFileSync(args["--ssl-key"]),
      cert: fs.readFileSync(args["--ssl-cert"])
    }, serverHandler) : http.createServer(serverHandler);
    server.on("error", err => {
      "EADDRINUSE" !== err.code || 1 !== endpoint.length || isNaN(endpoint[0]) ? (console.error(error("Failed to serve: " + err.stack)), 
      process.exit(1)) : startEndpoint([ 0 ], config, args, endpoint[0]);
    }), server.listen.apply(server, endpoint.concat([ _asyncToGenerator((function*() {
      var details = server.address();
      registerShutdown(() => server.close());
      var addressSuffix = args["--virtual-path"] ? "/" + args["--virtual-path"] : "", localAddress = null, networkAddress = null;
      if ("string" == typeof details) localAddress = details + addressSuffix; else if ("object" == typeof details && details.port) {
        var address = "::" === details.address ? "localhost" : details.address, ip = (() => {
          for (var name of Object.keys(interfaces)) for (var netInterface of interfaces[name]) {
            var address = netInterface.address, family = netInterface.family, internal = netInterface.internal;
            if ("IPv4" === family && !internal) return address;
          }
        })();
        localAddress = `${httpMode}://${address}:${details.port}${addressSuffix}`, networkAddress = `${httpMode}://${ip}:${details.port}${addressSuffix}`;
      }
      if (isTTY && "production" !== process.env.NODE_ENV) {
        var message = chalk.green("Serving!");
        if (localAddress) {
          var prefix = networkAddress ? "- " : "", space = networkAddress ? "            " : "  ";
          message += `\n\n${chalk.bold(prefix + "Local:")}${space}${localAddress}`;
        }
        if (networkAddress && (message += `\n${chalk.bold("- On Your Network:")}  ${networkAddress}`), 
        previous && (message += chalk.red(`\n\nThis port was picked because ${chalk.underline(previous)} is in use.`)), 
        clipboard) try {
          yield copy(localAddress), message += "\n\n" + chalk.grey("Copied local address to clipboard!");
        } catch (err) {
          console.error(error("Cannot copy to clipboard: " + err.message));
        }
        console.log(boxen(message, {
          padding: 1,
          borderColor: "green",
          margin: 1
        }));
      } else {
        var suffix = localAddress ? " at " + localAddress : "";
        console.log(info("Accepting connections" + suffix));
      }
    })) ]));
  }, loadConfig = function() {
    var _ref4 = _asyncToGenerator((function*(cwd, entry, args) {
      var files = [ "serve.json", "now.json", "package.json" ];
      args["--config"] && files.unshift(args["--config"]);
      var config = {};
      for (var file of files) {
        var location = path.resolve(entry, file), content = null;
        try {
          content = yield readFile(location, "utf8");
        } catch (err) {
          if ("ENOENT" === err.code) continue;
          console.error(error(`Not able to read ${location}: ${err.message}`)), process.exit(1);
        }
        try {
          content = JSON.parse(content);
        } catch (err) {
          console.error(error(`Could not parse ${location} as JSON: ${err.message}`)), process.exit(1);
        }
        if ("object" == typeof content) {
          try {
            switch (file) {
             case "now.json":
              content = content.static;
              break;

             case "package.json":
              content = content.now.static;
            }
          } catch (err) {
            continue;
          }
          Object.assign(config, content), console.log(info(`Discovered configuration in \`${file}\``)), 
          "now.json" !== file && "package.json" !== file || console.error(warning("The config files `now.json` and `package.json` are deprecated. Please use `serve.json`."));
          break;
        }
        console.error(warning(`Didn't find a valid object in ${location}. Skipping...`));
      }
      if (entry) {
        var publicDir = config.public;
        config.public = path.relative(cwd, publicDir ? path.resolve(entry, publicDir) : entry);
      }
      if (0 !== Object.keys(config).length) {
        var validateSchema = (new Ajv).compile(schema);
        if (!validateSchema(config)) {
          var defaultMessage = error("The configuration you provided is wrong:"), _validateSchema$error = validateSchema.errors[0], message = _validateSchema$error.message, params = _validateSchema$error.params;
          console.error(`${defaultMessage}\n${message}\n${JSON.stringify(params)}`), process.exit(1);
        }
      }
      return config.etag = !args["--no-etag"], config.virtualPath = args["--virtual-path"], 
      config;
    }));
    return function(_x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();
  _asyncToGenerator((function*() {
    var args = null;
    try {
      args = arg({
        "--help": Boolean,
        "--version": Boolean,
        "--listen": [ parseEndpoint ],
        "--virtual-path": String,
        "--single": Boolean,
        "--debug": Boolean,
        "--config": String,
        "--no-clipboard": Boolean,
        "--no-compression": Boolean,
        "--no-etag": Boolean,
        "--symlinks": Boolean,
        "--cors": Boolean,
        "--ssl-cert": String,
        "--ssl-key": String,
        "-h": "--help",
        "-v": "--version",
        "-l": "--listen",
        "-s": "--single",
        "-d": "--debug",
        "-c": "--config",
        "-n": "--no-clipboard",
        "-u": "--no-compression",
        "-S": "--symlinks",
        "-C": "--cors",
        "-p": "--listen"
      });
    } catch (err) {
      console.error(error(err.message)), process.exit(1);
    }
    if ("1" !== process.env.NO_UPDATE_CHECK && (yield updateCheck(args["--debug"])), 
    args["--version"]) console.log(pkg.version); else if (args["--help"]) console.log(chalk`
  {bold.cyan serve} - Static file serving and directory listing

  {bold USAGE}

      {bold $} {cyan serve} --help
      {bold $} {cyan serve} --version
      {bold $} {cyan serve} folder_name
      {bold $} {cyan serve} [-l {underline listen_uri} [-l ...]] [{underline directory}]

      By default, {cyan serve} will listen on {bold 0.0.0.0:5000} and serve the
      current working directory on that address.

      Specifying a single {bold --listen} argument will overwrite the default, not supplement it.

  {bold OPTIONS}

      --help                              Shows this help message

      -v, --version                       Displays the current version of serve

      -l, --listen {underline listen_uri}             Specify a URI endpoint on which to listen (see below) -
                                          more than one may be specified to listen in multiple places

      --virtual-path                      Virtual directory for the server

      -d, --debug                         Show debugging information

      -s, --single                        Rewrite all not-found requests to \`index.html\`

      -c, --config                        Specify custom path to \`serve.json\`

      -C, --cors                          Enable CORS, sets \`Access-Control-Allow-Origin\` to \`*\`

      -n, --no-clipboard                  Do not copy the local address to the clipboard

      -u, --no-compression                Do not compress files

      --no-etag                           Send \`Last-Modified\` header instead of \`ETag\`

      -S, --symlinks                      Resolve symlinks instead of showing 404 errors

      --ssl-cert                          Optional path to an SSL/TLS certificate to serve with HTTPS

      --ssl-key                           Optional path to the SSL/TLS certificate\'s private key

  {bold ENDPOINTS}

      Listen endpoints (specified by the {bold --listen} or {bold -l} options above) instruct {cyan serve}
      to listen on one or more interfaces/ports, UNIX domain sockets, or Windows named pipes.

      For TCP ports on hostname "localhost":

          {bold $} {cyan serve} -l {underline 1234}

      For TCP (traditional host/port) endpoints:

          {bold $} {cyan serve} -l tcp://{underline hostname}:{underline 1234}

      For UNIX domain socket endpoints:

          {bold $} {cyan serve} -l unix:{underline /path/to/socket.sock}

      For Windows named pipe endpoints:

          {bold $} {cyan serve} -l pipe:\\\\.\\pipe\\{underline PipeName}
`); else {
      args["--listen"] || (args["--listen"] = [ [ process.env.PORT || 5e3 ] ]), args["--virtual-path"] && (args["--virtual-path"] = args["--virtual-path"].replace(/^\/|\/$/g, "")), 
      args._.length > 1 && (console.error(error("Please provide one path argument at maximum")), 
      process.exit(1));
      var cwd = process.cwd(), entry = args._.length > 0 ? path.resolve(args._[0]) : cwd, config = yield loadConfig(cwd, entry, args);
      if (args["--single"]) {
        var rewrites = config.rewrites, existingRewrites = Array.isArray(rewrites) ? rewrites : [];
        config.rewrites = [ {
          source: "**",
          destination: "/index.html"
        } ].concat(existingRewrites);
      }
      for (var endpoint of (args["--symlinks"] && (config.symlinks = !0), args["--listen"])) startEndpoint(endpoint, config, args);
      registerShutdown(() => {
        console.log("\n" + info("Gracefully shutting down. Please wait...")), process.on("SIGINT", () => {
          console.log("\n" + warning("Force-closing all open sockets...")), process.exit(0);
        });
      });
    }
  }))();
}, function(module, exports) {
  module.exports = require("./vendor/ajv");
}, function(module, exports, __webpack_require__) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg), value = info.value;
    } catch (error) {
      return void reject(error);
    }
    info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise((function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      }));
    };
  }
  var URL = __webpack_require__(8).URL, join = __webpack_require__(0).join, fs = __webpack_require__(1), promisify = __webpack_require__(2).promisify || __webpack_require__(7), tmpdir = __webpack_require__(5).tmpdir, registryUrl = __webpack_require__(35), writeFile = promisify(fs.writeFile), mkdir = promisify(fs.mkdir), readFile = promisify(fs.readFile), getFile = function() {
    var _ref = _asyncToGenerator((function*(details, distTag) {
      var rootDir = tmpdir(), subDir = join(rootDir, "update-check");
      fs.existsSync(subDir) || mkdir(subDir);
      var name = `${details.name}-${distTag}.json`;
      return details.scope && (name = `${details.scope}-${name}`), join(subDir, name);
    }));
    return function(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), evaluateCache = function() {
    var _ref2 = _asyncToGenerator((function*(file, time, interval) {
      if (fs.existsSync(file)) {
        var content = yield readFile(file, "utf8"), _JSON$parse = JSON.parse(content), lastUpdate = _JSON$parse.lastUpdate, latest = _JSON$parse.latest;
        if (lastUpdate + interval > time) return {
          shouldCheck: !1,
          latest: latest
        };
      }
      return {
        shouldCheck: !0,
        latest: null
      };
    }));
    return function(_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }(), updateCache = function() {
    var _ref3 = _asyncToGenerator((function*(file, latest, lastUpdate) {
      var content = JSON.stringify({
        latest: latest,
        lastUpdate: lastUpdate
      });
      yield writeFile(file, content, "utf8");
    }));
    return function(_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }(), loadPackage = (url, authInfo) => new Promise((resolve, reject) => {
    var options = {
      host: url.hostname,
      path: url.pathname,
      port: url.port,
      headers: {
        accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*"
      },
      timeout: 2e3
    };
    authInfo && (options.headers.authorization = `${authInfo.type} ${authInfo.token}`), 
    (0, __webpack_require__("https:" === url.protocol ? 14 : 13).get)(options, response => {
      var statusCode = response.statusCode;
      if (200 !== statusCode) {
        var error = new Error("Request failed with code " + statusCode);
        return error.code = statusCode, reject(error), void response.resume();
      }
      var rawData = "";
      response.setEncoding("utf8"), response.on("data", chunk => {
        rawData += chunk;
      }), response.on("end", () => {
        try {
          var parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject).on("timeout", reject);
  }), getMostRecent = function() {
    var _ref5 = _asyncToGenerator((function*(_ref4, distTag) {
      var full = _ref4.full, scope = _ref4.scope, regURL = registryUrl(scope), url = new URL(full, regURL), spec = null;
      try {
        spec = yield loadPackage(url);
      } catch (err) {
        if (!err.code || !String(err.code).startsWith(4)) throw err;
        var authInfo = __webpack_require__(40)(regURL, {
          recursive: !0
        });
        spec = yield loadPackage(url, authInfo);
      }
      var version = spec["dist-tags"][distTag];
      if (!version) throw new Error(`Distribution tag ${distTag} is not available`);
      return version;
    }));
    return function(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(), defaultConfig = {
    interval: 36e5,
    distTag: "latest"
  };
  module.exports = function() {
    var _ref6 = _asyncToGenerator((function*(pkg, config) {
      if ("object" != typeof pkg) throw new Error("The first parameter should be your package.json file content");
      var shouldCheck, a, b, details = (name => {
        var value, spec = {
          full: (value = name, encodeURIComponent(value).replace(/^%40/, "@"))
        };
        if (name.includes("/")) {
          var parts = name.split("/");
          spec.scope = parts[0], spec.name = parts[1];
        } else spec.scope = null, spec.name = name;
        return spec;
      })(pkg.name), time = Date.now(), _Object$assign = Object.assign({}, defaultConfig, config), distTag = _Object$assign.distTag, interval = _Object$assign.interval, file = yield getFile(details, distTag), latest = null, _yield$evaluateCache = yield evaluateCache(file, time, interval);
      return shouldCheck = _yield$evaluateCache.shouldCheck, latest = _yield$evaluateCache.latest, 
      shouldCheck && (latest = yield getMostRecent(details, distTag), yield updateCache(file, latest, time)), 
      -1 === (a = pkg.version, b = latest, a.localeCompare(b, "en-US", {
        numeric: !0
      })) ? {
        latest: latest,
        fromCache: !shouldCheck
      } : null;
    }));
    return function(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(scope) {
    var rc = __webpack_require__(15)("npm", {
      registry: "https://registry.npmjs.org/"
    }), url = rc[scope + ":registry"] || rc.registry;
    return "/" === url.slice(-1) ? url : url + "/";
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var fs = __webpack_require__(1), ini = __webpack_require__(37), path = __webpack_require__(0), stripJsonComments = __webpack_require__(38), parse = exports.parse = function(content) {
    return /^\s*{/.test(content) ? JSON.parse(stripJsonComments(content)) : ini.parse(content);
  }, file = exports.file = function() {
    var args = [].slice.call(arguments).filter((function(arg) {
      return null != arg;
    }));
    for (var i in args) if ("string" != typeof args[i]) return;
    var file = path.join.apply(null, args);
    try {
      return fs.readFileSync(file, "utf-8");
    } catch (err) {
      return;
    }
  };
  exports.json = function() {
    var content = file.apply(null, arguments);
    return content ? parse(content) : null;
  }, exports.env = function(prefix, env) {
    env = env || process.env;
    var obj = {}, l = prefix.length;
    for (var k in env) if (0 === k.toLowerCase().indexOf(prefix.toLowerCase())) {
      for (var _emptyStringIndex, keypath = k.substring(l).split("__"); (_emptyStringIndex = keypath.indexOf("")) > -1; ) keypath.splice(_emptyStringIndex, 1);
      var cursor = obj;
      keypath.forEach((function(_subkey, i) {
        _subkey && "object" == typeof cursor && (i === keypath.length - 1 && (cursor[_subkey] = env[k]), 
        void 0 === cursor[_subkey] && (cursor[_subkey] = {}), cursor = cursor[_subkey]);
      }));
    }
    return obj;
  }, exports.find = function() {
    var rel = path.join.apply(null, [].slice.call(arguments));
    function find(start, rel) {
      var file = path.join(start, rel);
      try {
        return fs.statSync(file), file;
      } catch (err) {
        if (path.dirname(start) !== start) return find(path.dirname(start), rel);
      }
    }
    return find(process.cwd(), rel);
  };
}, function(module, exports) {
  exports.parse = exports.decode = function(str) {
    var out = {}, p = out, section = null, re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
    return str.split(/[\r\n]+/g).forEach((function(line, _, __) {
      if (line && !line.match(/^\s*[;#]/)) {
        var match = line.match(re);
        if (match) {
          if (void 0 !== match[1]) return section = unsafe(match[1]), void (p = out[section] = out[section] || {});
          var key = unsafe(match[2]), value = !match[3] || unsafe(match[4]);
          switch (value) {
           case "true":
           case "false":
           case "null":
            value = JSON.parse(value);
          }
          key.length > 2 && "[]" === key.slice(-2) && (key = key.substring(0, key.length - 2), 
          p[key] ? Array.isArray(p[key]) || (p[key] = [ p[key] ]) : p[key] = []), Array.isArray(p[key]) ? p[key].push(value) : p[key] = value;
        }
      }
    })), Object.keys(out).filter((function(k, _, __) {
      if (!out[k] || "object" != typeof out[k] || Array.isArray(out[k])) return !1;
      var parts = dotSplit(k), p = out, l = parts.pop(), nl = l.replace(/\\\./g, ".");
      return parts.forEach((function(part, _, __) {
        p[part] && "object" == typeof p[part] || (p[part] = {}), p = p[part];
      })), (p !== out || nl !== l) && (p[nl] = out[k], !0);
    })).forEach((function(del, _, __) {
      delete out[del];
    })), out;
  }, exports.unsafe = unsafe;
  "undefined" != typeof process && process.platform;
  function dotSplit(str) {
    return str.replace(/\1/g, "LITERAL\\1LITERAL").replace(/\\\./g, "").split(/\./).map((function(part) {
      return part.replace(/\1/g, "\\.").replace(/\2LITERAL\\1LITERAL\2/g, "");
    }));
  }
  function isQuoted(val) {
    return '"' === val.charAt(0) && '"' === val.slice(-1) || "'" === val.charAt(0) && "'" === val.slice(-1);
  }
  function unsafe(val, doUnesc) {
    if (!isQuoted(val = (val || "").trim())) {
      for (var esc = !1, unesc = "", i = 0, l = val.length; i < l; i++) {
        var c = val.charAt(i);
        if (esc) -1 !== "\\;#".indexOf(c) ? unesc += c : unesc += "\\" + c, esc = !1; else {
          if (-1 !== ";#".indexOf(c)) break;
          "\\" === c ? esc = !0 : unesc += c;
        }
      }
      return esc && (unesc += "\\"), unesc.trim();
    }
    "'" === val.charAt(0) && (val = val.substr(1, val.length - 2));
    try {
      val = JSON.parse(val);
    } catch (_) {}
    return val;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function stripWithoutWhitespace() {
    return "";
  }
  function stripWithWhitespace(str, start, end) {
    return str.slice(start, end).replace(/\S/g, " ");
  }
  module.exports = function(str, opts) {
    for (var currentChar, nextChar, insideString = !1, insideComment = !1, offset = 0, ret = "", strip = !1 === (opts = opts || {}).whitespace ? stripWithoutWhitespace : stripWithWhitespace, i = 0; i < str.length; i++) {
      if (currentChar = str[i], nextChar = str[i + 1], !insideComment && '"' === currentChar) "\\" === str[i - 1] && "\\" !== str[i - 2] || (insideString = !insideString);
      if (!insideString) if (insideComment || currentChar + nextChar !== "//") {
        if (1 === insideComment && currentChar + nextChar === "\r\n") {
          insideComment = !1, ret += strip(str, offset, ++i), offset = i;
          continue;
        }
        if (1 === insideComment && "\n" === currentChar) insideComment = !1, ret += strip(str, offset, i), 
        offset = i; else {
          if (!insideComment && currentChar + nextChar === "/*") {
            ret += str.slice(offset, i), offset = i, insideComment = 2, i++;
            continue;
          }
          if (2 === insideComment && currentChar + nextChar === "*/") {
            insideComment = !1, ret += strip(str, offset, ++i + 1), offset = i + 1;
            continue;
          }
        }
      } else ret += str.slice(offset, i), offset = i, insideComment = 1, i++;
    }
    return ret + (insideComment ? strip(str.substr(offset)) : str.substr(offset));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function isSpecificValue(val) {
    return val instanceof Buffer || val instanceof Date || val instanceof RegExp;
  }
  function cloneSpecificValue(val) {
    if (val instanceof Buffer) {
      var x = Buffer.alloc ? Buffer.alloc(val.length) : new Buffer(val.length);
      return val.copy(x), x;
    }
    if (val instanceof Date) return new Date(val.getTime());
    if (val instanceof RegExp) return new RegExp(val);
    throw new Error("Unexpected situation");
  }
  function deepCloneArray(arr) {
    var clone = [];
    return arr.forEach((function(item, index) {
      "object" == typeof item && null !== item ? Array.isArray(item) ? clone[index] = deepCloneArray(item) : isSpecificValue(item) ? clone[index] = cloneSpecificValue(item) : clone[index] = deepExtend({}, item) : clone[index] = item;
    })), clone;
  }
  function safeGetProperty(object, property) {
    return "__proto__" === property ? void 0 : object[property];
  }
  var deepExtend = module.exports = function() {
    if (arguments.length < 1 || "object" != typeof arguments[0]) return !1;
    if (arguments.length < 2) return arguments[0];
    var val, src, target = arguments[0], args = Array.prototype.slice.call(arguments, 1);
    return args.forEach((function(obj) {
      "object" != typeof obj || null === obj || Array.isArray(obj) || Object.keys(obj).forEach((function(key) {
        return src = safeGetProperty(target, key), (val = safeGetProperty(obj, key)) === target ? void 0 : "object" != typeof val || null === val ? void (target[key] = val) : Array.isArray(val) ? void (target[key] = deepCloneArray(val)) : isSpecificValue(val) ? void (target[key] = cloneSpecificValue(val)) : "object" != typeof src || null === src || Array.isArray(src) ? void (target[key] = deepExtend({}, val)) : void (target[key] = deepExtend(src, val));
      }));
    })), target;
  };
}, function(module, exports, __webpack_require__) {
  var url = __webpack_require__(8), base64 = __webpack_require__(41), decodeBase64 = base64.decodeBase64, encodeBase64 = base64.encodeBase64;
  function getRegistryAuthInfo(checkUrl, options) {
    for (var pathname, path, parsed = url.parse(checkUrl, !1, !0); "/" !== pathname && parsed.pathname !== pathname; ) {
      pathname = parsed.pathname || "/";
      var authInfo = getAuthInfoForUrl("//" + parsed.host + pathname.replace(/\/$/, ""), options.npmrc);
      if (authInfo) return authInfo;
      if (!options.recursive) return /\/$/.test(checkUrl) ? void 0 : getRegistryAuthInfo(url.resolve(checkUrl, "."), options);
      parsed.pathname = url.resolve("/" === (path = pathname)[path.length - 1] ? path : path + "/", "..") || "/";
    }
  }
  function getLegacyAuthInfo(npmrc) {
    if (npmrc._auth) return {
      token: npmrc._auth,
      type: "Basic"
    };
  }
  function getAuthInfoForUrl(regUrl, npmrc) {
    var bearerAuth = function(tok) {
      if (!tok) return;
      return {
        token: tok.replace(/^\$\{?([^}]*)\}?$/, (function(fullMatch, envVar) {
          return process.env[envVar];
        })),
        type: "Bearer"
      };
    }(npmrc[regUrl + ":_authToken"] || npmrc[regUrl + "/:_authToken"]);
    if (bearerAuth) return bearerAuth;
    var basicAuth = function(username, password) {
      if (!username || !password) return;
      var pass = decodeBase64(password.replace(/^\$\{?([^}]*)\}?$/, (function(fullMatch, envVar) {
        return process.env[envVar];
      })));
      return {
        token: encodeBase64(username + ":" + pass),
        type: "Basic",
        password: pass,
        username: username
      };
    }(npmrc[regUrl + ":username"] || npmrc[regUrl + "/:username"], npmrc[regUrl + ":_password"] || npmrc[regUrl + "/:_password"]);
    return basicAuth || void 0;
  }
  module.exports = function() {
    var checkUrl, options;
    return arguments.length >= 2 ? (checkUrl = arguments[0], options = arguments[1]) : "string" == typeof arguments[0] ? checkUrl = arguments[0] : options = arguments[0], 
    (options = options || {}).npmrc = options.npmrc || __webpack_require__(15)("npm", {
      registry: "https://registry.npmjs.org/"
    }), getRegistryAuthInfo(checkUrl = checkUrl || options.npmrc.registry, options) || getLegacyAuthInfo(options.npmrc);
  };
}, function(module, exports, __webpack_require__) {
  var safeBuffer = __webpack_require__(16).Buffer;
  module.exports = {
    decodeBase64: function(base64) {
      return safeBuffer.from(base64, "base64").toString("utf8");
    },
    encodeBase64: function(string) {
      return safeBuffer.from(string, "utf8").toString("base64");
    }
  };
}, function(module, exports) {
  module.exports = require("buffer");
}, function(module, exports) {
  module.exports = function(opts, _temp) {
    var _ref = void 0 === _temp ? {} : _temp, argv = _ref.argv, _ref$permissive = _ref.permissive, permissive = void 0 !== _ref$permissive && _ref$permissive;
    if (!opts) throw new Error("Argument specification must be specified");
    var result = {
      _: []
    };
    argv = argv || process.argv.slice(2);
    var aliases = {}, handlers = {};
    for (var key of Object.keys(opts)) if ("string" != typeof opts[key]) {
      var type = opts[key];
      if (!type || "function" != typeof type && (!Array.isArray(type) || 1 !== type.length || "function" != typeof type[0])) throw new Error("Type missing or not a function or valid array type: " + key);
      handlers[key] = type;
    } else aliases[key] = opts[key];
    for (var i = 0, len = argv.length; i < len; i++) {
      var _arg = argv[i];
      if (_arg.length < 2) result._.push(_arg); else {
        if ("--" === _arg) {
          result._ = result._.concat(argv.slice(i + 1));
          break;
        }
        if ("-" === _arg[0]) {
          for (var _ref2 = "-" === _arg[1] ? _arg.split("=", 2) : [ _arg, void 0 ], originalArgName = _ref2[0], argStr = _ref2[1], argName = originalArgName; argName in aliases; ) argName = aliases[argName];
          if (!(argName in handlers)) {
            if (permissive) {
              result._.push(_arg);
              continue;
            }
            throw new Error("Unknown or unexpected option: " + originalArgName);
          }
          var _ref3 = Array.isArray(handlers[argName]) ? [ handlers[argName][0], !0 ] : [ handlers[argName], !1 ], _type = _ref3[0], isArray = _ref3[1], value = void 0;
          if (_type === Boolean) value = !0; else if (void 0 === argStr) {
            if (argv.length < i + 2 || argv[i + 1].length > 1 && "-" === argv[i + 1][0]) throw new Error(`Option requires argument: ${originalArgName}${originalArgName === argName ? "" : ` (alias for ${argName})`}`);
            value = _type(argv[i + 1], argName, result[argName]), ++i;
          } else value = _type(argStr, argName, result[argName]);
          isArray ? result[argName] ? result[argName].push(value) : result[argName] = [ value ] : result[argName] = value;
        } else result._.push(_arg);
      }
    }
    return result;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var termux = __webpack_require__(45), linux = __webpack_require__(46), macos = __webpack_require__(47), windows = __webpack_require__(48);
  function platform() {
    switch (process.platform) {
     case "darwin":
      return macos;

     case "win32":
      return windows;

     case "android":
      if ("/data/data/com.termux/files/usr" !== process.env.PREFIX) throw new Error("You need to install Termux for this module to work on Android: https://termux.com");
      return termux;

     default:
      return linux;
    }
  }
  exports.write = input => "string" != typeof input ? Promise.reject(new TypeError("Expected a string, got " + typeof input)) : platform().copy({
    input: input
  }).then(() => {}), exports.read = () => platform().paste({
    stripEof: !1
  }), exports.writeSync = input => {
    if ("string" != typeof input) throw new TypeError("Expected a string, got " + typeof input);
    platform().copySync({
      input: input
    });
  }, exports.readSync = () => platform().pasteSync({
    stripEof: !1
  }).stdout;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var execa = __webpack_require__(4), handler = err => {
    if ("ENOENT" === err.code) throw new Error("Couldn't find the termux-api scripts. You can install them with: apt install termux-api");
    throw err;
  };
  module.exports = {
    copy: opts => execa("termux-clipboard-set", opts).catch(handler),
    paste: opts => execa.stdout("termux-clipboard-get", opts).catch(handler),
    copySync: opts => {
      try {
        return execa.sync("termux-clipboard-set", opts);
      } catch (err) {
        handler(err);
      }
    },
    pasteSync: opts => {
      try {
        return execa.sync("termux-clipboard-get", opts);
      } catch (err) {
        handler(err);
      }
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(0), execa = __webpack_require__(4), handler = err => {
    if ("ENOENT" === err.code) throw new Error("Couldn't find the required `xsel` binary. On Debian/Ubuntu you can install it with: sudo apt install xsel");
    throw err;
  }, xsel = path.join(__dirname, "vendor/linux/xsel");
  module.exports = {
    copy: opts => execa(xsel, [ "--clipboard", "--input" ], opts).catch(() => execa("xsel", [ "--clipboard", "--input" ], opts)).catch(handler),
    paste: opts => execa.stdout(xsel, [ "--clipboard", "--output" ], opts).catch(() => execa.stdout("xsel", [ "--clipboard", "--output" ], opts)).catch(handler),
    copySync: opts => {
      try {
        return execa.sync(xsel, [ "--clipboard", "--input" ], opts);
      } catch (err) {
        try {
          return execa.sync("xsel", [ "--clipboard", "--input" ], opts);
        } catch (err) {
          handler(err);
        }
      }
    },
    pasteSync: opts => {
      try {
        return execa.sync(xsel, [ "--clipboard", "--output" ], opts);
      } catch (err) {
        try {
          return execa.sync("xsel", [ "--clipboard", "--output" ], opts);
        } catch (err) {
          handler(err);
        }
      }
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var execa = __webpack_require__(4), env = Object.assign({}, process.env, {
    LC_CTYPE: "UTF-8"
  });
  module.exports = {
    copy: opts => execa("pbcopy", Object.assign({}, opts, {
      env: env
    })),
    paste: opts => execa.stdout("pbpaste", Object.assign({}, opts, {
      env: env
    })),
    copySync: opts => execa.sync("pbcopy", Object.assign({}, opts, {
      env: env
    })),
    pasteSync: opts => execa.sync("pbpaste", Object.assign({}, opts, {
      env: env
    }))
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(0), execa = __webpack_require__(4), winBinPath = "x64" === __webpack_require__(49)() ? path.join(__dirname, "vendor/windows/clipboard_x86_64.exe") : path.join(__dirname, "vendor/windows/clipboard_i686.exe");
  module.exports = {
    copy: opts => execa(winBinPath, [ "--copy" ], opts),
    paste: opts => execa.stdout(winBinPath, [ "--paste" ], opts),
    copySync: opts => execa.sync(winBinPath, [ "--copy" ], opts),
    pasteSync: opts => execa.sync(winBinPath, [ "--paste" ], opts)
  };
}, function(module, exports, __webpack_require__) {
  var cp = __webpack_require__(6), fs = __webpack_require__(1), path = __webpack_require__(0);
  module.exports = function() {
    if ("x64" === process.arch) return "x64";
    if ("darwin" === process.platform) return "x64";
    if ("win32" === process.platform) {
      var useEnv = !1;
      try {
        useEnv = !(!process.env.SYSTEMROOT || !fs.statSync(process.env.SYSTEMROOT));
      } catch (err) {}
      var sysRoot = useEnv ? process.env.SYSTEMROOT : "C:\\Windows", isWOW64 = !1;
      try {
        isWOW64 = !!fs.statSync(path.join(sysRoot, "sysnative"));
      } catch (err) {}
      return isWOW64 ? "x64" : "x86";
    }
    return "linux" === process.platform && "64\n" === cp.execSync("getconf LONG_BIT", {
      encoding: "utf8"
    }) ? "x64" : "x86";
  };
}, function(module, exports, __webpack_require__) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg), value = info.value;
    } catch (error) {
      return void reject(error);
    }
    info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise((function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      }));
    };
  }
  var promisify = __webpack_require__(2).promisify || __webpack_require__(7), path = __webpack_require__(0), createHash = __webpack_require__(51).createHash, _require2 = __webpack_require__(1), realpath = _require2.realpath, lstat = _require2.lstat, createReadStream = _require2.createReadStream, readdir = _require2.readdir, url = __webpack_require__(52), slasher = __webpack_require__(55), minimatch = __webpack_require__(56), pathToRegExp = __webpack_require__(60), mime = __webpack_require__(18), bytes = __webpack_require__(20), contentDisposition = __webpack_require__(61), isPathInside = __webpack_require__(62), parseRange = __webpack_require__(63), directoryTemplate = __webpack_require__(64), errorTemplate = __webpack_require__(65), etags = new Map, sourceMatches = (source, requestPath, allowSegments) => {
    var keys = [], slashed = slasher(source), resolvedPath = path.posix.resolve(requestPath), results = null;
    if (allowSegments) {
      var normalized = slashed.replace("*", "(.*)");
      (results = pathToRegExp(normalized, keys).exec(resolvedPath)) || (keys.length = 0);
    }
    return results || minimatch(resolvedPath, slashed) ? {
      keys: keys,
      results: results
    } : null;
  }, toTarget = (source, destination, previousPath) => {
    var matches = sourceMatches(source, previousPath, !0);
    if (!matches) return null;
    for (var keys = matches.keys, results = matches.results, props = {}, normalizedDest = url.parse(destination).protocol ? destination : slasher(destination), toPath = pathToRegExp.compile(normalizedDest), index = 0; index < keys.length; index++) {
      props[keys[index].name] = results[index + 1];
    }
    return toPath(props);
  }, applyRewrites = function(requestPath, rewrites, repetitive) {
    void 0 === rewrites && (rewrites = []);
    var rewritesCopy = rewrites.slice(), fallback = repetitive ? requestPath : null;
    if (0 === rewritesCopy.length) return fallback;
    for (var index = 0; index < rewritesCopy.length; index++) {
      var _rewrites$index = rewrites[index], source = _rewrites$index.source, destination = _rewrites$index.destination, target = toTarget(source, destination, requestPath);
      if (target) return rewritesCopy.splice(index, 1), applyRewrites(slasher(target), rewritesCopy, !0);
    }
    return fallback;
  }, ensureSlashStart = target => target.startsWith("/") ? target : "/" + target, appendHeaders = (target, source) => {
    for (var index = 0; index < source.length; index++) {
      var _source$index = source[index], key = _source$index.key, value = _source$index.value;
      target[key] = value;
    }
  }, getHeaders = function() {
    var _ref2 = _asyncToGenerator((function*(handlers, config, current, absolutePath, stats) {
      var _config$headers = config.headers, customHeaders = void 0 === _config$headers ? [] : _config$headers, _config$etag = config.etag, etag = void 0 !== _config$etag && _config$etag, related = {}, base = path.parse(absolutePath).base, relativePath = path.relative(current, absolutePath);
      if (customHeaders.length > 0) for (var index = 0; index < customHeaders.length; index++) {
        var _customHeaders$index = customHeaders[index], source = _customHeaders$index.source, _headers = _customHeaders$index.headers;
        sourceMatches(source, slasher(relativePath)) && appendHeaders(related, _headers);
      }
      var defaultHeaders = {};
      if (stats) {
        if (defaultHeaders = {
          "Content-Length": stats.size,
          "Content-Disposition": contentDisposition(base, {
            type: "inline"
          }),
          "Accept-Ranges": "bytes"
        }, etag) {
          var _ref3 = etags.get(absolutePath) || [], mtime = _ref3[0], sha = _ref3[1];
          Number(mtime) !== Number(stats.mtime) && (sha = yield ((handlers, absolutePath) => new Promise((resolve, reject) => {
            var hash = createHash("sha1");
            hash.update(path.extname(absolutePath)), hash.update("-");
            var rs = handlers.createReadStream(absolutePath);
            rs.on("error", reject), rs.on("data", buf => hash.update(buf)), rs.on("end", () => {
              var sha = hash.digest("hex");
              resolve(sha);
            });
          }))(handlers, absolutePath), etags.set(absolutePath, [ stats.mtime, sha ])), defaultHeaders.ETag = `"${sha}"`;
        } else defaultHeaders["Last-Modified"] = stats.mtime.toUTCString();
        var contentType = mime.contentType(base);
        contentType && (defaultHeaders["Content-Type"] = contentType);
      }
      var headers = Object.assign(defaultHeaders, related);
      for (var key in headers) headers.hasOwnProperty(key) && null === headers[key] && delete headers[key];
      return headers;
    }));
    return function(_x, _x2, _x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }(), applicable = (decodedPath, configEntry) => {
    if ("boolean" == typeof configEntry) return configEntry;
    if (Array.isArray(configEntry)) {
      for (var index = 0; index < configEntry.length; index++) {
        var source = configEntry[index];
        if (sourceMatches(source, decodedPath)) return !0;
      }
      return !1;
    }
    return !0;
  }, findRelated = function() {
    var _ref4 = _asyncToGenerator((function*(current, relativePath, rewrittenPath, originalStat) {
      for (var possible = rewrittenPath ? [ rewrittenPath ] : ((relativePath, extension) => [ path.join(relativePath, "index" + extension), relativePath.endsWith("/") ? relativePath.replace(/\/$/g, extension) : relativePath + extension ].filter(item => path.basename(item) !== extension))(relativePath, ".html"), stats = null, index = 0; index < possible.length; index++) {
        var related = possible[index], absolutePath = path.join(current, related);
        try {
          stats = yield originalStat(absolutePath);
        } catch (err) {
          if ("ENOENT" !== err.code && "ENOTDIR" !== err.code) throw err;
        }
        if (stats) return {
          stats: stats,
          absolutePath: absolutePath
        };
      }
      return null;
    }));
    return function(_x6, _x7, _x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }(), canBeListed = (excluded, file) => {
    for (var slashed = slasher(file), whether = !0, mark = 0; mark < excluded.length; mark++) {
      var source = excluded[mark];
      if (sourceMatches(source, slashed)) {
        whether = !1;
        break;
      }
    }
    return whether;
  }, renderDirectory = function() {
    var _ref5 = _asyncToGenerator((function*(current, acceptsJSON, handlers, methods, config, paths) {
      var directoryListing = config.directoryListing, trailingSlash = config.trailingSlash, _config$unlisted = config.unlisted, unlisted = void 0 === _config$unlisted ? [] : _config$unlisted, renderSingle = config.renderSingle, slashSuffix = "boolean" == typeof trailingSlash ? trailingSlash ? "/" : "" : "/", relativePath = paths.relativePath, absolutePath = paths.absolutePath, excluded = [ ".DS_Store", ".git" ].concat(unlisted);
      if (!applicable(relativePath, directoryListing) && !renderSingle) return {};
      for (var files = yield handlers.readdir(absolutePath), canRenderSingle = renderSingle && 1 === files.length, index = 0; index < files.length; index++) {
        var file = files[index], filePath = path.resolve(absolutePath, file), details = path.parse(filePath), stats = null;
        if (stats = methods.lstat ? yield handlers.lstat(filePath, !0) : yield handlers.lstat(filePath), 
        details.relative = path.join(config.virtualPath ? "/" + config.virtualPath : "", relativePath, details.base), 
        stats.isDirectory()) details.base += slashSuffix, details.relative += slashSuffix, 
        details.type = "folder"; else {
          if (canRenderSingle) return {
            singleFile: !0,
            absolutePath: filePath,
            stats: stats
          };
          details.ext = details.ext.split(".")[1] || "txt", details.type = "file", details.size = bytes(stats.size, {
            unitSeparator: " ",
            decimalPlaces: 0
          });
        }
        details.title = details.base, canBeListed(excluded, file) ? files[index] = details : delete files[index];
      }
      var toRoot = path.relative(current, absolutePath), directory = path.join(path.basename(current), toRoot, slashSuffix), pathParts = directory.split(path.sep).filter(Boolean);
      if (files = files.sort((a, b) => {
        var aIsDir = "directory" === a.type, bIsDir = "directory" === b.type;
        return aIsDir && !bIsDir ? -1 : bIsDir && !aIsDir || a.base > b.base ? 1 : a.base < b.base ? -1 : 0;
      }).filter(Boolean), toRoot.length > 0) {
        var directoryPath = [].concat(pathParts).slice(1), relative = path.join.apply(path, [ "/" + (config.virtualPath || "") ].concat(directoryPath, [ "..", slashSuffix ]));
        files.unshift({
          type: "directory",
          base: "..",
          relative: relative,
          title: relative,
          ext: ""
        });
      }
      for (var subPaths = [], _index = 0; _index < pathParts.length; _index++) {
        for (var parents = [], isLast = _index === pathParts.length - 1, before = 0; before <= _index; ) parents.push(pathParts[before]), 
        before++;
        parents.shift(), subPaths.push({
          name: pathParts[_index] + (isLast ? slashSuffix : "/"),
          url: (config.virtualPath ? config.virtualPath + "/" : "") + (0 === _index ? "" : parents.join("/") + slashSuffix)
        });
      }
      var spec = {
        files: files,
        directory: directory,
        paths: subPaths
      };
      return {
        directory: acceptsJSON ? JSON.stringify(spec) : directoryTemplate(spec)
      };
    }));
    return function(_x10, _x11, _x12, _x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }(), sendError = function() {
    var _ref6 = _asyncToGenerator((function*(absolutePath, response, acceptsJSON, current, handlers, config, spec) {
      var original = spec.err, message = spec.message, code = spec.code, statusCode = spec.statusCode;
      if (original && "test" !== process.env.NODE_ENV && console.error(original), response.statusCode = statusCode, 
      acceptsJSON) return response.setHeader("Content-Type", "application/json; charset=utf-8"), 
      void response.end(JSON.stringify({
        error: {
          code: code,
          message: message
        }
      }));
      var stats = null, errorPage = path.join(current, statusCode + ".html");
      try {
        stats = yield handlers.lstat(errorPage);
      } catch (err) {
        "ENOENT" !== err.code && console.error(err);
      }
      if (stats) {
        var stream = null;
        try {
          stream = yield handlers.createReadStream(errorPage);
          var _headers2 = yield getHeaders(handlers, config, current, errorPage, stats);
          return response.writeHead(statusCode, _headers2), void stream.pipe(response);
        } catch (err) {
          console.error(err);
        }
      }
      var headers = yield getHeaders(handlers, config, current, absolutePath, null);
      headers["Content-Type"] = "text/html; charset=utf-8", response.writeHead(statusCode, headers), 
      response.end(errorTemplate({
        statusCode: statusCode,
        message: message
      }));
    }));
    return function(_x16, _x17, _x18, _x19, _x20, _x21, _x22) {
      return _ref6.apply(this, arguments);
    };
  }(), internalError = function() {
    var _ref7 = _asyncToGenerator((function*() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      var lastIndex = args.length - 1, err = args[lastIndex];
      return args[lastIndex] = {
        statusCode: 500,
        code: "internal_server_error",
        message: "A server error has occurred",
        err: err
      }, sendError.apply(void 0, args);
    }));
    return function() {
      return _ref7.apply(this, arguments);
    };
  }();
  module.exports = function() {
    var _ref8 = _asyncToGenerator((function*(request, response, config, methods) {
      void 0 === config && (config = {}), void 0 === methods && (methods = {});
      var cwd = process.cwd(), current = config.public ? path.resolve(cwd, config.public) : cwd, handlers = (methods => Object.assign({
        lstat: promisify(lstat),
        realpath: promisify(realpath),
        createReadStream: createReadStream,
        readdir: promisify(readdir),
        sendError: sendError
      }, methods))(methods), relativePath = null, acceptsJSON = null;
      request.headers.accept && (acceptsJSON = request.headers.accept.includes("application/json"));
      try {
        relativePath = decodeURIComponent(url.parse(request.url).pathname);
      } catch (err) {
        return sendError("/", response, acceptsJSON, current, handlers, config, {
          statusCode: 400,
          code: "bad_request",
          message: "Bad Request"
        });
      }
      var absolutePath = path.join(current, relativePath);
      if (!isPathInside(absolutePath, current)) return sendError(absolutePath, response, acceptsJSON, current, handlers, config, {
        statusCode: 400,
        code: "bad_request",
        message: "Bad Request"
      });
      var cleanUrl = applicable(relativePath, config.cleanUrls), redirect = ((decodedPath, _ref, cleanUrl) => {
        var _ref$redirects = _ref.redirects, redirects = void 0 === _ref$redirects ? [] : _ref$redirects, trailingSlash = _ref.trailingSlash, slashing = "boolean" == typeof trailingSlash, matchHTML = /(\.html|\/index)$/g;
        if (0 === redirects.length && !slashing && !cleanUrl) return null;
        if (cleanUrl && matchHTML.test(decodedPath)) return (decodedPath = decodedPath.replace(matchHTML, "")).indexOf("//") > -1 && (decodedPath = decodedPath.replace(/\/+/g, "/")), 
        {
          target: ensureSlashStart(decodedPath),
          statusCode: 301
        };
        if (slashing) {
          var _path$parse = path.parse(decodedPath), ext = _path$parse.ext, name = _path$parse.name, isTrailed = decodedPath.endsWith("/"), isDotfile = name.startsWith("."), target = null;
          if (!trailingSlash && isTrailed ? target = decodedPath.slice(0, -1) : !trailingSlash || isTrailed || ext || isDotfile || (target = decodedPath + "/"), 
          decodedPath.indexOf("//") > -1 && (target = decodedPath.replace(/\/+/g, "/")), target) return {
            target: ensureSlashStart(target),
            statusCode: 301
          };
        }
        for (var index = 0; index < redirects.length; index++) {
          var _redirects$index = redirects[index], source = _redirects$index.source, destination = _redirects$index.destination, type = _redirects$index.type, _target = toTarget(source, destination, decodedPath);
          if (_target) return {
            target: _target,
            statusCode: type || 301
          };
        }
        return null;
      })(relativePath, config, cleanUrl);
      if (redirect) return response.writeHead(redirect.statusCode, {
        Location: encodeURI(redirect.target)
      }), void response.end();
      var stats = null;
      if ("" !== path.extname(relativePath)) try {
        stats = yield handlers.lstat(absolutePath);
      } catch (err) {
        if ("ENOENT" !== err.code && "ENOTDIR" !== err.code) return internalError(absolutePath, response, acceptsJSON, current, handlers, config, err);
      }
      var rewrittenPath = applyRewrites(relativePath, config.rewrites);
      if (!stats && (cleanUrl || rewrittenPath)) try {
        var related = yield findRelated(current, relativePath, rewrittenPath, handlers.lstat);
        related && (stats = related.stats, absolutePath = related.absolutePath);
      } catch (err) {
        if ("ENOENT" !== err.code && "ENOTDIR" !== err.code) return internalError(absolutePath, response, acceptsJSON, current, handlers, config, err);
      }
      if (!stats) try {
        stats = yield handlers.lstat(absolutePath);
      } catch (err) {
        if ("ENOENT" !== err.code && "ENOTDIR" !== err.code) return internalError(absolutePath, response, acceptsJSON, current, handlers, config, err);
      }
      if (stats && stats.isDirectory()) {
        var directory = null, singleFile = null;
        try {
          var _related = yield renderDirectory(current, acceptsJSON, handlers, methods, config, {
            relativePath: relativePath,
            absolutePath: absolutePath
          });
          _related.singleFile ? (stats = _related.stats, absolutePath = _related.absolutePath, 
          singleFile = _related.singleFile) : directory = _related.directory;
        } catch (err) {
          if ("ENOENT" !== err.code) return internalError(absolutePath, response, acceptsJSON, current, handlers, config, err);
        }
        if (directory) {
          var contentType = acceptsJSON ? "application/json; charset=utf-8" : "text/html; charset=utf-8";
          return response.statusCode = 200, response.setHeader("Content-Type", contentType), 
          void response.end(directory);
        }
        singleFile || (stats = null);
      }
      var isSymLink = stats && stats.isSymbolicLink();
      if (!stats || !config.symlinks && isSymLink) return handlers.sendError(absolutePath, response, acceptsJSON, current, handlers, config, {
        statusCode: 404,
        code: "not_found",
        message: "The requested path could not be found"
      });
      isSymLink && (absolutePath = yield handlers.realpath(absolutePath), stats = yield handlers.lstat(absolutePath));
      var streamOpts = {};
      if (request.headers.range && stats.size) {
        var range = parseRange(stats.size, request.headers.range);
        if ("object" == typeof range && "bytes" === range.type) {
          var _range$ = range[0], start = _range$.start, end = _range$.end;
          streamOpts.start = start, streamOpts.end = end, response.statusCode = 206;
        } else response.statusCode = 416, response.setHeader("Content-Range", "bytes */" + stats.size);
      }
      var stream = null;
      try {
        stream = yield handlers.createReadStream(absolutePath, streamOpts);
      } catch (err) {
        return internalError(absolutePath, response, acceptsJSON, current, handlers, config, err);
      }
      var headers = yield getHeaders(handlers, config, current, absolutePath, stats);
      if (void 0 !== streamOpts.start && void 0 !== streamOpts.end && (headers["Content-Range"] = `bytes ${streamOpts.start}-${streamOpts.end}/${stats.size}`, 
      headers["Content-Length"] = streamOpts.end - streamOpts.start + 1), null == request.headers.range && headers.ETag && headers.ETag === request.headers["if-none-match"]) return response.statusCode = 304, 
      void response.end();
      response.writeHead(response.statusCode || 200, headers), stream.pipe(response);
    }));
    return function(_x23, _x24, _x25, _x26) {
      return _ref8.apply(this, arguments);
    };
  }();
}, function(module, exports) {
  module.exports = require("crypto");
}, function(module, exports, __webpack_require__) {
  "use strict";
  function Url() {
    this._protocol = null, this._href = "", this._port = -1, this._query = null, this.auth = null, 
    this.slashes = null, this.host = null, this.hostname = null, this.hash = null, this.search = null, 
    this.pathname = null, this._prependSlash = !1;
  }
  var querystring = __webpack_require__(53);
  Url.queryString = querystring, Url.prototype.parse = function(str, parseQueryString, hostDenotesSlash, disableAutoEscapeChars) {
    if ("string" != typeof str) throw new TypeError("Parameter 'url' must be a string, not " + typeof str);
    for (var start = 0, end = str.length - 1; str.charCodeAt(start) <= 32; ) start++;
    for (;str.charCodeAt(end) <= 32; ) end--;
    if (start = this._parseProtocol(str, start, end), "javascript" !== this._protocol) {
      start = this._parseHost(str, start, end, hostDenotesSlash);
      var proto = this._protocol;
      !this.hostname && (this.slashes || proto && !slashProtocols[proto]) && (this.hostname = this.host = "");
    }
    if (start <= end) {
      var ch = str.charCodeAt(start);
      47 === ch || 92 === ch ? this._parsePath(str, start, end, disableAutoEscapeChars) : 63 === ch ? this._parseQuery(str, start, end, disableAutoEscapeChars) : 35 === ch ? this._parseHash(str, start, end, disableAutoEscapeChars) : "javascript" !== this._protocol ? this._parsePath(str, start, end, disableAutoEscapeChars) : this.pathname = str.slice(start, end + 1);
    }
    if (!this.pathname && this.hostname && this._slashProtocols[this._protocol] && (this.pathname = "/"), 
    parseQueryString) {
      var search = this.search;
      null == search && (search = this.search = ""), 63 === search.charCodeAt(0) && (search = search.slice(1)), 
      this.query = Url.queryString.parse(search);
    }
  }, Url.prototype.resolve = function(relative) {
    return this.resolveObject(Url.parse(relative, !1, !0)).format();
  }, Url.prototype.format = function() {
    var auth = this.auth || "";
    auth && (auth = (auth = encodeURIComponent(auth)).replace(/%3A/i, ":"), auth += "@");
    var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", search = this.search || "", query = "", hostname = this.hostname || "", port = this.port || "", host = !1, scheme = "", q = this.query;
    if (q && "object" == typeof q && (query = Url.queryString.stringify(q)), search || (search = query ? "?" + query : ""), 
    protocol && 58 !== protocol.charCodeAt(protocol.length - 1) && (protocol += ":"), 
    this.host) host = auth + this.host; else if (hostname) {
      hostname.indexOf(":") > -1 && (hostname = "[" + hostname + "]"), host = auth + hostname + (port ? ":" + port : "");
    }
    var slashes = this.slashes || (!protocol || slashProtocols[protocol]) && !1 !== host;
    return protocol ? scheme = protocol + (slashes ? "//" : "") : slashes && (scheme = "//"), 
    slashes && pathname && 47 !== pathname.charCodeAt(0) && (pathname = "/" + pathname), 
    search && 63 !== search.charCodeAt(0) && (search = "?" + search), hash && 35 !== hash.charCodeAt(0) && (hash = "#" + hash), 
    scheme + (!1 === host ? "" : host) + (pathname = escapePathName(pathname)) + (search = escapeSearch(search)) + hash;
  }, Url.prototype.resolveObject = function(relative) {
    "string" == typeof relative && (relative = Url.parse(relative, !1, !0));
    var result = this._clone();
    if (result.hash = relative.hash, !relative.href) return result._href = "", result;
    if (relative.slashes && !relative._protocol) return relative._copyPropsTo(result, !0), 
    slashProtocols[result._protocol] && result.hostname && !result.pathname && (result.pathname = "/"), 
    result._href = "", result;
    if (relative._protocol && relative._protocol !== result._protocol) {
      if (!slashProtocols[relative._protocol]) return relative._copyPropsTo(result, !1), 
      result._href = "", result;
      if (result._protocol = relative._protocol, relative.host || "javascript" === relative._protocol) result.pathname = relative.pathname; else {
        for (var relPath = (relative.pathname || "").split("/"); relPath.length && !(relative.host = relPath.shift()); ) ;
        relative.host || (relative.host = ""), relative.hostname || (relative.hostname = ""), 
        "" !== relPath[0] && relPath.unshift(""), relPath.length < 2 && relPath.unshift(""), 
        result.pathname = relPath.join("/");
      }
      return result.search = relative.search, result.host = relative.host || "", result.auth = relative.auth, 
      result.hostname = relative.hostname || relative.host, result._port = relative._port, 
      result.slashes = result.slashes || relative.slashes, result._href = "", result;
    }
    var isSourceAbs = result.pathname && 47 === result.pathname.charCodeAt(0), isRelAbs = relative.host || relative.pathname && 47 === relative.pathname.charCodeAt(0), mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], psychotic = (relPath = relative.pathname && relative.pathname.split("/") || [], 
    result._protocol && !slashProtocols[result._protocol]);
    if (psychotic && (result.hostname = "", result._port = -1, result.host && ("" === srcPath[0] ? srcPath[0] = result.host : srcPath.unshift(result.host)), 
    result.host = "", relative._protocol && (relative.hostname = "", relative._port = -1, 
    relative.host && ("" === relPath[0] ? relPath[0] = relative.host : relPath.unshift(relative.host)), 
    relative.host = ""), mustEndAbs = mustEndAbs && ("" === relPath[0] || "" === srcPath[0])), 
    isRelAbs) result.host = relative.host ? relative.host : result.host, result.hostname = relative.hostname ? relative.hostname : result.hostname, 
    result.search = relative.search, srcPath = relPath; else if (relPath.length) srcPath || (srcPath = []), 
    srcPath.pop(), srcPath = srcPath.concat(relPath), result.search = relative.search; else if (relative.search) {
      if (psychotic) result.hostname = result.host = srcPath.shift(), (authInHost = !!(result.host && result.host.indexOf("@") > 0) && result.host.split("@")) && (result.auth = authInHost.shift(), 
      result.host = result.hostname = authInHost.shift());
      return result.search = relative.search, result._href = "", result;
    }
    if (!srcPath.length) return result.pathname = null, result._href = "", result;
    for (var last = srcPath.slice(-1)[0], hasTrailingSlash = (result.host || relative.host) && ("." === last || ".." === last) || "" === last, up = 0, i = srcPath.length; i >= 0; i--) "." === (last = srcPath[i]) ? srcPath.splice(i, 1) : ".." === last ? (srcPath.splice(i, 1), 
    up++) : up && (srcPath.splice(i, 1), up--);
    if (!mustEndAbs && !removeAllDots) for (;up--; up) srcPath.unshift("..");
    !mustEndAbs || "" === srcPath[0] || srcPath[0] && 47 === srcPath[0].charCodeAt(0) || srcPath.unshift(""), 
    hasTrailingSlash && "/" !== srcPath.join("/").substr(-1) && srcPath.push("");
    var authInHost, isAbsolute = "" === srcPath[0] || srcPath[0] && 47 === srcPath[0].charCodeAt(0);
    psychotic && (result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "", 
    (authInHost = !!(result.host && result.host.indexOf("@") > 0) && result.host.split("@")) && (result.auth = authInHost.shift(), 
    result.host = result.hostname = authInHost.shift()));
    return (mustEndAbs = mustEndAbs || result.host && srcPath.length) && !isAbsolute && srcPath.unshift(""), 
    result.pathname = 0 === srcPath.length ? null : srcPath.join("/"), result.auth = relative.auth || result.auth, 
    result.slashes = result.slashes || relative.slashes, result._href = "", result;
  };
  var punycode = __webpack_require__(54);
  Url.prototype._hostIdna = function(hostname) {
    return punycode.toASCII(hostname);
  };
  var escapePathName = Url.prototype._escapePathName = function(pathname) {
    return containsCharacter2(pathname, 35, 63) ? function(pathname) {
      return pathname.replace(/[?#]/g, (function(match) {
        return encodeURIComponent(match);
      }));
    }(pathname) : pathname;
  }, escapeSearch = Url.prototype._escapeSearch = function(search) {
    return containsCharacter2(search, 35, -1) ? function(search) {
      return search.replace(/#/g, (function(match) {
        return encodeURIComponent(match);
      }));
    }(search) : search;
  };
  function containsCharacter2(string, char1, char2) {
    for (var i = 0, len = string.length; i < len; ++i) {
      var ch = string.charCodeAt(i);
      if (ch === char1 || ch === char2) return !0;
    }
    return !1;
  }
  function makeAsciiTable(spec) {
    var ret = new Uint8Array(128);
    return spec.forEach((function(item) {
      if ("number" == typeof item) ret[item] = 1; else for (var start = item[0], end = item[1], j = start; j <= end; ++j) ret[j] = 1;
    })), ret;
  }
  Url.prototype._parseProtocol = function(str, start, end) {
    for (var doLowerCase = !1, protocolCharacters = this._protocolCharacters, i = start; i <= end; ++i) {
      var ch = str.charCodeAt(i);
      if (58 === ch) {
        var protocol = str.slice(start, i);
        return doLowerCase && (protocol = protocol.toLowerCase()), this._protocol = protocol, 
        i + 1;
      }
      if (1 !== protocolCharacters[ch]) return start;
      ch < 97 && (doLowerCase = !0);
    }
    return start;
  }, Url.prototype._parseAuth = function(str, start, end, decode) {
    var auth = str.slice(start, end + 1);
    decode && (auth = decodeURIComponent(auth)), this.auth = auth;
  }, Url.prototype._parsePort = function(str, start, end) {
    for (var port = 0, hadChars = !1, validPort = !0, i = start; i <= end; ++i) {
      var ch = str.charCodeAt(i);
      if (!(48 <= ch && ch <= 57)) {
        validPort = !1, 92 !== ch && 47 !== ch || (validPort = !0);
        break;
      }
      port = 10 * port + (ch - 48), hadChars = !0;
    }
    return 0 === port && !hadChars || !validPort ? (validPort || (this._port = -2), 
    0) : (this._port = port, i - start);
  }, Url.prototype._parseHost = function(str, start, end, slashesDenoteHost) {
    var hostEndingCharacters = this._hostEndingCharacters, first = str.charCodeAt(start), second = str.charCodeAt(start + 1);
    if (47 !== first && 92 !== first || 47 !== second && 92 !== second) {
      if (!this._protocol || slashProtocols[this._protocol]) return start;
    } else {
      if (this.slashes = !0, 0 === start) {
        if (end < 2) return start;
        if (!function(string, char1, fromIndex, stopCharacterTable) {
          for (var len = string.length, i = fromIndex; i < len; ++i) {
            var ch = string.charCodeAt(i);
            if (ch === char1) return !0;
            if (1 === stopCharacterTable[ch]) return !1;
          }
          return !1;
        }(str, 64, 2, hostEndingCharacters) && !slashesDenoteHost) return this.slashes = null, 
        start;
      }
      start += 2;
    }
    for (var doLowerCase = !1, idna = !1, hostNameStart = start, hostNameEnd = end, portLength = 0, charsAfterDot = 0, authNeedsDecoding = !1, j = -1, i = start; i <= end; ++i) {
      if (64 === (ch = str.charCodeAt(i))) j = i; else if (37 === ch) authNeedsDecoding = !0; else if (1 === hostEndingCharacters[ch]) break;
    }
    if (j > -1 && (this._parseAuth(str, start, j - 1, authNeedsDecoding), start = hostNameStart = j + 1), 
    91 === str.charCodeAt(start)) {
      for (i = start + 1; i <= end; ++i) {
        if (93 === (ch = str.charCodeAt(i))) {
          58 === str.charCodeAt(i + 1) && (portLength = this._parsePort(str, i + 2, end) + 1);
          var hostname = str.slice(start + 1, i).toLowerCase();
          return this.hostname = hostname, this.host = this._port > 0 ? "[" + hostname + "]:" + this._port : "[" + hostname + "]", 
          this.pathname = "/", i + portLength + 1;
        }
      }
      return start;
    }
    for (i = start; i <= end; ++i) {
      if (charsAfterDot > 62) return this.hostname = this.host = str.slice(start, i), 
      i;
      var ch;
      if (58 === (ch = str.charCodeAt(i))) {
        portLength = this._parsePort(str, i + 1, end) + 1, hostNameEnd = i - 1;
        break;
      }
      if (ch < 97) {
        if (46 === ch) charsAfterDot = -1; else if (65 <= ch && ch <= 90) doLowerCase = !0; else if (!(45 === ch || 95 === ch || 43 === ch || 48 <= ch && ch <= 57)) {
          0 === hostEndingCharacters[ch] && 0 === this._noPrependSlashHostEnders[ch] && (this._prependSlash = !0), 
          hostNameEnd = i - 1;
          break;
        }
      } else if (ch >= 123) {
        if (ch <= 126) {
          0 === this._noPrependSlashHostEnders[ch] && (this._prependSlash = !0), hostNameEnd = i - 1;
          break;
        }
        idna = !0;
      }
      ch, charsAfterDot++;
    }
    if (hostNameEnd + 1 !== start && hostNameEnd - hostNameStart <= 256) {
      hostname = str.slice(hostNameStart, hostNameEnd + 1);
      doLowerCase && (hostname = hostname.toLowerCase()), idna && (hostname = this._hostIdna(hostname)), 
      this.hostname = hostname, this.host = this._port > 0 ? hostname + ":" + this._port : hostname;
    }
    return hostNameEnd + 1 + portLength;
  }, Url.prototype._copyPropsTo = function(input, noProtocol) {
    noProtocol || (input._protocol = this._protocol), input._href = this._href, input._port = this._port, 
    input._prependSlash = this._prependSlash, input.auth = this.auth, input.slashes = this.slashes, 
    input.host = this.host, input.hostname = this.hostname, input.hash = this.hash, 
    input.search = this.search, input.pathname = this.pathname;
  }, Url.prototype._clone = function() {
    var ret = new Url;
    return ret._protocol = this._protocol, ret._href = this._href, ret._port = this._port, 
    ret._prependSlash = this._prependSlash, ret.auth = this.auth, ret.slashes = this.slashes, 
    ret.host = this.host, ret.hostname = this.hostname, ret.hash = this.hash, ret.search = this.search, 
    ret.pathname = this.pathname, ret;
  }, Url.prototype._getComponentEscaped = function(str, start, end, isAfterQuery) {
    for (var cur = start, i = start, ret = "", autoEscapeMap = isAfterQuery ? this._afterQueryAutoEscapeMap : this._autoEscapeMap; i <= end; ++i) {
      var escaped = autoEscapeMap[str.charCodeAt(i)];
      "" !== escaped && void 0 !== escaped && (cur < i && (ret += str.slice(cur, i)), 
      ret += escaped, cur = i + 1);
    }
    return cur < i + 1 && (ret += str.slice(cur, i)), ret;
  }, Url.prototype._parsePath = function(str, start, end, disableAutoEscapeChars) {
    for (var path, pathStart = start, pathEnd = end, escape = !1, autoEscapeCharacters = this._autoEscapeCharacters, prePath = -2 === this._port ? "/:" : "", i = start; i <= end; ++i) {
      var ch = str.charCodeAt(i);
      if (35 === ch) {
        this._parseHash(str, i, end, disableAutoEscapeChars), pathEnd = i - 1;
        break;
      }
      if (63 === ch) {
        this._parseQuery(str, i, end, disableAutoEscapeChars), pathEnd = i - 1;
        break;
      }
      disableAutoEscapeChars || escape || 1 !== autoEscapeCharacters[ch] || (escape = !0);
    }
    pathStart > pathEnd ? this.pathname = "" === prePath ? "/" : prePath : (path = escape ? this._getComponentEscaped(str, pathStart, pathEnd, !1) : str.slice(pathStart, pathEnd + 1), 
    this.pathname = "" === prePath ? this._prependSlash ? "/" + path : path : prePath + path);
  }, Url.prototype._parseQuery = function(str, start, end, disableAutoEscapeChars) {
    for (var query, queryStart = start, queryEnd = end, escape = !1, autoEscapeCharacters = this._autoEscapeCharacters, i = start; i <= end; ++i) {
      var ch = str.charCodeAt(i);
      if (35 === ch) {
        this._parseHash(str, i, end, disableAutoEscapeChars), queryEnd = i - 1;
        break;
      }
      disableAutoEscapeChars || escape || 1 !== autoEscapeCharacters[ch] || (escape = !0);
    }
    queryStart > queryEnd ? this.search = "" : (query = escape ? this._getComponentEscaped(str, queryStart, queryEnd, !0) : str.slice(queryStart, queryEnd + 1), 
    this.search = query);
  }, Url.prototype._parseHash = function(str, start, end, disableAutoEscapeChars) {
    this.hash = start > end ? "" : disableAutoEscapeChars ? str.slice(start, end + 1) : this._getComponentEscaped(str, start, end, !0);
  }, Object.defineProperty(Url.prototype, "port", {
    get: function() {
      return this._port >= 0 ? "" + this._port : null;
    },
    set: function(v) {
      this._port = null == v ? -1 : parseInt(v, 10);
    }
  }), Object.defineProperty(Url.prototype, "query", {
    get: function() {
      var query = this._query;
      if (null != query) return query;
      var search = this.search;
      return search && (63 === search.charCodeAt(0) && (search = search.slice(1)), "" !== search) ? (this._query = search, 
      search) : search;
    },
    set: function(v) {
      this._query = v;
    }
  }), Object.defineProperty(Url.prototype, "path", {
    get: function() {
      var p = this.pathname || "", s = this.search || "";
      return p || s ? p + s : null == p && s ? "/" + s : null;
    },
    set: function() {}
  }), Object.defineProperty(Url.prototype, "protocol", {
    get: function() {
      var proto = this._protocol;
      return proto ? proto + ":" : proto;
    },
    set: function(v) {
      if ("string" == typeof v) {
        var end = v.length - 1;
        58 === v.charCodeAt(end) ? this._protocol = v.slice(0, end) : this._protocol = v;
      } else null == v && (this._protocol = null);
    }
  }), Object.defineProperty(Url.prototype, "href", {
    get: function() {
      var href = this._href;
      return href || (href = this._href = this.format()), href;
    },
    set: function(v) {
      this._href = v;
    }
  }), Url.parse = function(str, parseQueryString, hostDenotesSlash, disableAutoEscapeChars) {
    if (str instanceof Url) return str;
    var ret = new Url;
    return ret.parse(str, !!parseQueryString, !!hostDenotesSlash, !!disableAutoEscapeChars), 
    ret;
  }, Url.format = function(obj) {
    return "string" == typeof obj && (obj = Url.parse(obj)), obj instanceof Url ? obj.format() : Url.prototype.format.call(obj);
  }, Url.resolve = function(source, relative) {
    return Url.parse(source, !1, !0).resolve(relative);
  }, Url.resolveObject = function(source, relative) {
    return source ? Url.parse(source, !1, !0).resolveObject(relative) : relative;
  };
  for (var autoEscape = [ "<", ">", '"', "`", " ", "\r", "\n", "\t", "{", "}", "|", "\\", "^", "`", "'" ], autoEscapeMap = new Array(128), i = 0, len = autoEscapeMap.length; i < len; ++i) autoEscapeMap[i] = "";
  for (i = 0, len = autoEscape.length; i < len; ++i) {
    var c = autoEscape[i], esc = encodeURIComponent(c);
    esc === c && (esc = escape(c)), autoEscapeMap[c.charCodeAt(0)] = esc;
  }
  var afterQueryAutoEscapeMap = autoEscapeMap.slice();
  autoEscapeMap[92] = "/";
  var slashProtocols = Url.prototype._slashProtocols = {
    http: !0,
    https: !0,
    gopher: !0,
    file: !0,
    ftp: !0,
    "http:": !0,
    "https:": !0,
    "gopher:": !0,
    "file:": !0,
    "ftp:": !0
  };
  Url.prototype._protocolCharacters = makeAsciiTable([ [ 97, 122 ], [ 65, 90 ], 46, 43, 45 ]), 
  Url.prototype._hostEndingCharacters = makeAsciiTable([ 35, 63, 47, 92 ]), Url.prototype._autoEscapeCharacters = makeAsciiTable(autoEscape.map((function(v) {
    return v.charCodeAt(0);
  }))), Url.prototype._noPrependSlashHostEnders = makeAsciiTable([ "<", ">", "'", "`", " ", "\r", "\n", "\t", "{", "}", "|", "^", "`", '"', "%", ";" ].map((function(v) {
    return v.charCodeAt(0);
  }))), Url.prototype._autoEscapeMap = autoEscapeMap, Url.prototype._afterQueryAutoEscapeMap = afterQueryAutoEscapeMap, 
  module.exports = Url, Url.replace = function() {
    __webpack_require__.c.url = {
      exports: Url
    };
  };
}, function(module, exports) {
  module.exports = require("querystring");
}, function(module, exports) {
  var punycode, maxInt = 2147483647, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
    overflow: "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
  }, floor = Math.floor, stringFromCharCode = String.fromCharCode;
  function error(type) {
    throw RangeError(errors[type]);
  }
  function map(array, fn) {
    for (var length = array.length, result = []; length--; ) result[length] = fn(array[length]);
    return result;
  }
  function mapDomain(string, fn) {
    var parts = string.split("@"), result = "";
    return parts.length > 1 && (result = parts[0] + "@", string = parts[1]), result + map((string = string.replace(regexSeparators, ".")).split("."), fn).join(".");
  }
  function digitToBasic(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((0 != flag) << 5);
  }
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    for (delta = firstTime ? floor(delta / 700) : delta >> 1, delta += floor(delta / numPoints); delta > 455; k += 36) delta = floor(delta / 35);
    return floor(k + 36 * delta / (delta + 38));
  }
  punycode = {
    version: "1.3.2",
    ucs2: {},
    toASCII: function(input) {
      return mapDomain(input, (function(string) {
        return regexNonASCII.test(string) ? "xn--" + function(input) {
          var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, inputLength, handledCPCountPlusOne, baseMinusT, qMinusT, output = [];
          for (inputLength = (input = function(string) {
            for (var value, extra, output = [], counter = 0, length = string.length; counter < length; ) (value = string.charCodeAt(counter++)) >= 55296 && value <= 56319 && counter < length ? 56320 == (64512 & (extra = string.charCodeAt(counter++))) ? output.push(((1023 & value) << 10) + (1023 & extra) + 65536) : (output.push(value), 
            counter--) : output.push(value);
            return output;
          }(input)).length, n = 128, delta = 0, bias = 72, j = 0; j < inputLength; ++j) (currentValue = input[j]) < 128 && output.push(stringFromCharCode(currentValue));
          for (handledCPCount = basicLength = output.length, basicLength && output.push("-"); handledCPCount < inputLength; ) {
            for (m = maxInt, j = 0; j < inputLength; ++j) (currentValue = input[j]) >= n && currentValue < m && (m = currentValue);
            for (m - n > floor((maxInt - delta) / (handledCPCountPlusOne = handledCPCount + 1)) && error("overflow"), 
            delta += (m - n) * handledCPCountPlusOne, n = m, j = 0; j < inputLength; ++j) if ((currentValue = input[j]) < n && ++delta > maxInt && error("overflow"), 
            currentValue == n) {
              for (q = delta, k = 36; !(q < (t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias)); k += 36) qMinusT = q - t, 
              baseMinusT = 36 - t, output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))), 
              q = floor(qMinusT / baseMinusT);
              output.push(stringFromCharCode(digitToBasic(q, 0))), bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength), 
              delta = 0, ++handledCPCount;
            }
            ++delta, ++n;
          }
          return output.join("");
        }(string) : string;
      }));
    }
  }, module.exports = punycode;
}, function(module, exports, __webpack_require__) {
  var path = __webpack_require__(0), normalize = value => path.posix.normalize(path.posix.join("/", value));
  module.exports = value => "!" === value.charAt(0) ? "!" + normalize(value.substr(1)) : normalize(value), 
  module.exports.normalize = normalize;
}, function(module, exports, __webpack_require__) {
  module.exports = minimatch, minimatch.Minimatch = Minimatch;
  var path = {
    sep: "/"
  };
  try {
    path = __webpack_require__(0);
  } catch (er) {}
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}, expand = __webpack_require__(57), plTypes = {
    "!": {
      open: "(?:(?!(?:",
      close: "))[^/]*?)"
    },
    "?": {
      open: "(?:",
      close: ")?"
    },
    "+": {
      open: "(?:",
      close: ")+"
    },
    "*": {
      open: "(?:",
      close: ")*"
    },
    "@": {
      open: "(?:",
      close: ")"
    }
  }, reSpecials = "().*{}+?[]^$\\!".split("").reduce((function(set, c) {
    return set[c] = !0, set;
  }), {});
  var slashSplit = /\/+/;
  function ext(a, b) {
    a = a || {}, b = b || {};
    var t = {};
    return Object.keys(b).forEach((function(k) {
      t[k] = b[k];
    })), Object.keys(a).forEach((function(k) {
      t[k] = a[k];
    })), t;
  }
  function minimatch(p, pattern, options) {
    if ("string" != typeof pattern) throw new TypeError("glob pattern string required");
    return options || (options = {}), !(!options.nocomment && "#" === pattern.charAt(0)) && ("" === pattern.trim() ? "" === p : new Minimatch(pattern, options).match(p));
  }
  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) return new Minimatch(pattern, options);
    if ("string" != typeof pattern) throw new TypeError("glob pattern string required");
    options || (options = {}), pattern = pattern.trim(), "/" !== path.sep && (pattern = pattern.split(path.sep).join("/")), 
    this.options = options, this.set = [], this.pattern = pattern, this.regexp = null, 
    this.negate = !1, this.comment = !1, this.empty = !1, this.make();
  }
  function braceExpand(pattern, options) {
    if (options || (options = this instanceof Minimatch ? this.options : {}), void 0 === (pattern = void 0 === pattern ? this.pattern : pattern)) throw new TypeError("undefined pattern");
    return options.nobrace || !pattern.match(/\{.*\}/) ? [ pattern ] : expand(pattern);
  }
  minimatch.filter = function(pattern, options) {
    return options = options || {}, function(p, i, list) {
      return minimatch(p, pattern, options);
    };
  }, minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length) return minimatch;
    var orig = minimatch, m = function(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };
    return m.Minimatch = function(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    }, m;
  }, Minimatch.defaults = function(def) {
    return def && Object.keys(def).length ? minimatch.defaults(def).Minimatch : Minimatch;
  }, Minimatch.prototype.debug = function() {}, Minimatch.prototype.make = function() {
    if (this._made) return;
    var pattern = this.pattern, options = this.options;
    if (!options.nocomment && "#" === pattern.charAt(0)) return void (this.comment = !0);
    if (!pattern) return void (this.empty = !0);
    this.parseNegate();
    var set = this.globSet = this.braceExpand();
    options.debug && (this.debug = console.error);
    this.debug(this.pattern, set), set = this.globParts = set.map((function(s) {
      return s.split(slashSplit);
    })), this.debug(this.pattern, set), set = set.map((function(s, si, set) {
      return s.map(this.parse, this);
    }), this), this.debug(this.pattern, set), set = set.filter((function(s) {
      return -1 === s.indexOf(!1);
    })), this.debug(this.pattern, set), this.set = set;
  }, Minimatch.prototype.parseNegate = function() {
    var pattern = this.pattern, negate = !1, options = this.options, negateOffset = 0;
    if (options.nonegate) return;
    for (var i = 0, l = pattern.length; i < l && "!" === pattern.charAt(i); i++) negate = !negate, 
    negateOffset++;
    negateOffset && (this.pattern = pattern.substr(negateOffset));
    this.negate = negate;
  }, minimatch.braceExpand = function(pattern, options) {
    return braceExpand(pattern, options);
  }, Minimatch.prototype.braceExpand = braceExpand, Minimatch.prototype.parse = function(pattern, isSub) {
    if (pattern.length > 65536) throw new TypeError("pattern is too long");
    var options = this.options;
    if (!options.noglobstar && "**" === pattern) return GLOBSTAR;
    if ("" === pattern) return "";
    var stateChar, re = "", hasMagic = !!options.nocase, escaping = !1, patternListStack = [], negativeLists = [], inClass = !1, reClassStart = -1, classStart = -1, patternStart = "." === pattern.charAt(0) ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", self = this;
    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
         case "*":
          re += "[^/]*?", hasMagic = !0;
          break;

         case "?":
          re += "[^/]", hasMagic = !0;
          break;

         default:
          re += "\\" + stateChar;
        }
        self.debug("clearStateChar %j %j", stateChar, re), stateChar = !1;
      }
    }
    for (var c, i = 0, len = pattern.length; i < len && (c = pattern.charAt(i)); i++) if (this.debug("%s\t%s %s %j", pattern, i, re, c), 
    escaping && reSpecials[c]) re += "\\" + c, escaping = !1; else switch (c) {
     case "/":
      return !1;

     case "\\":
      clearStateChar(), escaping = !0;
      continue;

     case "?":
     case "*":
     case "+":
     case "@":
     case "!":
      if (this.debug("%s\t%s %s %j <-- stateChar", pattern, i, re, c), inClass) {
        this.debug("  in class"), "!" === c && i === classStart + 1 && (c = "^"), re += c;
        continue;
      }
      self.debug("call clearStateChar %j", stateChar), clearStateChar(), stateChar = c, 
      options.noext && clearStateChar();
      continue;

     case "(":
      if (inClass) {
        re += "(";
        continue;
      }
      if (!stateChar) {
        re += "\\(";
        continue;
      }
      patternListStack.push({
        type: stateChar,
        start: i - 1,
        reStart: re.length,
        open: plTypes[stateChar].open,
        close: plTypes[stateChar].close
      }), re += "!" === stateChar ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", stateChar, re), 
      stateChar = !1;
      continue;

     case ")":
      if (inClass || !patternListStack.length) {
        re += "\\)";
        continue;
      }
      clearStateChar(), hasMagic = !0;
      var pl = patternListStack.pop();
      re += pl.close, "!" === pl.type && negativeLists.push(pl), pl.reEnd = re.length;
      continue;

     case "|":
      if (inClass || !patternListStack.length || escaping) {
        re += "\\|", escaping = !1;
        continue;
      }
      clearStateChar(), re += "|";
      continue;

     case "[":
      if (clearStateChar(), inClass) {
        re += "\\" + c;
        continue;
      }
      inClass = !0, classStart = i, reClassStart = re.length, re += c;
      continue;

     case "]":
      if (i === classStart + 1 || !inClass) {
        re += "\\" + c, escaping = !1;
        continue;
      }
      if (inClass) {
        var cs = pattern.substring(classStart + 1, i);
        try {
          RegExp("[" + cs + "]");
        } catch (er) {
          var sp = this.parse(cs, SUBPARSE);
          re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]", hasMagic = hasMagic || sp[1], 
          inClass = !1;
          continue;
        }
      }
      hasMagic = !0, inClass = !1, re += c;
      continue;

     default:
      clearStateChar(), escaping ? escaping = !1 : !reSpecials[c] || "^" === c && inClass || (re += "\\"), 
      re += c;
    }
    inClass && (cs = pattern.substr(classStart + 1), sp = this.parse(cs, SUBPARSE), 
    re = re.substr(0, reClassStart) + "\\[" + sp[0], hasMagic = hasMagic || sp[1]);
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug("setting tail", re, pl), tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (function(_, $1, $2) {
        return $2 || ($2 = "\\"), $1 + $1 + $2 + "|";
      })), this.debug("tail=%j\n   %s", tail, tail, pl, re);
      var t = "*" === pl.type ? "[^/]*?" : "?" === pl.type ? "[^/]" : "\\" + pl.type;
      hasMagic = !0, re = re.slice(0, pl.reStart) + t + "\\(" + tail;
    }
    clearStateChar(), escaping && (re += "\\\\");
    var addPatternStart = !1;
    switch (re.charAt(0)) {
     case ".":
     case "[":
     case "(":
      addPatternStart = !0;
    }
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n], nlBefore = re.slice(0, nl.reStart), nlFirst = re.slice(nl.reStart, nl.reEnd - 8), nlLast = re.slice(nl.reEnd - 8, nl.reEnd), nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter;
      var openParensBefore = nlBefore.split("(").length - 1, cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
      var dollar = "";
      "" === (nlAfter = cleanAfter) && isSub !== SUBPARSE && (dollar = "$"), re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    }
    "" !== re && hasMagic && (re = "(?=.)" + re);
    addPatternStart && (re = patternStart + re);
    if (isSub === SUBPARSE) return [ re, hasMagic ];
    if (!hasMagic) return function(s) {
      return s.replace(/\\(.)/g, "$1");
    }(pattern);
    var flags = options.nocase ? "i" : "";
    try {
      var regExp = new RegExp("^" + re + "$", flags);
    } catch (er) {
      return new RegExp("$.");
    }
    return regExp._glob = pattern, regExp._src = re, regExp;
  };
  var SUBPARSE = {};
  minimatch.makeRe = function(pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  }, Minimatch.prototype.makeRe = function() {
    if (this.regexp || !1 === this.regexp) return this.regexp;
    var set = this.set;
    if (!set.length) return this.regexp = !1, this.regexp;
    var options = this.options, twoStar = options.noglobstar ? "[^/]*?" : options.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", flags = options.nocase ? "i" : "", re = set.map((function(pattern) {
      return pattern.map((function(p) {
        return p === GLOBSTAR ? twoStar : "string" == typeof p ? function(s) {
          return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }(p) : p._src;
      })).join("\\/");
    })).join("|");
    re = "^(?:" + re + ")$", this.negate && (re = "^(?!" + re + ").*$");
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = !1;
    }
    return this.regexp;
  }, minimatch.match = function(list, pattern, options) {
    var mm = new Minimatch(pattern, options = options || {});
    return list = list.filter((function(f) {
      return mm.match(f);
    })), mm.options.nonull && !list.length && list.push(pattern), list;
  }, Minimatch.prototype.match = function(f, partial) {
    if (this.debug("match", f, this.pattern), this.comment) return !1;
    if (this.empty) return "" === f;
    if ("/" === f && partial) return !0;
    var options = this.options;
    "/" !== path.sep && (f = f.split(path.sep).join("/"));
    f = f.split(slashSplit), this.debug(this.pattern, "split", f);
    var filename, i, set = this.set;
    for (this.debug(this.pattern, "set", set), i = f.length - 1; i >= 0 && !(filename = f[i]); i--) ;
    for (i = 0; i < set.length; i++) {
      var pattern = set[i], file = f;
      if (options.matchBase && 1 === pattern.length && (file = [ filename ]), this.matchOne(file, pattern, partial)) return !!options.flipNegate || !this.negate;
    }
    return !options.flipNegate && this.negate;
  }, Minimatch.prototype.matchOne = function(file, pattern, partial) {
    var options = this.options;
    this.debug("matchOne", {
      this: this,
      file: file,
      pattern: pattern
    }), this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, 
    pi++) {
      this.debug("matchOne loop");
      var hit, p = pattern[pi], f = file[fi];
      if (this.debug(pattern, p, f), !1 === p) return !1;
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [ pattern, p, f ]);
        var fr = fi, pr = pi + 1;
        if (pr === pl) {
          for (this.debug("** at the end"); fi < fl; fi++) if ("." === file[fi] || ".." === file[fi] || !options.dot && "." === file[fi].charAt(0)) return !1;
          return !0;
        }
        for (;fr < fl; ) {
          var swallowee = file[fr];
          if (this.debug("\nglobstar while", file, fr, pattern, pr, swallowee), this.matchOne(file.slice(fr), pattern.slice(pr), partial)) return this.debug("globstar found match!", fr, fl, swallowee), 
          !0;
          if ("." === swallowee || ".." === swallowee || !options.dot && "." === swallowee.charAt(0)) {
            this.debug("dot detected!", file, fr, pattern, pr);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), fr++;
        }
        return !(!partial || (this.debug("\n>>> no match, partial?", file, fr, pattern, pr), 
        fr !== fl));
      }
      if ("string" == typeof p ? (hit = options.nocase ? f.toLowerCase() === p.toLowerCase() : f === p, 
      this.debug("string match", p, f, hit)) : (hit = f.match(p), this.debug("pattern match", p, f, hit)), 
      !hit) return !1;
    }
    if (fi === fl && pi === pl) return !0;
    if (fi === fl) return partial;
    if (pi === pl) return fi === fl - 1 && "" === file[fi];
    throw new Error("wtf?");
  };
}, function(module, exports, __webpack_require__) {
  var concatMap = __webpack_require__(58), balanced = __webpack_require__(59);
  module.exports = function(str) {
    if (!str) return [];
    "{}" === str.substr(0, 2) && (str = "\\{\\}" + str.substr(2));
    return function expand(str, isTop) {
      var expansions = [], m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre)) return [ str ];
      var n, isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body), isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body), isSequence = isNumericSequence || isAlphaSequence, isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) return m.post.match(/,.*\}/) ? (str = m.pre + "{" + m.body + escClose + m.post, 
      expand(str)) : [ str ];
      if (isSequence) n = m.body.split(/\.\./); else {
        if (1 === (n = function parseCommaParts(str) {
          if (!str) return [ "" ];
          var parts = [], m = balanced("{", "}", str);
          if (!m) return str.split(",");
          var pre = m.pre, body = m.body, post = m.post, p = pre.split(",");
          p[p.length - 1] += "{" + body + "}";
          var postParts = parseCommaParts(post);
          post.length && (p[p.length - 1] += postParts.shift(), p.push.apply(p, postParts));
          return parts.push.apply(parts, p), parts;
        }(m.body)).length) if (1 === (n = expand(n[0], !1).map(embrace)).length) return (post = m.post.length ? expand(m.post, !1) : [ "" ]).map((function(p) {
          return m.pre + n[0] + p;
        }));
      }
      var N, pre = m.pre, post = m.post.length ? expand(m.post, !1) : [ "" ];
      if (isSequence) {
        var x = numeric(n[0]), y = numeric(n[1]), width = Math.max(n[0].length, n[1].length), incr = 3 == n.length ? Math.abs(numeric(n[2])) : 1, test = lte;
        y < x && (incr *= -1, test = gte);
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) "\\" === (c = String.fromCharCode(i)) && (c = ""); else if (c = String(i), 
          pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join("0");
              c = i < 0 ? "-" + z + c.slice(1) : z + c;
            }
          }
          N.push(c);
        }
      } else N = concatMap(n, (function(el) {
        return expand(el, !1);
      }));
      for (var j = 0; j < N.length; j++) for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        (!isTop || isSequence || expansion) && expansions.push(expansion);
      }
      return expansions;
    }(function(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }(str), !0).map(unescapeBraces);
  };
  var escSlash = "\0SLASH" + Math.random() + "\0", escOpen = "\0OPEN" + Math.random() + "\0", escClose = "\0CLOSE" + Math.random() + "\0", escComma = "\0COMMA" + Math.random() + "\0", escPeriod = "\0PERIOD" + Math.random() + "\0";
  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }
  function unescapeBraces(str) {
    return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
  }
  function embrace(str) {
    return "{" + str + "}";
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }
  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }
}, function(module, exports) {
  module.exports = function(xs, fn) {
    for (var res = [], i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      isArray(x) ? res.push.apply(res, x) : res.push(x);
    }
    return res;
  };
  var isArray = Array.isArray || function(xs) {
    return "[object Array]" === Object.prototype.toString.call(xs);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function balanced(a, b, str) {
    a instanceof RegExp && (a = maybeMatch(a, str)), b instanceof RegExp && (b = maybeMatch(b, str));
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }
  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }
  function range(a, b, str) {
    var begs, beg, left, right, result, ai = str.indexOf(a), bi = str.indexOf(b, ai + 1), i = ai;
    if (ai >= 0 && bi > 0) {
      for (begs = [], left = str.length; i >= 0 && !result; ) i == ai ? (begs.push(i), 
      ai = str.indexOf(a, i + 1)) : 1 == begs.length ? result = [ begs.pop(), bi ] : ((beg = begs.pop()) < left && (left = beg, 
      right = bi), bi = str.indexOf(b, i + 1)), i = ai < bi && ai >= 0 ? ai : bi;
      begs.length && (result = [ left, right ]);
    }
    return result;
  }
  module.exports = balanced, balanced.range = range;
}, function(module, exports) {
  module.exports = pathToRegexp, module.exports.parse = parse, module.exports.compile = function(str, options) {
    return tokensToFunction(parse(str, options));
  }, module.exports.tokensToFunction = tokensToFunction, module.exports.tokensToRegExp = tokensToRegExp;
  var PATH_REGEXP = new RegExp([ "(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?" ].join("|"), "g");
  function parse(str, options) {
    for (var res, tokens = [], key = 0, index = 0, path = "", defaultDelimiter = options && options.delimiter || "/", delimiters = options && options.delimiters || "./", pathEscaped = !1; null !== (res = PATH_REGEXP.exec(str)); ) {
      var m = res[0], escaped = res[1], offset = res.index;
      if (path += str.slice(index, offset), index = offset + m.length, escaped) path += escaped[1], 
      pathEscaped = !0; else {
        var prev = "", next = str[index], name = res[2], capture = res[3], group = res[4], modifier = res[5];
        if (!pathEscaped && path.length) {
          var k = path.length - 1;
          delimiters.indexOf(path[k]) > -1 && (prev = path[k], path = path.slice(0, k));
        }
        path && (tokens.push(path), path = "", pathEscaped = !1);
        var partial = "" !== prev && void 0 !== next && next !== prev, repeat = "+" === modifier || "*" === modifier, optional = "?" === modifier || "*" === modifier, delimiter = prev || defaultDelimiter, pattern = capture || group;
        tokens.push({
          name: name || key++,
          prefix: prev,
          delimiter: delimiter,
          optional: optional,
          repeat: repeat,
          partial: partial,
          pattern: pattern ? escapeGroup(pattern) : "[^" + escapeString(delimiter) + "]+?"
        });
      }
    }
    return (path || index < str.length) && tokens.push(path + str.substr(index)), tokens;
  }
  function tokensToFunction(tokens) {
    for (var matches = new Array(tokens.length), i = 0; i < tokens.length; i++) "object" == typeof tokens[i] && (matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$"));
    return function(data, options) {
      for (var path = "", encode = options && options.encode || encodeURIComponent, i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if ("string" != typeof token) {
          var segment, value = data ? data[token.name] : void 0;
          if (Array.isArray(value)) {
            if (!token.repeat) throw new TypeError('Expected "' + token.name + '" to not repeat, but got array');
            if (0 === value.length) {
              if (token.optional) continue;
              throw new TypeError('Expected "' + token.name + '" to not be empty');
            }
            for (var j = 0; j < value.length; j++) {
              if (segment = encode(value[j], token), !matches[i].test(segment)) throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"');
              path += (0 === j ? token.prefix : token.delimiter) + segment;
            }
          } else if ("string" != typeof value && "number" != typeof value && "boolean" != typeof value) {
            if (!token.optional) throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? "an array" : "a string"));
            token.partial && (path += token.prefix);
          } else {
            if (segment = encode(String(value), token), !matches[i].test(segment)) throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
            path += token.prefix + segment;
          }
        } else path += token;
      }
      return path;
    };
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }
  function escapeGroup(group) {
    return group.replace(/([=!:$/()])/g, "\\$1");
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function tokensToRegExp(tokens, keys, options) {
    for (var strict = (options = options || {}).strict, end = !1 !== options.end, delimiter = escapeString(options.delimiter || "/"), delimiters = options.delimiters || "./", endsWith = [].concat(options.endsWith || []).map(escapeString).concat("$").join("|"), route = "", isEndDelimited = 0 === tokens.length, i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if ("string" == typeof token) route += escapeString(token), isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1; else {
        var prefix = escapeString(token.prefix), capture = token.repeat ? "(?:" + token.pattern + ")(?:" + prefix + "(?:" + token.pattern + "))*" : token.pattern;
        keys && keys.push(token), token.optional ? token.partial ? route += prefix + "(" + capture + ")?" : route += "(?:" + prefix + "(" + capture + "))?" : route += prefix + "(" + capture + ")";
      }
    }
    return end ? (strict || (route += "(?:" + delimiter + ")?"), route += "$" === endsWith ? "$" : "(?=" + endsWith + ")") : (strict || (route += "(?:" + delimiter + "(?=" + endsWith + "))?"), 
    isEndDelimited || (route += "(?=" + delimiter + "|" + endsWith + ")")), new RegExp("^" + route, flags(options));
  }
  function pathToRegexp(path, keys, options) {
    return path instanceof RegExp ? function(path, keys) {
      if (!keys) return path;
      var groups = path.source.match(/\((?!\?)/g);
      if (groups) for (var i = 0; i < groups.length; i++) keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: !1,
        repeat: !1,
        partial: !1,
        pattern: null
      });
      return path;
    }(path, keys) : Array.isArray(path) ? function(path, keys, options) {
      for (var parts = [], i = 0; i < path.length; i++) parts.push(pathToRegexp(path[i], keys, options).source);
      return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }(path, keys, options) : function(path, keys, options) {
      return tokensToRegExp(parse(path, options), keys, options);
    }(path, keys, options);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(filename, options) {
    var opts = options || {}, type = opts.type || "attachment", params = function(filename, fallback) {
      if (void 0 === filename) return;
      var params = {};
      if ("string" != typeof filename) throw new TypeError("filename must be a string");
      void 0 === fallback && (fallback = !0);
      if ("string" != typeof fallback && "boolean" != typeof fallback) throw new TypeError("fallback must be a string or boolean");
      if ("string" == typeof fallback && NON_LATIN1_REGEXP.test(fallback)) throw new TypeError("fallback must be ISO-8859-1 string");
      var name = basename(filename), isQuotedString = TEXT_REGEXP.test(name), fallbackName = "string" != typeof fallback ? fallback && getlatin1(name) : basename(fallback), hasFallback = "string" == typeof fallbackName && fallbackName !== name;
      (hasFallback || !isQuotedString || HEX_ESCAPE_REGEXP.test(name)) && (params["filename*"] = name);
      (isQuotedString || hasFallback) && (params.filename = hasFallback ? fallbackName : name);
      return params;
    }(filename, opts.fallback);
    return function(obj) {
      var parameters = obj.parameters, type = obj.type;
      if (!type || "string" != typeof type || !TOKEN_REGEXP.test(type)) throw new TypeError("invalid type");
      var string = String(type).toLowerCase();
      if (parameters && "object" == typeof parameters) for (var param, params = Object.keys(parameters).sort(), i = 0; i < params.length; i++) {
        var val = "*" === (param = params[i]).substr(-1) ? ustring(parameters[param]) : qstring(parameters[param]);
        string += "; " + param + "=" + val;
      }
      return string;
    }(new ContentDisposition(type, params));
  };
  var basename = __webpack_require__(0).basename, ENCODE_URL_ATTR_CHAR_REGEXP = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, HEX_ESCAPE_REGEXP = /%[0-9A-Fa-f]{2}/, NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g, QUOTE_REGEXP = /([\\"])/g, TEXT_REGEXP = /^[\x20-\x7e\x80-\xff]+$/, TOKEN_REGEXP = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
  function getlatin1(val) {
    return String(val).replace(NON_LATIN1_REGEXP, "?");
  }
  function pencode(char) {
    var hex = String(char).charCodeAt(0).toString(16).toUpperCase();
    return 1 === hex.length ? "%0" + hex : "%" + hex;
  }
  function qstring(val) {
    return '"' + String(val).replace(QUOTE_REGEXP, "\\$1") + '"';
  }
  function ustring(val) {
    var str = String(val);
    return "UTF-8''" + encodeURIComponent(str).replace(ENCODE_URL_ATTR_CHAR_REGEXP, pencode);
  }
  function ContentDisposition(type, parameters) {
    this.type = type, this.parameters = parameters;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(0);
  function stripTrailingSep(thePath) {
    return thePath[thePath.length - 1] === path.sep ? thePath.slice(0, -1) : thePath;
  }
  module.exports = function(thePath, potentialParent) {
    return thePath = stripTrailingSep(thePath), potentialParent = stripTrailingSep(potentialParent), 
    "win32" === process.platform && (thePath = thePath.toLowerCase(), potentialParent = potentialParent.toLowerCase()), 
    0 === thePath.lastIndexOf(potentialParent, 0) && (thePath[potentialParent.length] === path.sep || void 0 === thePath[potentialParent.length]);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function mapWithIndex(range, index) {
    return {
      start: range.start,
      end: range.end,
      index: index
    };
  }
  function mapWithoutIndex(range) {
    return {
      start: range.start,
      end: range.end
    };
  }
  function sortByRangeIndex(a, b) {
    return a.index - b.index;
  }
  function sortByRangeStart(a, b) {
    return a.start - b.start;
  }
  module.exports = function(size, str, options) {
    var index = str.indexOf("=");
    if (-1 === index) return -2;
    var arr = str.slice(index + 1).split(","), ranges = [];
    ranges.type = str.slice(0, index);
    for (var i = 0; i < arr.length; i++) {
      var range = arr[i].split("-"), start = parseInt(range[0], 10), end = parseInt(range[1], 10);
      isNaN(start) ? (start = size - end, end = size - 1) : isNaN(end) && (end = size - 1), 
      end > size - 1 && (end = size - 1), isNaN(start) || isNaN(end) || start > end || start < 0 || ranges.push({
        start: start,
        end: end
      });
    }
    if (ranges.length < 1) return -1;
    return options && options.combine ? function(ranges) {
      for (var ordered = ranges.map(mapWithIndex).sort(sortByRangeStart), j = 0, i = 1; i < ordered.length; i++) {
        var range = ordered[i], current = ordered[j];
        range.start > current.end + 1 ? ordered[++j] = range : range.end > current.end && (current.end = range.end, 
        current.index = Math.min(current.index, range.index));
      }
      ordered.length = j + 1;
      var combined = ordered.sort(sortByRangeIndex).map(mapWithoutIndex);
      return combined.type = ranges.type, combined;
    }(ranges) : ranges;
  };
}, function(module, exports, __webpack_require__) {
  function directory(it) {
    var encodeHTML = _encodeHTML, out = '<!DOCTYPE html><html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Files within ' + encodeHTML(it.directory) + "</title> <style>body { margin: 0; padding: 30px; background: #fff; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; -webkit-font-smoothing: antialiased;}main { max-width: 920px;}header { display: flex; justify-content: space-between; flex-wrap: wrap;}h1 { font-size: 18px; font-weight: 500; margin-top: 0; color: #000;}header h1 a { font-size: 18px; font-weight: 500; margin-top: 0; color: #000;}h1 i { font-style: normal;}ul { margin: 0 0 0 -2px; padding: 20px 0 0 0;}ul li { list-style: none; font-size: 14px; display: flex; justify-content: space-between;}a { text-decoration: none;}ul a { color: #000; padding: 10px 5px; margin: 0 -5px; white-space: nowrap; overflow: hidden; display: block; width: 100%; text-overflow: ellipsis;}header a { color: #0076FF; font-size: 11px; font-weight: 400; display: inline-block; line-height: 20px;}svg { height: 13px; vertical-align: text-bottom;}ul a::before { display: inline-block; vertical-align: middle; margin-right: 10px; width: 24px; text-align: center; line-height: 12px;}ul a.file::before { content: url(\"data:image/svg+xml;utf8,<svg width='15' height='19' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 8C8.34 8 7 6.66 7 5V1H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V8h-4zM8 5c0 1.1.9 2 2 2h3.59L8 1.41V5zM3 0h5l7 7v9c0 1.66-1.34 3-3 3H3c-1.66 0-3-1.34-3-3V3c0-1.66 1.34-3 3-3z' fill='black'/></svg>\");}ul a:hover { text-decoration: underline;}ul a.folder::before { content: url(\"data:image/svg+xml;utf8,<svg width='20' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M18.784 3.87a1.565 1.565 0 0 0-.565-.356V2.426c0-.648-.523-1.171-1.15-1.171H8.996L7.908.25A.89.89 0 0 0 7.302 0H2.094C1.445 0 .944.523.944 1.171v2.3c-.21.085-.398.21-.565.356a1.348 1.348 0 0 0-.377 1.004l.398 9.83C.42 15.393 1.048 16 1.8 16h15.583c.753 0 1.36-.586 1.4-1.339l.398-9.83c.021-.313-.125-.69-.397-.962zM1.843 3.41V1.191c0-.146.104-.272.25-.272H7.26l1.234 1.088c.083.042.167.104.293.104h8.282c.125 0 .25.126.25.272V3.41H1.844zm15.54 11.712H1.78a.47.47 0 0 1-.481-.46l-.397-9.83c0-.147.041-.252.125-.356a.504.504 0 0 1 .377-.147H17.78c.125 0 .272.063.377.147.083.083.125.209.125.334l-.418 9.83c-.021.272-.23.482-.481.482z' fill='black'/></svg>\");}ul a.directory { font-weight: bold; }ul a.directory::before { content: \"\";}ul a.file.gif::before,ul a.file.jpg::before,ul a.file.png::before,ul a.file.svg::before { content: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='15.2' height='19' viewBox='0 0 409.6 512'><path d='M256.14 0H64A64 64 0 0 0 0 64v384a64 64 0 0 0 64 64h281.6a64 64 0 0 0 64-64V153.6zm104.15 140.8H307.2a38.44 38.44 0 0 1-38.4-38.4V49.08zM384 448a38.44 38.44 0 0 1-38.4 38.4H64A38.44 38.44 0 0 1 25.6 448V64A38.44 38.44 0 0 1 64 25.6h179.2v76.8a64 64 0 0 0 64 64H384zM275.2 243.2H134.4a32 32 0 0 0-32 32v115.2a32 32 0 0 0 32 32h140.8a32 32 0 0 0 32-32V275.2a32 32 0 0 0-32-32zm6.4 147.2a6.41 6.41 0 0 1-6.4 6.4H134.4a6.41 6.41 0 0 1-6.4-6.4V275.2a6.41 6.41 0 0 1 6.4-6.4h140.8a6.41 6.41 0 0 1 6.4 6.4zM140.8 384h128l-38.4-64-38.4 38.4-12.8-12.8z'/></svg>\");}::selection { background-color: #79FFE1; color: #000;}::-moz-selection { background-color: #79FFE1; color: #000;}@media (min-width: 768px) { ul {display: flex;flex-wrap: wrap; } ul li {width: 230px;padding-right: 20px; }}@media (min-width: 992px) { body {padding: 45px; } h1, header h1 a {font-size: 15px; } ul li {font-size: 13px;box-sizing: border-box;justify-content: flex-start; }}</style> </head> <body> <main> <header> <h1> <i>Index of&nbsp;</i> ", arr1 = it.paths;
    if (arr1) for (var index = -1, l1 = arr1.length - 1; index < l1; ) out += ' <a href="/' + encodeHTML((value = arr1[index += 1]).url) + '">' + encodeHTML(value.name) + "</a> ";
    out += ' </h1> </header> <ul id="files"> ';
    var arr2 = it.files;
    if (arr2) {
      index = -1;
      for (var value, l2 = arr2.length - 1; index < l2; ) out += ' <li> <a href="' + encodeHTML((value = arr2[index += 1]).relative) + '" title="' + encodeHTML(value.title) + '" class="' + encodeHTML(value.type) + " " + encodeHTML(value.ext) + '">' + encodeHTML(value.base) + "</a> </li> ";
    }
    return out += " </ul></main> </body></html>";
  }
  var encodeHTMLRules, matchHTML, _encodeHTML = (encodeHTMLRules = {
    "&": "&#38;",
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;",
    "/": "&#47;"
  }, matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g, function(code) {
    return code ? code.toString().replace(matchHTML, (function(m) {
      return encodeHTMLRules[m] || m;
    })) : "";
  });
  module.exports = directory;
}, function(module, exports) {
  function error(it) {
    return '<!DOCTYPE html><html lang="en"><head> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <title>Error</title> <style> body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; } main, aside, section { display: flex; justify-content: center; align-items: center; flex-direction: column; } main { height: 100%; } aside { background: #000; flex-shrink: 1; padding: 30px 20px; } aside p { margin: 0; color: #999999; font-size: 14px; line-height: 24px; } aside a { color: #fff; text-decoration: none; } section span { font-size: 24px; font-weight: 500; display: block; border-bottom: 1px solid #EAEAEA; text-align: center; padding-bottom: 20px; width: 100px; } section p { font-size: 14px; font-weight: 400; } section span + p { margin: 20px 0 0 0; } @media (min-width: 768px) { section { height: 40px; flex-direction: row; } section span, section p { height: 100%; line-height: 40px; } section span { border-bottom: 0; border-right: 1px solid #EAEAEA; padding: 0 20px 0 0; width: auto; } section span + p { margin: 0; padding-left: 20px; } aside { padding: 50px 0; } aside p { max-width: 520px; text-align: center; } } </style></head><body> <main> <section> <span>' + it.statusCode + "</span> <p>" + it.message + "</p> </section> </main></body></html>";
  }
  var encodeHTMLRules, matchHTML;
  encodeHTMLRules = {
    "&": "&#38;",
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;",
    "/": "&#47;"
  }, matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g;
  module.exports = error;
}, function(module, exports) {
  module.exports = {
    type: "object",
    properties: {
      public: {
        type: "string"
      },
      cleanUrls: {
        type: [ "boolean", "array" ]
      },
      rewrites: {
        type: "array"
      },
      redirects: {
        type: "array"
      },
      headers: {
        type: "array",
        maxItems: 50,
        minItems: 1,
        uniqueItems: !0,
        items: {
          type: "object",
          required: [ "source", "headers" ],
          properties: {
            source: {
              type: "string",
              maxLength: 100,
              minLength: 1
            },
            headers: {
              type: "array",
              maxItems: 50,
              minItems: 1,
              uniqueItems: !0,
              items: {
                type: "object",
                required: [ "key", "value" ],
                properties: {
                  key: {
                    type: "string",
                    minLength: 1,
                    maxLength: 128,
                    pattern: "^[a-zA-Z0-9_!#$%&'*+.^`|~-]+$"
                  },
                  value: {
                    type: "string",
                    minLength: 1,
                    maxLength: 2048,
                    pattern: "^[a-zA-Z0-9_!#$%&'*+.;/:, =^`|~-]+$"
                  }
                },
                additionalProperties: !1
              }
            }
          },
          additionalProperties: !1
        }
      },
      directoryListing: {
        type: [ "boolean", "array" ]
      },
      unlisted: {
        type: "array"
      },
      trailingSlash: {
        type: "boolean"
      },
      renderSingle: {
        type: "boolean"
      }
    },
    additionalProperties: !1
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var stringWidth = __webpack_require__(9), chalk = __webpack_require__(17), widestLine = __webpack_require__(71), cliBoxes = __webpack_require__(72), camelCase = __webpack_require__(73), ansiAlign = __webpack_require__(74), termSize = __webpack_require__(75), getObject = detail => "number" == typeof detail ? {
    top: detail,
    right: 3 * detail,
    bottom: detail,
    left: 3 * detail
  } : Object.assign({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, detail);
  module.exports = (text, opts) => {
    var x;
    if ((opts = Object.assign({
      padding: 0,
      borderStyle: "single",
      dimBorder: !1,
      align: "left",
      float: "left"
    }, opts)).backgroundColor && (opts.backgroundColor = (x = opts.backgroundColor, 
    camelCase("bg", x))), opts.borderColor && !chalk[opts.borderColor]) throw new Error(opts.borderColor + " is not a valid borderColor");
    if (opts.backgroundColor && !chalk[opts.backgroundColor]) throw new Error(opts.backgroundColor + " is not a valid backgroundColor");
    var chars = (borderStyle => {
      var chars;
      if ("string" == typeof borderStyle) {
        if (!(chars = cliBoxes[borderStyle])) throw new TypeError("Invalid border style: " + borderStyle);
      } else [ "topLeft", "topRight", "bottomRight", "bottomLeft", "vertical", "horizontal" ].forEach(key => {
        if (!borderStyle[key] || "string" != typeof borderStyle[key]) throw new TypeError("Invalid border style: " + key);
      }), chars = borderStyle;
      return chars;
    })(opts.borderStyle), padding = getObject(opts.padding), margin = getObject(opts.margin), colorizeBorder = x => {
      var ret = opts.borderColor ? chalk[opts.borderColor](x) : x;
      return opts.dimBorder ? chalk.dim(ret) : ret;
    };
    text = ansiAlign(text, {
      align: opts.align
    });
    var lines = text.split("\n");
    padding.top > 0 && (lines = Array(padding.top).fill("").concat(lines)), padding.bottom > 0 && (lines = lines.concat(Array(padding.bottom).fill("")));
    var contentWidth = widestLine(text) + padding.left + padding.right, paddingLeft = " ".repeat(padding.left), columns = termSize().columns, marginLeft = " ".repeat(margin.left);
    if ("center" === opts.float) {
      var padWidth = Math.max((columns - contentWidth) / 2, 0);
      marginLeft = " ".repeat(padWidth);
    } else if ("right" === opts.float) {
      var _padWidth = Math.max(columns - contentWidth - margin.right - 2, 0);
      marginLeft = " ".repeat(_padWidth);
    }
    var horizontal = chars.horizontal.repeat(contentWidth), top = colorizeBorder("\n".repeat(margin.top) + marginLeft + chars.topLeft + horizontal + chars.topRight), bottom = colorizeBorder(marginLeft + chars.bottomLeft + horizontal + chars.bottomRight + "\n".repeat(margin.bottom)), side = colorizeBorder(chars.vertical);
    return top + "\n" + lines.map(line => {
      var paddingRight = " ".repeat(contentWidth - stringWidth(line) - padding.left);
      return marginLeft + side + (x => opts.backgroundColor ? chalk[opts.backgroundColor](x) : x)(paddingLeft + line + paddingRight) + side;
    }).join("\n") + "\n" + bottom;
  }, module.exports._borderStyles = cliBoxes;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var ansiRegex = __webpack_require__(69);
  module.exports = input => "string" == typeof input ? input.replace(ansiRegex(), "") : input;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = () => {
    var pattern = [ "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))" ].join("|");
    return new RegExp(pattern, "g");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = x => !Number.isNaN(x) && (x >= 4352 && (x <= 4447 || 9001 === x || 9002 === x || 11904 <= x && x <= 12871 && 12351 !== x || 12880 <= x && x <= 19903 || 19968 <= x && x <= 42182 || 43360 <= x && x <= 43388 || 44032 <= x && x <= 55203 || 63744 <= x && x <= 64255 || 65040 <= x && x <= 65049 || 65072 <= x && x <= 65131 || 65281 <= x && x <= 65376 || 65504 <= x && x <= 65510 || 110592 <= x && x <= 110593 || 127488 <= x && x <= 127569 || 131072 <= x && x <= 262141));
}, function(module, exports, __webpack_require__) {
  "use strict";
  var stringWidth = __webpack_require__(9);
  module.exports = input => {
    var max = 0;
    for (var s of input.split("\n")) max = Math.max(max, stringWidth(s));
    return max;
  };
}, function(module) {
  module.exports = JSON.parse('{"single":{"topLeft":"┌","topRight":"┐","bottomRight":"┘","bottomLeft":"└","vertical":"│","horizontal":"─"},"double":{"topLeft":"╔","topRight":"╗","bottomRight":"╝","bottomLeft":"╚","vertical":"║","horizontal":"═"},"round":{"topLeft":"╭","topRight":"╮","bottomRight":"╯","bottomLeft":"╰","vertical":"│","horizontal":"─"},"single-double":{"topLeft":"╓","topRight":"╖","bottomRight":"╜","bottomLeft":"╙","vertical":"║","horizontal":"─"},"double-single":{"topLeft":"╒","topRight":"╕","bottomRight":"╛","bottomLeft":"╘","vertical":"│","horizontal":"═"},"classic":{"topLeft":"+","topRight":"+","bottomRight":"+","bottomLeft":"+","vertical":"|","horizontal":"-"}}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  function preserveCamelCase(str) {
    for (var isLastCharLower = !1, isLastCharUpper = !1, isLastLastCharUpper = !1, i = 0; i < str.length; i++) {
      var c = str[i];
      isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c ? (str = str.substr(0, i) + "-" + str.substr(i), 
      isLastCharLower = !1, isLastLastCharUpper = isLastCharUpper, isLastCharUpper = !0, 
      i++) : isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c ? (str = str.substr(0, i - 1) + "-" + str.substr(i - 1), 
      isLastLastCharUpper = isLastCharUpper, isLastCharUpper = !1, isLastCharLower = !0) : (isLastCharLower = c.toLowerCase() === c, 
      isLastLastCharUpper = isLastCharUpper, isLastCharUpper = c.toUpperCase() === c);
    }
    return str;
  }
  module.exports = function(str) {
    if (0 === (str = arguments.length > 1 ? Array.from(arguments).map(x => x.trim()).filter(x => x.length).join("-") : str.trim()).length) return "";
    if (1 === str.length) return str.toLowerCase();
    if (/^[a-z0-9]+$/.test(str)) return str;
    var hasUpperCase = str !== str.toLowerCase();
    return hasUpperCase && (str = preserveCamelCase(str)), str.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var stringWidth = __webpack_require__(9);
  function ansiAlign(text, opts) {
    if (!text) return text;
    var align = (opts = opts || {}).align || "center";
    if ("left" === align) return text;
    var width, split = opts.split || "\n", pad = opts.pad || " ", widthDiffFn = "right" !== align ? halfDiff : fullDiff, returnString = !1;
    Array.isArray(text) || (returnString = !0, text = String(text).split(split));
    var maxWidth = 0;
    return text = text.map((function(str) {
      return str = String(str), width = stringWidth(str), maxWidth = Math.max(width, maxWidth), 
      {
        str: str,
        width: width
      };
    })).map((function(obj) {
      return new Array(widthDiffFn(maxWidth, obj.width) + 1).join(pad) + obj.str;
    })), returnString ? text.join(split) : text;
  }
  function halfDiff(maxWidth, curWidth) {
    return Math.floor((maxWidth - curWidth) / 2);
  }
  function fullDiff(maxWidth, curWidth) {
    return maxWidth - curWidth;
  }
  ansiAlign.left = function(text) {
    return ansiAlign(text, {
      align: "left"
    });
  }, ansiAlign.center = function(text) {
    return ansiAlign(text, {
      align: "center"
    });
  }, ansiAlign.right = function(text) {
    return ansiAlign(text, {
      align: "right"
    });
  }, module.exports = ansiAlign;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(0), execa = __webpack_require__(4), create = (columns, rows) => ({
    columns: parseInt(columns, 10),
    rows: parseInt(rows, 10)
  });
  module.exports = () => {
    var env = process.env, stdout = process.stdout, stderr = process.stderr;
    if (stdout && stdout.columns && stdout.rows) return create(stdout.columns, stdout.rows);
    if (stderr && stderr.columns && stderr.rows) return create(stderr.columns, stderr.rows);
    if (env.COLUMNS && env.LINES) return create(env.COLUMNS, env.LINES);
    if ("win32" === process.platform) try {
      var size = execa.sync(path.join(__dirname, "vendor/windows/term-size.exe")).stdout.split(/\r?\n/);
      if (2 === size.length) return create(size[0], size[1]);
    } catch (err) {} else {
      if ("darwin" === process.platform) try {
        var _size = execa.shellSync(path.join(__dirname, "vendor/macos/term-size")).stdout.split(/\r?\n/);
        if (2 === _size.length) return create(_size[0], _size[1]);
      } catch (err) {}
      try {
        var _size2 = execa.sync("resize", [ "-u" ]).stdout.match(/\d+/g);
        if (2 === _size2.length) return create(_size2[0], _size2[1]);
      } catch (err) {}
      try {
        var columns = execa.sync("tput", [ "cols" ]).stdout, rows = execa.sync("tput", [ "lines" ]).stdout;
        if (columns && rows) return create(columns, rows);
      } catch (err) {}
    }
    return create(80, 24);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var accepts = __webpack_require__(77), Buffer = __webpack_require__(16).Buffer, bytes = __webpack_require__(20), compressible = __webpack_require__(83), debug = __webpack_require__(84)("compression"), onHeaders = __webpack_require__(89), vary = __webpack_require__(90), zlib = __webpack_require__(91);
  module.exports = function(options) {
    var opts = options || {}, filter = opts.filter || shouldCompress, threshold = bytes.parse(opts.threshold);
    null == threshold && (threshold = 1024);
    return function(req, res, next) {
      var length, stream, ended = !1, listeners = [], _end = res.end, _on = res.on, _write = res.write;
      function nocompress(msg) {
        debug("no compression: %s", msg), addListeners(res, _on, listeners), listeners = null;
      }
      res.flush = function() {
        stream && stream.flush();
      }, res.write = function(chunk, encoding) {
        return !ended && (this._header || this._implicitHeader(), stream ? stream.write(Buffer.from(chunk, encoding)) : _write.call(this, chunk, encoding));
      }, res.end = function(chunk, encoding) {
        return !ended && (this._header || (this.getHeader("Content-Length") || (length = function(chunk, encoding) {
          if (!chunk) return 0;
          return Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, encoding);
        }(chunk, encoding)), this._implicitHeader()), stream ? (ended = !0, chunk ? stream.end(Buffer.from(chunk, encoding)) : stream.end()) : _end.call(this, chunk, encoding));
      }, res.on = function(type, listener) {
        return listeners && "drain" === type ? stream ? stream.on(type, listener) : (listeners.push([ type, listener ]), 
        this) : _on.call(this, type, listener);
      }, onHeaders(res, (function() {
        if (filter(req, res)) if (function(req, res) {
          var cacheControl = res.getHeader("Cache-Control");
          return !cacheControl || !cacheControlNoTransformRegExp.test(cacheControl);
        }(0, res)) if (vary(res, "Accept-Encoding"), Number(res.getHeader("Content-Length")) < threshold || length < threshold) nocompress("size below threshold"); else if ("identity" === (res.getHeader("Content-Encoding") || "identity")) if ("HEAD" !== req.method) {
          var accept = accepts(req), method = accept.encoding([ "gzip", "deflate", "identity" ]);
          "deflate" === method && accept.encoding([ "gzip" ]) && (method = accept.encoding([ "gzip", "identity" ])), 
          method && "identity" !== method ? (debug("%s compression", method), addListeners(stream = "gzip" === method ? zlib.createGzip(opts) : zlib.createDeflate(opts), stream.on, listeners), 
          res.setHeader("Content-Encoding", method), res.removeHeader("Content-Length"), stream.on("data", (function(chunk) {
            !1 === _write.call(res, chunk) && stream.pause();
          })), stream.on("end", (function() {
            _end.call(res);
          })), _on.call(res, "drain", (function() {
            stream.resume();
          }))) : nocompress("not acceptable");
        } else nocompress("HEAD request"); else nocompress("already encoded"); else nocompress("no transform"); else nocompress("filtered");
      })), next();
    };
  }, module.exports.filter = shouldCompress;
  var cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/;
  function addListeners(stream, on, listeners) {
    for (var i = 0; i < listeners.length; i++) on.apply(stream, listeners[i]);
  }
  function shouldCompress(req, res) {
    var type = res.getHeader("Content-Type");
    return !(void 0 === type || !compressible(type)) || (debug("%s not compressible", type), 
    !1);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  var Negotiator = __webpack_require__(78), mime = __webpack_require__(18);
  function Accepts(req) {
    if (!(this instanceof Accepts)) return new Accepts(req);
    this.headers = req.headers, this.negotiator = new Negotiator(req);
  }
  function extToMime(type) {
    return -1 === type.indexOf("/") ? mime.lookup(type) : type;
  }
  function validMime(type) {
    return "string" == typeof type;
  }
  module.exports = Accepts, Accepts.prototype.type = Accepts.prototype.types = function(types_) {
    var types = types_;
    if (types && !Array.isArray(types)) {
      types = new Array(arguments.length);
      for (var i = 0; i < types.length; i++) types[i] = arguments[i];
    }
    if (!types || 0 === types.length) return this.negotiator.mediaTypes();
    if (!this.headers.accept) return types[0];
    var mimes = types.map(extToMime), accepts = this.negotiator.mediaTypes(mimes.filter(validMime)), first = accepts[0];
    return !!first && types[mimes.indexOf(first)];
  }, Accepts.prototype.encoding = Accepts.prototype.encodings = function(encodings_) {
    var encodings = encodings_;
    if (encodings && !Array.isArray(encodings)) {
      encodings = new Array(arguments.length);
      for (var i = 0; i < encodings.length; i++) encodings[i] = arguments[i];
    }
    return encodings && 0 !== encodings.length ? this.negotiator.encodings(encodings)[0] || !1 : this.negotiator.encodings();
  }, Accepts.prototype.charset = Accepts.prototype.charsets = function(charsets_) {
    var charsets = charsets_;
    if (charsets && !Array.isArray(charsets)) {
      charsets = new Array(arguments.length);
      for (var i = 0; i < charsets.length; i++) charsets[i] = arguments[i];
    }
    return charsets && 0 !== charsets.length ? this.negotiator.charsets(charsets)[0] || !1 : this.negotiator.charsets();
  }, Accepts.prototype.lang = Accepts.prototype.langs = Accepts.prototype.language = Accepts.prototype.languages = function(languages_) {
    var languages = languages_;
    if (languages && !Array.isArray(languages)) {
      languages = new Array(arguments.length);
      for (var i = 0; i < languages.length; i++) languages[i] = arguments[i];
    }
    return languages && 0 !== languages.length ? this.negotiator.languages(languages)[0] || !1 : this.negotiator.languages();
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var modules = Object.create(null);
  function Negotiator(request) {
    if (!(this instanceof Negotiator)) return new Negotiator(request);
    this.request = request;
  }
  function loadModule(moduleName) {
    var module = modules[moduleName];
    if (void 0 !== module) return module;
    switch (moduleName) {
     case "charset":
      module = __webpack_require__(79);
      break;

     case "encoding":
      module = __webpack_require__(80);
      break;

     case "language":
      module = __webpack_require__(81);
      break;

     case "mediaType":
      module = __webpack_require__(82);
      break;

     default:
      throw new Error("Cannot find module '" + moduleName + "'");
    }
    return modules[moduleName] = module, module;
  }
  module.exports = Negotiator, module.exports.Negotiator = Negotiator, Negotiator.prototype.charset = function(available) {
    var set = this.charsets(available);
    return set && set[0];
  }, Negotiator.prototype.charsets = function(available) {
    return (0, loadModule("charset").preferredCharsets)(this.request.headers["accept-charset"], available);
  }, Negotiator.prototype.encoding = function(available) {
    var set = this.encodings(available);
    return set && set[0];
  }, Negotiator.prototype.encodings = function(available) {
    return (0, loadModule("encoding").preferredEncodings)(this.request.headers["accept-encoding"], available);
  }, Negotiator.prototype.language = function(available) {
    var set = this.languages(available);
    return set && set[0];
  }, Negotiator.prototype.languages = function(available) {
    return (0, loadModule("language").preferredLanguages)(this.request.headers["accept-language"], available);
  }, Negotiator.prototype.mediaType = function(available) {
    var set = this.mediaTypes(available);
    return set && set[0];
  }, Negotiator.prototype.mediaTypes = function(available) {
    return (0, loadModule("mediaType").preferredMediaTypes)(this.request.headers.accept, available);
  }, Negotiator.prototype.preferredCharset = Negotiator.prototype.charset, Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets, 
  Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding, Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings, 
  Negotiator.prototype.preferredLanguage = Negotiator.prototype.language, Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages, 
  Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType, Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = preferredCharsets, module.exports.preferredCharsets = preferredCharsets;
  var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function parseCharset(str, i) {
    var match = simpleCharsetRegExp.exec(str);
    if (!match) return null;
    var charset = match[1], q = 1;
    if (match[2]) for (var params = match[2].split(";"), j = 0; j < params.length; j++) {
      var p = params[j].trim().split("=");
      if ("q" === p[0]) {
        q = parseFloat(p[1]);
        break;
      }
    }
    return {
      charset: charset,
      q: q,
      i: i
    };
  }
  function specify(charset, spec, index) {
    var s = 0;
    if (spec.charset.toLowerCase() === charset.toLowerCase()) s |= 1; else if ("*" !== spec.charset) return null;
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s: s
    };
  }
  function preferredCharsets(accept, provided) {
    var accepts = function(accept) {
      for (var accepts = accept.split(","), i = 0, j = 0; i < accepts.length; i++) {
        var charset = parseCharset(accepts[i].trim(), i);
        charset && (accepts[j++] = charset);
      }
      return accepts.length = j, accepts;
    }(void 0 === accept ? "*" : accept || "");
    if (!provided) return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
    var priorities = provided.map((function(type, index) {
      return function(charset, accepted, index) {
        for (var priority = {
          o: -1,
          q: 0,
          s: 0
        }, i = 0; i < accepted.length; i++) {
          var spec = specify(charset, accepted[i], index);
          spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0 && (priority = spec);
        }
        return priority;
      }(type, accepts, index);
    }));
    return priorities.filter(isQuality).sort(compareSpecs).map((function(priority) {
      return provided[priorities.indexOf(priority)];
    }));
  }
  function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
  }
  function getFullCharset(spec) {
    return spec.charset;
  }
  function isQuality(spec) {
    return spec.q > 0;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = preferredEncodings, module.exports.preferredEncodings = preferredEncodings;
  var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function parseEncoding(str, i) {
    var match = simpleEncodingRegExp.exec(str);
    if (!match) return null;
    var encoding = match[1], q = 1;
    if (match[2]) for (var params = match[2].split(";"), j = 0; j < params.length; j++) {
      var p = params[j].trim().split("=");
      if ("q" === p[0]) {
        q = parseFloat(p[1]);
        break;
      }
    }
    return {
      encoding: encoding,
      q: q,
      i: i
    };
  }
  function specify(encoding, spec, index) {
    var s = 0;
    if (spec.encoding.toLowerCase() === encoding.toLowerCase()) s |= 1; else if ("*" !== spec.encoding) return null;
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s: s
    };
  }
  function preferredEncodings(accept, provided) {
    var accepts = function(accept) {
      for (var accepts = accept.split(","), hasIdentity = !1, minQuality = 1, i = 0, j = 0; i < accepts.length; i++) {
        var encoding = parseEncoding(accepts[i].trim(), i);
        encoding && (accepts[j++] = encoding, hasIdentity = hasIdentity || specify("identity", encoding), 
        minQuality = Math.min(minQuality, encoding.q || 1));
      }
      return hasIdentity || (accepts[j++] = {
        encoding: "identity",
        q: minQuality,
        i: i
      }), accepts.length = j, accepts;
    }(accept || "");
    if (!provided) return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
    var priorities = provided.map((function(type, index) {
      return function(encoding, accepted, index) {
        for (var priority = {
          o: -1,
          q: 0,
          s: 0
        }, i = 0; i < accepted.length; i++) {
          var spec = specify(encoding, accepted[i], index);
          spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0 && (priority = spec);
        }
        return priority;
      }(type, accepts, index);
    }));
    return priorities.filter(isQuality).sort(compareSpecs).map((function(priority) {
      return provided[priorities.indexOf(priority)];
    }));
  }
  function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
  }
  function getFullEncoding(spec) {
    return spec.encoding;
  }
  function isQuality(spec) {
    return spec.q > 0;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = preferredLanguages, module.exports.preferredLanguages = preferredLanguages;
  var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
  function parseLanguage(str, i) {
    var match = simpleLanguageRegExp.exec(str);
    if (!match) return null;
    var prefix = match[1], suffix = match[2], full = prefix;
    suffix && (full += "-" + suffix);
    var q = 1;
    if (match[3]) for (var params = match[3].split(";"), j = 0; j < params.length; j++) {
      var p = params[j].split("=");
      "q" === p[0] && (q = parseFloat(p[1]));
    }
    return {
      prefix: prefix,
      suffix: suffix,
      q: q,
      i: i,
      full: full
    };
  }
  function specify(language, spec, index) {
    var p = parseLanguage(language);
    if (!p) return null;
    var s = 0;
    if (spec.full.toLowerCase() === p.full.toLowerCase()) s |= 4; else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) s |= 2; else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) s |= 1; else if ("*" !== spec.full) return null;
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s: s
    };
  }
  function preferredLanguages(accept, provided) {
    var accepts = function(accept) {
      for (var accepts = accept.split(","), i = 0, j = 0; i < accepts.length; i++) {
        var language = parseLanguage(accepts[i].trim(), i);
        language && (accepts[j++] = language);
      }
      return accepts.length = j, accepts;
    }(void 0 === accept ? "*" : accept || "");
    if (!provided) return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
    var priorities = provided.map((function(type, index) {
      return function(language, accepted, index) {
        for (var priority = {
          o: -1,
          q: 0,
          s: 0
        }, i = 0; i < accepted.length; i++) {
          var spec = specify(language, accepted[i], index);
          spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0 && (priority = spec);
        }
        return priority;
      }(type, accepts, index);
    }));
    return priorities.filter(isQuality).sort(compareSpecs).map((function(priority) {
      return provided[priorities.indexOf(priority)];
    }));
  }
  function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
  }
  function getFullLanguage(spec) {
    return spec.full;
  }
  function isQuality(spec) {
    return spec.q > 0;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = preferredMediaTypes, module.exports.preferredMediaTypes = preferredMediaTypes;
  var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
  function parseAccept(accept) {
    for (var accepts = function(accept) {
      for (var accepts = accept.split(","), i = 1, j = 0; i < accepts.length; i++) quoteCount(accepts[j]) % 2 == 0 ? accepts[++j] = accepts[i] : accepts[j] += "," + accepts[i];
      return accepts.length = j + 1, accepts;
    }(accept), i = 0, j = 0; i < accepts.length; i++) {
      var mediaType = parseMediaType(accepts[i].trim(), i);
      mediaType && (accepts[j++] = mediaType);
    }
    return accepts.length = j, accepts;
  }
  function parseMediaType(str, i) {
    var match = simpleMediaTypeRegExp.exec(str);
    if (!match) return null;
    var params = Object.create(null), q = 1, subtype = match[2], type = match[1];
    if (match[3]) for (var kvps = function(str) {
      for (var parameters = str.split(";"), i = 1, j = 0; i < parameters.length; i++) quoteCount(parameters[j]) % 2 == 0 ? parameters[++j] = parameters[i] : parameters[j] += ";" + parameters[i];
      parameters.length = j + 1;
      for (i = 0; i < parameters.length; i++) parameters[i] = parameters[i].trim();
      return parameters;
    }(match[3]).map(splitKeyValuePair), j = 0; j < kvps.length; j++) {
      var pair = kvps[j], key = pair[0].toLowerCase(), val = pair[1], value = val && '"' === val[0] && '"' === val[val.length - 1] ? val.substr(1, val.length - 2) : val;
      if ("q" === key) {
        q = parseFloat(value);
        break;
      }
      params[key] = value;
    }
    return {
      type: type,
      subtype: subtype,
      params: params,
      q: q,
      i: i
    };
  }
  function specify(type, spec, index) {
    var p = parseMediaType(type), s = 0;
    if (!p) return null;
    if (spec.type.toLowerCase() == p.type.toLowerCase()) s |= 4; else if ("*" != spec.type) return null;
    if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) s |= 2; else if ("*" != spec.subtype) return null;
    var keys = Object.keys(spec.params);
    if (keys.length > 0) {
      if (!keys.every((function(k) {
        return "*" == spec.params[k] || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
      }))) return null;
      s |= 1;
    }
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s: s
    };
  }
  function preferredMediaTypes(accept, provided) {
    var accepts = parseAccept(void 0 === accept ? "*/*" : accept || "");
    if (!provided) return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
    var priorities = provided.map((function(type, index) {
      return function(type, accepted, index) {
        for (var priority = {
          o: -1,
          q: 0,
          s: 0
        }, i = 0; i < accepted.length; i++) {
          var spec = specify(type, accepted[i], index);
          spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0 && (priority = spec);
        }
        return priority;
      }(type, accepts, index);
    }));
    return priorities.filter(isQuality).sort(compareSpecs).map((function(priority) {
      return provided[priorities.indexOf(priority)];
    }));
  }
  function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
  }
  function getFullType(spec) {
    return spec.type + "/" + spec.subtype;
  }
  function isQuality(spec) {
    return spec.q > 0;
  }
  function quoteCount(string) {
    for (var count = 0, index = 0; -1 !== (index = string.indexOf('"', index)); ) count++, 
    index++;
    return count;
  }
  function splitKeyValuePair(str) {
    var key, val, index = str.indexOf("=");
    return -1 === index ? key = str : (key = str.substr(0, index), val = str.substr(index + 1)), 
    [ key, val ];
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  var db = __webpack_require__(19), COMPRESSIBLE_TYPE_REGEXP = /^text\/|\+(?:json|text|xml)$/i, EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
  module.exports = function(type) {
    if (!type || "string" != typeof type) return !1;
    var match = EXTRACT_TYPE_REGEXP.exec(type), mime = match && match[1].toLowerCase(), data = db[mime];
    if (data && void 0 !== data.compressible) return data.compressible;
    return COMPRESSIBLE_TYPE_REGEXP.test(mime) || void 0;
  };
}, function(module, exports, __webpack_require__) {
  var tty = __webpack_require__(85), util = __webpack_require__(2);
  (exports = module.exports = __webpack_require__(86)).init = function(debug) {
    debug.inspectOpts = {};
    for (var keys = Object.keys(exports.inspectOpts), i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }, exports.log = function() {
    return stream.write(util.format.apply(util, arguments) + "\n");
  }, exports.formatArgs = function(args) {
    var name = this.namespace;
    if (this.useColors) {
      var c = this.color, prefix = "  [3" + c + ";1m" + name + " [0m";
      args[0] = prefix + args[0].split("\n").join("\n" + prefix), args.push("[3" + c + "m+" + exports.humanize(this.diff) + "[0m");
    } else args[0] = (new Date).toUTCString() + " " + name + " " + args[0];
  }, exports.save = function(namespaces) {
    null == namespaces ? delete process.env.DEBUG : process.env.DEBUG = namespaces;
  }, exports.load = load, exports.useColors = function() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
  }, exports.colors = [ 6, 2, 3, 4, 5, 1 ], exports.inspectOpts = Object.keys(process.env).filter((function(key) {
    return /^debug_/i.test(key);
  })).reduce((function(obj, key) {
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (function(_, k) {
      return k.toUpperCase();
    })), val = process.env[key];
    return val = !!/^(yes|on|true|enabled)$/i.test(val) || !/^(no|off|false|disabled)$/i.test(val) && ("null" === val ? null : Number(val)), 
    obj[prop] = val, obj;
  }), {});
  var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
  1 !== fd && 2 !== fd && util.deprecate((function() {}), "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
  var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : function(fd) {
    var stream;
    switch (process.binding("tty_wrap").guessHandleType(fd)) {
     case "TTY":
      (stream = new tty.WriteStream(fd))._type = "tty", stream._handle && stream._handle.unref && stream._handle.unref();
      break;

     case "FILE":
      var fs = __webpack_require__(1);
      (stream = new fs.SyncWriteStream(fd, {
        autoClose: !1
      }))._type = "fs";
      break;

     case "PIPE":
     case "TCP":
      var net = __webpack_require__(88);
      (stream = new net.Socket({
        fd: fd,
        readable: !1,
        writable: !0
      })).readable = !1, stream.read = null, stream._type = "pipe", stream._handle && stream._handle.unref && stream._handle.unref();
      break;

     default:
      throw new Error("Implement me. Unknown stream file type!");
    }
    return stream.fd = fd, stream._isStdio = !0, stream;
  }(fd);
  function load() {
    return process.env.DEBUG;
  }
  exports.formatters.o = function(v) {
    return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts).split("\n").map((function(str) {
      return str.trim();
    })).join(" ");
  }, exports.formatters.O = function(v) {
    return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts);
  }, exports.enable(load());
}, function(module, exports) {
  module.exports = require("tty");
}, function(module, exports, __webpack_require__) {
  var prevTime;
  function createDebug(namespace) {
    function debug() {
      if (debug.enabled) {
        var self = debug, curr = +new Date, ms = curr - (prevTime || curr);
        self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr;
        for (var args = new Array(arguments.length), i = 0; i < args.length; i++) args[i] = arguments[i];
        args[0] = exports.coerce(args[0]), "string" != typeof args[0] && args.unshift("%O");
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (function(match, format) {
          if ("%%" === match) return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" == typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val), args.splice(index, 1), index--;
          }
          return match;
        })), exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
    }
    return debug.namespace = namespace, debug.enabled = exports.enabled(namespace), 
    debug.useColors = exports.useColors(), debug.color = function(namespace) {
      var i, hash = 0;
      for (i in namespace) hash = (hash << 5) - hash + namespace.charCodeAt(i), hash |= 0;
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }(namespace), "function" == typeof exports.init && exports.init(debug), debug;
  }
  (exports = module.exports = createDebug.debug = createDebug.default = createDebug).coerce = function(val) {
    return val instanceof Error ? val.stack || val.message : val;
  }, exports.disable = function() {
    exports.enable("");
  }, exports.enable = function(namespaces) {
    exports.save(namespaces), exports.names = [], exports.skips = [];
    for (var split = ("string" == typeof namespaces ? namespaces : "").split(/[\s,]+/), len = split.length, i = 0; i < len; i++) split[i] && ("-" === (namespaces = split[i].replace(/\*/g, ".*?"))[0] ? exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$")) : exports.names.push(new RegExp("^" + namespaces + "$")));
  }, exports.enabled = function(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) if (exports.skips[i].test(name)) return !1;
    for (i = 0, len = exports.names.length; i < len; i++) if (exports.names[i].test(name)) return !0;
    return !1;
  }, exports.humanize = __webpack_require__(87), exports.names = [], exports.skips = [], 
  exports.formatters = {};
}, function(module, exports) {
  var s = 1e3, m = 6e4, h = 60 * m, d = 24 * h;
  function plural(ms, n, name) {
    if (!(ms < n)) return ms < 1.5 * n ? Math.floor(ms / n) + " " + name : Math.ceil(ms / n) + " " + name + "s";
  }
  module.exports = function(val, options) {
    options = options || {};
    var ms, type = typeof val;
    if ("string" === type && val.length > 0) return function(str) {
      if ((str = String(str)).length > 100) return;
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
      if (!match) return;
      var n = parseFloat(match[1]);
      switch ((match[2] || "ms").toLowerCase()) {
       case "years":
       case "year":
       case "yrs":
       case "yr":
       case "y":
        return 315576e5 * n;

       case "days":
       case "day":
       case "d":
        return n * d;

       case "hours":
       case "hour":
       case "hrs":
       case "hr":
       case "h":
        return n * h;

       case "minutes":
       case "minute":
       case "mins":
       case "min":
       case "m":
        return n * m;

       case "seconds":
       case "second":
       case "secs":
       case "sec":
       case "s":
        return n * s;

       case "milliseconds":
       case "millisecond":
       case "msecs":
       case "msec":
       case "ms":
        return n;

       default:
        return;
      }
    }(val);
    if ("number" === type && !1 === isNaN(val)) return options.long ? plural(ms = val, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms" : function(ms) {
      if (ms >= d) return Math.round(ms / d) + "d";
      if (ms >= h) return Math.round(ms / h) + "h";
      if (ms >= m) return Math.round(ms / m) + "m";
      if (ms >= s) return Math.round(ms / s) + "s";
      return ms + "ms";
    }(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
}, function(module, exports) {
  module.exports = require("net");
}, function(module, exports, __webpack_require__) {
  "use strict";
  function setHeadersFromArray(res, headers) {
    for (var i = 0; i < headers.length; i++) res.setHeader(headers[i][0], headers[i][1]);
  }
  function setHeadersFromObject(res, headers) {
    for (var keys = Object.keys(headers), i = 0; i < keys.length; i++) {
      var k = keys[i];
      k && res.setHeader(k, headers[k]);
    }
  }
  function setWriteHeadHeaders(statusCode) {
    var length = arguments.length, headerIndex = length > 1 && "string" == typeof arguments[1] ? 2 : 1, headers = length >= headerIndex + 1 ? arguments[headerIndex] : void 0;
    this.statusCode = statusCode, Array.isArray(headers) ? setHeadersFromArray(this, headers) : headers && setHeadersFromObject(this, headers);
    for (var args = new Array(Math.min(length, headerIndex)), i = 0; i < args.length; i++) args[i] = arguments[i];
    return args;
  }
  module.exports = function(res, listener) {
    if (!res) throw new TypeError("argument res is required");
    if ("function" != typeof listener) throw new TypeError("argument listener must be a function");
    res.writeHead = function(prevWriteHead, listener) {
      var fired = !1;
      return function(statusCode) {
        var args = setWriteHeadHeaders.apply(this, arguments);
        return fired || (fired = !0, listener.call(this), "number" == typeof args[0] && this.statusCode !== args[0] && (args[0] = this.statusCode, 
        args.length = 1)), prevWriteHead.apply(this, args);
      };
    }(res.writeHead, listener);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(res, field) {
    if (!res || !res.getHeader || !res.setHeader) throw new TypeError("res argument is required");
    var val = res.getHeader("Vary") || "", header = Array.isArray(val) ? val.join(", ") : String(val);
    (val = append(header, field)) && res.setHeader("Vary", val);
  }, module.exports.append = append;
  var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
  function append(header, field) {
    if ("string" != typeof header) throw new TypeError("header argument is required");
    if (!field) throw new TypeError("field argument is required");
    for (var fields = Array.isArray(field) ? field : parse(String(field)), j = 0; j < fields.length; j++) if (!FIELD_NAME_REGEXP.test(fields[j])) throw new TypeError("field argument contains an invalid header name");
    if ("*" === header) return header;
    var val = header, vals = parse(header.toLowerCase());
    if (-1 !== fields.indexOf("*") || -1 !== vals.indexOf("*")) return "*";
    for (var i = 0; i < fields.length; i++) {
      var fld = fields[i].toLowerCase();
      -1 === vals.indexOf(fld) && (vals.push(fld), val = val ? val + ", " + fields[i] : fields[i]);
    }
    return val;
  }
  function parse(header) {
    for (var end = 0, list = [], start = 0, i = 0, len = header.length; i < len; i++) switch (header.charCodeAt(i)) {
     case 32:
      start === end && (start = end = i + 1);
      break;

     case 44:
      list.push(header.substring(start, end)), start = end = i + 1;
      break;

     default:
      end = i + 1;
    }
    return list.push(header.substring(start, end)), list;
  }
}, function(module, exports) {
  module.exports = require("zlib");
}, function(module) {
  module.exports = JSON.parse('{"name":"@nthachus/serve","version":"11.4.4","description":"CLI bundle of vercel/serve, static file serving and directory listing"}');
} ]);