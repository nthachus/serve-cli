const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
        exclude:
          /node_modules.(ajv|color-convert|cross-spawn|debug|es-abstract|isexe|negotiator|object|signal-exit|uri-js|util)\b/,
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
          multiple: [...patches, { search: '^#!.*', flags: '', replace: "require('util.promisify/shim')();" }],
        },
      },
      {
        test: path.resolve(__dirname, 'node_modules/serve/package.json'),
        loader: 'string-replace-loader',
        options: {
          search: '[\\s\\S]*',
          flags: '',
          replace: JSON.stringify({ name: pkg.name, version: pkg.version, description: pkg.description }),
        },
      },
      {
        test: /node_modules.clipboardy\b.*\.js$/,
        loader: 'string-replace-loader',
        options: { search: '\\.+/fallbacks/', flags: 'g', replace: 'vendor/' },
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
