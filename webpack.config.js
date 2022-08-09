const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

const patches = [
  '\\bObject\\.keys\\(json\\)\\.forEach\\([\\s\\S]*?, packageName, requestedVersion\\] = match;',
  `let resolvable = null;
  if (includeScopes.length) {
    includeScopes = includeScopes.filter(v => !['^', '~', '*'].includes(v) || !(resolvable = v));
  }
  $&
  if (resolvable === '*') {
    requestedVersion = '*';
  } else if (resolvable === '^' && /(^|\\s|\\|)~\\s*\\d/.test(requestedVersion)) {
    requestedVersion = requestedVersion.replace(/(^|\\s|\\|)~\\s*(\\d)/g, '$$1^$$2');
  } else if (resolvable && /^\\d[\\w.-]*$$/.test(requestedVersion = semver.clean(requestedVersion))) {
    requestedVersion = resolvable + requestedVersion.replace(/^(0)\\..*$$/, '$$1');
  }`,
];

module.exports = {
  mode: 'production',
  entry: './node_modules/serve/bin/serve',
  output: {
    path: __dirname,
    filename: 'index.js',
  },
  context: __dirname,
  target: 'node',
  node: {
    __filename: false,
    __dirname: false,
  },
  externals: {
    'spawn-sync': 'commonjs spawn-sync',
  },
  module: {
    rules: [
      {
        // transpile ES6-8 into ES5
        test: /\.m?js$/,
        exclude: /node_modules.(ajv|color-convert|cross-spawn|debug|isexe|negotiator|signal-exit|uri-js)\b/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['@babel/preset-env', { targets: { node: pkg.engines.node.replace(/^[^\d]*/, '') } }], // esmodules
          ],
        },
      },
      {
        test: path.resolve(__dirname, 'node_modules/serve/bin/serve.js'),
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: patches[0], flags: '', replace: patches[1] },
            { search: '^#!.*[\\r\\n]+', flags: '', replace: '' },
            { search: "require('./package.json').version", replace: `'${pkg.version}'` },
          ],
        },
      },
      {
        test: path.resolve(__dirname, 'node_modules/serve/package.json'),
        loader: 'string-replace-loader',
        options: { search: ',\\s*"scripts"[\\s\\S]*$', flags: '', replace: '\n}' },
      },
      {
        test: /node_modules.clipboardy\b.*\.js$/,
        loader: 'string-replace-loader',
        options: { search: '(\\.*/)?fallbacks/', flags: 'g', replace: 'vendor/' },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    new CopyPlugin([
      { from: 'node_modules/clipboardy/fallbacks', to: 'vendor/', ignore: ['.DS_Store'] },
      { from: 'node_modules/term-size/vendor', to: 'vendor/' },
    ]),
  ],
  optimization: {
    nodeEnv: false,
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: { mangle: false, output: { beautify: true } },
        extractComments: { condition: /^\**!|@preserve|@license|@cc_on/i, banner: false },
      }),
    ],
  },
};
