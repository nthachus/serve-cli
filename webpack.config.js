'use strict';

const { BannerPlugin, CopyPlugin, TerserPlugin } = require('webpack');
const pkg = require('./package.json');

const patches = [
  {
    search: '^(\\s*)-d, --debug',
    flags: 'm',
    replace: '$1--virtual-path                      Virtual directory for the server\n$&',
  },
  { search: '(-C, --cors)\\t{6}', flags: '', replace: '$1                        ' },
  { search: ' interface of ', replace: ' netInterface of ' },
  { search: '} = interface;', replace: '} = netInterface;' },
  {
    search: '^(\\s*)const serverHandler = async .*',
    flags: 'm',
    replace:
      "$1const virtualPath = args['--virtual-path']\
        ? new RegExp(`^([^/]*//[^/]+)?/$${args['--virtual-path'].replace(/[^\\w\\s]/g, '\\\\$$&')}(/|$$)`, 'i')\
        : null;\
      $&\
        if (virtualPath) request.url = request.url.replace(virtualPath, '$$1/');",
  },
  {
    search: '^(\\s*)let localAddress = null',
    flags: 'm',
    replace: "$1const addressSuffix = args['--virtual-path'] ? `/$${args['--virtual-path']}` : '';\n$&",
  },
  { search: '^(\\s*localAddress = details);', flags: 'm', replace: '$1 + addressSuffix;' },
  { search: '(:\\$\\{details\\.port\\})`', flags: 'g', replace: '$1$${addressSuffix}`' },
  { search: '{public} = config;', replace: 'publicDir = config.public;' },
  { search: '(public ? path.resolve(entry, public)', replace: '(publicDir ? path.resolve(entry, publicDir)' },
  { search: "^(\\s*)'--listen': \\[parseEndpoint.*", flags: 'm', replace: "$&\n$1'--virtual-path': String," },
  {
    search: '^(\\s*)if \\(args\\._\\.length > 1\\)',
    flags: 'm',
    replace:
      "$1if (args['--virtual-path']) args['--virtual-path'] = args['--virtual-path'].replace(/^\\/|\\/$$/g, '');\n$&",
  },
  { search: '^(\\s*config)\\.etag = .*', flags: 'm', replace: "$&\n$1.virtualPath = args['--virtual-path'];" },
];

