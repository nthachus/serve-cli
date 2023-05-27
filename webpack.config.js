'use strict';

const { BannerPlugin, CopyPlugin, TerserPlugin, ReplaceCodePlugin } = require('webpack');
const pkg = require('./package.json');

const [nodeVersion] = /\d[\d.]*/.exec(pkg.engines.node);

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
        test: /\.m?js$/i,
        include: [
          /node_modules[\\/](chalk|ansi|supports|has)\b/,
          /node_modules[\\/](execa|cross|get|npm|path-key)\b/,
          /node_modules[\\/](boxen|camelcase|string|term|widest)\b/,
          /node_modules[\\/](arg|clipboardy|is-(wsl|docker)|serve|update)\b/,
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: nodeVersion },
                // esmodules
                loose: true,
                exclude: [/^transform-(classes|for-of|regenerator|arrow|function)\b/],
              },
            ],
          ],
          plugins: [
            ['@babel/preset-env/plugins/transform-modules-commonjs', { importInterop: 'node' }],
            ['@babel/plugin-transform-runtime', { version: '7.17.9' }],
          ],
        },
      },
      // apply patches
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
      // optimize output
      /*{
        test: /node_modules[\\/]rc.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { search: /\brequire\('minimist'\)\(process\.argv\b([\w.]|\(\w*\))*\)/, replace: '{}' },
      },
      {
        test: /node_modules[\\/](ini.ini|(mime-types|content-disposition).index)\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: { search: /^(exports\.(stringify|safe|extension)|module\.exports\.parse) *=/gm, replace: '//$&' },
      },*/
    ],
  },
  resolve: {
    alias: {
      'cli-boxes$': __dirname + '/node_modules/cli-boxes/boxes.json',
      // debug$: __dirname + '/node_modules/debug/src/node.js',
    },
  },
  plugins: [
    new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bindex\.js$/ }),
    new CopyPlugin({
      patterns: [
        { from: 'vendor/**', context: 'node_modules/term-size' },
        { from: '**', to: 'vendor/', context: 'node_modules/clipboardy/fallbacks' },
        { from: 'node_modules/uri-js/dist/es5/uri.all.js', to: 'vendor/uri-js.js' },
        {
          from: 'node_modules/{semver/semver,mime-db/db}.js*',
          to: ({ absoluteFilename: f }) => `vendor/${f.replace(/^.*\bnode_modules[\\/]|[\\/].*$/g, '')}[ext]`,
        },
      ],
    }),
    new ReplaceCodePlugin([
      { search: /('|")use strict\1;?$/gm, replace: '', test: /\bindex\.js$/ },
      { search: /\svar __webpack_modules__ *=/, replace: '"use strict";$&', test: /\bindex\.js$/ },
    ]),
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
