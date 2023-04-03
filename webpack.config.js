'use strict';

const { BannerPlugin, CopyPlugin, TerserPlugin } = require('webpack');
const pkg = require('./package.json');

const patches = [
  { search: /^(\s*)-d, --debug\b/m, replace: `$1--virtual-path${' '.repeat(22)}Virtual directory for the server\n$&` },
  { search: /(-C, --cors)\t{6}/, replace: `$1${' '.repeat(24)}` },
  { search: / interface\b/g, replace: ' netInterface' },
  {
    search: /^(\s*)const serverHandler *= *async\b.*/m,
    replace:
      "$1const virtualPath = args['--virtual-path']\n\
        ? new RegExp(`^([^/]*//[^/]+)?/$${args['--virtual-path'].replace(/[^\\w\\s]/g, '\\\\$$&')}(/|$$)`, 'i')\n\
        : null;\n\
      $&\n\
        if (virtualPath) request.url = request.url.replace(virtualPath, '$$1/');",
  },
  {
    search: /^(\s*)let localAddress *= *null\b/m,
    replace: "$1const addressSuffix = args['--virtual-path'] ? `/$${args['--virtual-path']}` : '';\n$&",
  },
  { search: /^\s*localAddress *= *details\b/m, replace: '$& + addressSuffix' },
  { search: /:\$\{details\.port\}(?=`)/g, replace: '$&$${addressSuffix}' },
  { search: /\{\s*(public)\s*\}( *= *config)\b/, replace: '$1Dir$2.$1' },
  { search: /\b(public)( *\? *path\.resolve\(entry, *\1)\b/, replace: '$1Dir$2Dir' },
  { search: /^(\s*)'--listen': *\[\s*\w+\s*\].*/m, replace: "$&\n$1'--virtual-path': String," },
  {
    search: /^(\s*)if *\(args\._\.length *> *\d+\)/m,
    replace:
      "$1if (args['--virtual-path']) args['--virtual-path'] = args['--virtual-path'].replace(/^\\/|\\/$$/g, '');\n$&",
  },
  { search: /^(\s*config)\.etag *=.*/m, replace: "$&\n$1.virtualPath = args['--virtual-path'];" },
];

const handlerPatches = [
  {
    search: /^\s*details\.relative *= *path\.join\(/m,
    replace: "$&config.virtualPath ? `/${config.virtualPath}` : '', ",
  },
  { search: /^(\s*url:) *([^,\n]*)/m, replace: "$1 (config.virtualPath ? `${config.virtualPath}/` : '') + ($2)" },
  { search: /\b(const relative *= *path\.join\()'\/'/, replace: "$1`/${config.virtualPath || ''}`" },
];

const [nodeVersion] = /\d[\d.]*/.exec(pkg.engines.node);

/** Cleanup bundled file of URI.js */
const patchUriJS = (content) =>
  String(content)
    .replace(/(?<=^\/\*.*?\*\/)[\s\S]*\(this, *\(?function *\(exports\) *\{|\n\}\)\)+;?(?=\n\/\/#.*\s*$)/g, '')
    .replace(
      /^\s*for ?\(var _len *= *(arguments)\.length\b.*\) *\{\s+(\w+)(\[_key\]) *= *\1\3;?\s+\}/gm,
      'var $2 = Array.prototype.slice.call($1);'
    )
    .replace(/^var (slicedTo|toConsumable)Array *= *function\b.*\{\n[\s\S]*?\n\}(\(\))?;?$/gm, '')
    .replace(/\btoConsumableArray(?=\s*\()/g, 'Array.from')
    .replace(/\bslicedToArray\s*\(([\w$]+)[^()]*\)/g, '$1')
    .replace(
      /^(\s*)var _(iterator)NormalCompletion[\s\S]*?\n\s*for *\(var _\2\w* *= *(\w+)\[Symbol\.\2\].*\{\s+var (\w+) *= *_step\w*\.value;?$/gm,
      '$1for (var $4 of $3) {'
    )
    .replace(/^(\s*)\} *catch\b.*\{\s+_didIteratorError[\s\S]*?\n\1\}$/gm, '');

const templatePatches = [
  // fix _WEBPACK_ definition
  { search: /^\(function *\(\) *\{/, replace: '' },
  {
    search:
      /(\})\s*var (itself)=(\w+), *_encodeHTML=\([\s\S]*\);\s*if *\(typeof module\b[^()]*\) *(module\.exports=)\2;.*$/,
    replace: '$1\n$4$3;',
  },
  { search: " typeof _encodeHTML !== 'undefined'", replace: ' false' },
  // fix error HTML
  { search: ' html><head>', replace: ' html><html lang="en"><head> <meta charset="utf-8"/>' },
  { search: "</body>';", replace: "</body></html>';" },
  { search: ', user-scalable=no"/> <style', replace: '"/> <title>Error</title> <style' },
  // patch SVG icons
  {
    search: /\b(a\.file\.svg::before *\{\s*content: *url\("data:image\b[^,]*,).*?(<\/svg>")/,
    replace:
      "$1<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'15.2\\' height=\\'19\\' viewBox=\\'0 0 409.6 512\\'><path d=\\'M256.14 0H64A64 64 0 0 0 0 64v384a64 64 0 0 0 64 64h281.6a64 64 0 0 0 64-64V153.6zm104.15 140.8H307.2a38.44 38.44 0 0 1-38.4-38.4V49.08zM384 448a38.44 38.44 0 0 1-38.4 38.4H64A38.44 38.44 0 0 1 25.6 448V64A38.44 38.44 0 0 1 64 25.6h179.2v76.8a64 64 0 0 0 64 64H384zM275.2 243.2H134.4a32 32 0 0 0-32 32v115.2a32 32 0 0 0 32 32h140.8a32 32 0 0 0 32-32V275.2a32 32 0 0 0-32-32zm6.4 147.2a6.41 6.41 0 0 1-6.4 6.4H134.4a6.41 6.41 0 0 1-6.4-6.4V275.2a6.41 6.41 0 0 1 6.4-6.4h140.8a6.41 6.41 0 0 1 6.4 6.4zM140.8 384h128l-38.4-64-38.4 38.4-12.8-12.8z\\'/>$2",
  },
  {
    search: /\bul a\.lambda::before *\{\s*content: *url\("data:image\b.*?<\/svg>"\)/,
    replace: 'ul a.directory { font-weight: bold; }ul a.directory::before { content: ""',
  },
];

module.exports = {
  mode: 'production',
  entry: {
    // 'vendor/ajv': { import: './node_modules/ajv/lib/ajv', library: { type: 'commonjs2' } },
    // 'vendor/chalk': { import: './node_modules/chalk/index', library: { type: 'commonjs2' } },
    // 'vendor/execa': { import: './node_modules/execa/index', library: { type: 'commonjs2' } },
    index: './node_modules/serve/bin/serve',
  },
  output: { path: __dirname },
  context: __dirname,
  target: `node${nodeVersion}`,
  node: { __filename: false, __dirname: false },
  externals: {
    // ajv: 'commonjs2 ./vendor/ajv.js',
    // chalk: 'commonjs2 ./vendor/chalk.js',
    // execa: 'commonjs2 ./vendor/execa.js',
    'uri-js': 'commonjs ./vendor/uri-js.js',
    semver: 'commonjs2 ./vendor/semver.js',
    'mime-db': 'commonjs2 ./vendor/mime-db.json',
  },
  stats: { modulesSpace: Infinity },
  module: {
    rules: [
      {
        // transpile ES6-8 into ES5
        test: /node_modules[\\/]((chalk|ansi|supports|has)|(execa|cross|get|npm|path-key)|(boxen|camelcase|string|term|widest)|(arg|clipboardy|is-(wsl|docker)|serve|update))\b.*\.m?js$/i,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: nodeVersion },
                modules: 'cjs', // esmodules
                loose: true,
                exclude: [/^transform-(classes|for-of|regenerator|arrow|function)\b/],
              },
            ],
          ],
          plugins: [['@babel/plugin-transform-runtime', { version: '^7.8.4' }]],
        },
      },
      // apply patches
      {
        test: /node_modules[\\/]serve\b.bin.serve\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { multiple: patches },
      },
      {
        test: /node_modules[\\/]serve-handler\b.src.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { multiple: handlerPatches },
      },
      {
        test: /node_modules[\\/]serve.package\.json$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          search: /^[\s\S]*/,
          replace: JSON.stringify({ name: pkg.name, version: pkg.version, description: pkg.description }),
        },
      },
      {
        test: /node_modules[\\/]clipboardy\b.lib\b.[lw]\w*\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { search: /\.+\/fallbacks\//g, replace: 'vendor/' },
      },
      {
        test: /node_modules[\\/](serve\b.bin.serve|(serve-handler\b.src|update-check).index)\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { search: /\{\s*(promisify)\s*\}( *= *(require)\('util'\))/, replace: "$1$2.$1 || $3('tiny-$1')" },
      },
      {
        test: /node_modules[\\/]((tiny-promisify|strip-ansi).index|registry-auth-token.base64)\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { search: /^(\s*)const /gm, replace: '$1var ' },
      },
      // optimize output
      {
        test: /node_modules[\\/]ansi-styles.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          search: /^Object\.defineProperty\(module, *'exports', *\{[^{}]*\bget: *(\w+)[^{}]*\}\)/m,
          replace: 'module.exports = $1()',
        },
      },
      {
        test: /node_modules[\\/]serve-handler\b.src.(directory|error)\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { multiple: templatePatches },
      },
      {
        test: /node_modules[\\/]execa\b.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          multiple: [
            {
              search: /(= *)(require\('cross-spawn)('\))/,
              replace: '$1{ _parse: $2/lib/parse$3, _enoent: $2/lib/enoent$3 }',
            },
            {
              search: /(\(\.{3}args\)) *=> *(module\.exports)\1(.*);?$/gm,
              replace: 'function() { return $2.apply(null, arguments)$3; };',
            },
          ],
        },
      },
      {
        test: /node_modules[\\/]chalk.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          search: /^for *\(const (\w+) of (Object\.keys\([^()]*\))\) *(\{\n[\s\S]*?\n\})/gm,
          replace: (_, p1, p2, p3) => `${p2}.forEach(${p1} => ${p3.replace(/^(\s*)continue\b/m, '$1return')});`,
        },
      },
      /*{
        test: /node_modules[\\/]rc.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { search: /\brequire\('minimist'\)\(process\.argv\b([\w.]|\(\w*\))*\)/, replace: '{}' },
      },
      {
        test: /node_modules[\\/](ini.ini|content-disposition.index)\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { search: /^(exports\.(stringify|safe)|module\.exports\.parse) *=/gm, replace: '//$&' },
      },*/
    ],
  },
  resolve: {
    alias: { 'cli-boxes$': __dirname + '/node_modules/cli-boxes/boxes.json' },
  },
  plugins: [
    new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bindex\.js$/ }),
    new CopyPlugin({
      patterns: [
        { from: 'vendor/**', context: 'node_modules/term-size' },
        { from: '**', to: 'vendor/', context: 'node_modules/clipboardy/fallbacks' },
        { from: 'node_modules/uri-js/dist/es5/uri.all.js', to: 'vendor/uri-js.js', transform: patchUriJS },
        {
          from: 'node_modules/{semver/semver,mime-db/db}.js*',
          to: ({ absoluteFilename: f }) => `vendor/${f.replace(/^.*\bnode_modules[\\/]|[\\/].*$/g, '')}[ext]`,
        },
      ],
    }),
  ],
  optimization: {
    nodeEnv: false,
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        // cache: true,
        parallel: true,
        terserOptions: { mangle: false, output: { beautify: true, indent_level: 2 } },
        extractComments: { condition: 'some', banner: false },
      }),
    ],
  },
};