module.exports = {
  mode: 'production',
  entry: {
    index: './node_modules/serve/bin/serve',
    'vendor/ajv': './node_modules/ajv/lib/ajv',
    'vendor/chalk': './node_modules/chalk/index',
    'vendor/execa': './node_modules/execa/index',
  },
  output: { path: __dirname },
  context: __dirname,
  target: 'node',
  node: { __filename: false, __dirname: false },
  externals: {
    ajv: 'commonjs2 ./vendor/ajv',
    chalk: 'commonjs2 ./vendor/chalk',
    execa: 'commonjs2 ./vendor/execa',
    'mime-db': 'commonjs2 ./vendor/mime-db.json',
  },
  module: {
    rules: [
      {
        // transpile ES6-8 into ES5
        test: [
          /node_modules.(ansi|chalk|has|supports)\b.*\.m?js$/i,
          /node_modules.(cross|execa|get|npm|path-key)\b.*\.m?js$/i,
          /node_modules.(arg|boxen|camelcase|clipboardy|is-(docker|wsl)|serve|string|term|tiny|update|widest)\b.*\.m?js$/i,
          /node_modules.(registry-auth-token.base64|strip-ansi.index)\.js$/i,
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: /\d[\d.]*/.exec(pkg.engines.node)[0] },
                modules: false,
                loose: true,
                exclude: [/^transform-(classes|for-of|regenerator|arrow|function)\b/],
              },
            ],
          ],
        },
      },
      {
        test: /node_modules.serve.bin.serve\.js$/i,
        loader: 'string-replace-loader',
        options: {
          multiple: [...patches, { search: '^#!.*[\\r\\n]+', flags: '', replace: '' }],
        },
      },
      {
        test: /node_modules.serve-handler.src.index\.js$/i,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            {
              search: '^\\s*details\\.relative = path\\.join\\(',
              flags: 'm',
              replace: "$&config.virtualPath ? `/${config.virtualPath}` : '', ",
            },
            {
              search: '^(\\s*url:) ([^,\\n]*)',
              flags: 'm',
              replace: "$1 (config.virtualPath ? `${config.virtualPath}/` : '') + ($2)",
            },
            {
              search: "const relative = path.join('/'",
              replace: "const relative = path.join(`/${config.virtualPath || ''}`",
            },
          ],
        },
      },
      {
        test: /node_modules.(serve.bin.serve|(serve-handler.src|update-check).index)\.js$/i,
        loader: 'string-replace-loader',
        options: {
          search: "const {promisify} = require('util')",
          replace: "const promisify = require('util').promisify || require('tiny-promisify')",
        },
      },
      {
        test: /node_modules.serve.package\.json$/i,
        loader: 'string-replace-loader',
        options: {
          search: '^[\\s\\S]*',
          flags: '',
          replace: JSON.stringify({ name: pkg.name, version: pkg.version, description: pkg.description }),
        },
      },
      {
        test: /node_modules.clipboardy\b.*\.js$/i,
        loader: 'string-replace-loader',
        options: { search: '\\.+/fallbacks/', flags: 'g', replace: 'vendor/' },
      },
      {
        test: /node_modules.chalk.index\.js$/i,
        loader: 'string-replace-loader',
        options: {
          search: '^for \\(const (\\w+) of (Object\\.keys\\(.*?\\))\\) (\\{[\\s\\S]*?\\n\\})$',
          flags: 'gm',
          replace: (_, m1, m2, m3) => `${m2}.forEach(${m1} => ${m3.replace(/^(\s+)continue;?$/m, '$1return;')});`,
        },
      },
      {
        test: /node_modules.fast-url-parser.src.urlparser\.js$/i,
        loader: 'string-replace-loader',
        options: { search: ' require("punycode")', replace: ' require("../../punycode")' },
      },
      // optimize output
      {
        test: /node_modules.uri-js.dist.es5.uri\.all\.js$/i,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: "^[\\s\\S]*?\\{ ('use strict';[\\s\\S]*)\\n\\}\\){3};\\n.*", flags: '', replace: '$1' },
            { search: '^exports\\.(\\w+) = (?!parse|serialize|resolve\\b)\\1;$', flags: 'gm', replace: '// $&' },
          ],
        },
      },
      {
        test: /node_modules.punycode.punycode\.js$/i,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            {
              search: '^[\\s\\S]*?\\sroot = freeGlobal;\\s*\\}([\\s\\S]*)\\s/\\*+ Expose `punycode` \\*/[\\s\\S]*',
              flags: '',
              replace: '$1module.exports = punycode;',
            },
            { search: "^\\s+'(\\w+)': (?!toASCII)(ucs2)?\\1,?$", flags: 'gm', replace: '//$&' },
          ],
        },
      },
      {
        test: /node_modules.ansi-styles.index\.js$/i,
        loader: 'string-replace-loader',
        options: {
          search: "^Object\\.defineProperty\\(module, 'exports'[\\s\\S]*\\bget: (assembleStyles)[\\s\\S]*",
          flags: 'm',
          replace: 'module.exports = $1();',
        },
      },
      {
        test: /node_modules.cross-spawn.index\.js$/i,
        loader: 'string-replace-loader',
        options: { search: '^module\\.exports(\\.[^_]\\w*)? = spawn\\w*;$', flags: 'm', replace: '// $&' },
      },
      {
        test: /node_modules.cross-spawn.lib.enoent\.js$/i,
        loader: 'string-replace-loader',
        options: { search: '^[ \\t]+(verifyENOENTSync),$', flags: 'gm', replace: '//$&' },
      },
      {
        test: /node_modules.semver.semver\.js$/i,
        loader: 'string-replace-loader',
        options: { search: '^exports\\.([a-z]\\w*) = (?!satisfies)\\1$', flags: 'gm', replace: '// $&' },
      },
      {
        test: /node_modules.rc.index\.js$/i,
        loader: 'string-replace-loader',
        options: { search: "= require('minimist')(process.argv.slice(2))", replace: '= {}' },
      },
      {
        test: /node_modules.ini.ini\.js$/i,
        loader: 'string-replace-loader',
        options: { search: '^exports\\.(?!parse|unsafe)\\w+ = \\w+', flags: 'gm', replace: '// $&' },
      },
      {
        test: /node_modules.boxen.index\.js$/i,
        loader: 'string-replace-loader',
        options: { search: "= require('cli-boxes')", replace: "= require('cli-boxes/boxes.json')" },
      },
      {
        test: /node_modules.compression.index\.js$/i,
        loader: 'string-replace-loader',
        options: { search: "= require('debug')", replace: "= require('debug/src/node')" },
      },
      {
        test: /node_modules.mime-types.index\.js$/i,
        loader: 'string-replace-loader',
        options: { search: '^exports\\.(extension) = \\1;?$', flags: 'gm', replace: '// $&' },
      },
      {
        test: /node_modules.content-disposition.index\.js$/i,
        loader: 'string-replace-loader',
        options: { search: '^module\\.exports\\.(parse) = \\1;?$', flags: 'gm', replace: '// $&' },
      },
      {
        test: /node_modules.serve-handler.src.(directory|error)\.js$/i,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: '^\\(function\\(\\)\\{', flags: '', replace: '' },
            {
              search:
                '(\\}var itself=(\\w+), _encodeHTML=\\([\\s\\S]*\\);)if\\(typeof module[^)]*\\) (module\\.exports=)itself;.*$',
              flags: '',
              replace: '$1\n$3$2;',
            },
            { search: " typeof _encodeHTML !== 'undefined'", replace: 'true' },
            { search: ' html><head>', replace: ' html><html lang="en"><head> <meta charset="utf-8"/>' },
            { search: ', user-scalable=no"/> <style', replace: '"/> <title>Error</title> <style' },
            { search: "</body>';return ", replace: "</body></html>';return " },
            {
              search: '( a\\.file\\.svg::before \\{ content: url\\("data:image/svg\\+xml;utf8,).*?(</svg>"\\))',
              flags: '',
              replace:
                "$1<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'15.2\\' height=\\'19\\' viewBox=\\'0 0 409.6 512\\'><path d=\\'M256.14 0H64A64 64 0 0 0 0 64v384a64 64 0 0 0 64 64h281.6a64 64 0 0 0 64-64V153.6zm104.15 140.8H307.2a38.44 38.44 0 0 1-38.4-38.4V49.08zM384 448a38.44 38.44 0 0 1-38.4 38.4H64A38.44 38.44 0 0 1 25.6 448V64A38.44 38.44 0 0 1 64 25.6h179.2v76.8a64 64 0 0 0 64 64H384zM275.2 243.2H134.4a32 32 0 0 0-32 32v115.2a32 32 0 0 0 32 32h140.8a32 32 0 0 0 32-32V275.2a32 32 0 0 0-32-32zm6.4 147.2a6.41 6.41 0 0 1-6.4 6.4H134.4a6.41 6.41 0 0 1-6.4-6.4V275.2a6.41 6.41 0 0 1 6.4-6.4h140.8a6.41 6.41 0 0 1 6.4 6.4zM140.8 384h128l-38.4-64-38.4 38.4-12.8-12.8z\\'/>$2",
            },
            {
              search: '\\bul a\\.lambda::before \\{ content: url\\("data:image/svg\\+xml;.*?</svg>"\\)',
              flags: '',
              replace: 'ul a.directory { font-weight: bold; }ul a.directory::before { content: ""',
            },
          ],
        },
      },
    ],
  },
  plugins: [
    new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /index\.js$/i }),
    new CopyPlugin([
      { from: 'node_modules/clipboardy/fallbacks', to: 'vendor/', ignore: ['.DS_Store'] },
      { from: 'node_modules/term-size/vendor', to: 'vendor/', ignore: ['.DS_Store'] },
      { from: 'node_modules/mime-db/db.json', to: 'vendor/mime-db.json' },
    ]),
    new BannerPlugin({ banner: 'module.exports =', raw: true, test: /(?<!index)\.js$/i }),
  ],
  optimization: {
    nodeEnv: false,
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: { mangle: false, output: { comments: false, beautify: true, indent_level: 2 } },
        extractComments: false,
      }),
    ],
  },
};
