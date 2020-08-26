const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

const baseDir = process.cwd();
const buildPath = path.join(baseDir, 'build');
const prodEnv = process.env.NODE_ENV === 'production';
const hasType = prodEnv ? '[contenthash]' : '[hash]';
const robotsOption = {
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: "/search",
      crawlDelay: 2,
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      disallow: ["/admin", "/login"],
      crawlDelay: 2,
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/",
    },
  ],
  sitemap: "https://test.com/sitemap.xml",
  host: "https://test.com",
};

const rules = [
  {
    test: /\.js(x?)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ]
  },
  {
    test: /\.po$/,
    loaders: ['i18next-po-loader'],
  },
  {
    test: /\.pug$/,
    use: 'pug-loader',
  },
];
const extensions = ['.js', '.jsx'];

module.exports = [
  {
    name: "client",
    target: 'web',
    devtool: 'source-map',
    entry: {
      main: './src/client.jsx',
    },
    output: {
      path: `${buildPath}/spa`,
      publicPath: '/',
      chunkFilename: `[name].${hasType}.spa.chunk.js`,
      filename: `[name].${hasType}.spa.bundle.js`,
    },
    module: {
      rules: [
        ...rules,
        {
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            }
          },
        },
        {
          test: /\.(svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/',
              }
            },
          ],
        },
        {
          test: /\.less$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
      ],
    },
    resolve: {
      extensions: [
        ...extensions
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: /node_modules/,
          }
        },
      },
      moduleIds: 'hashed',
      namedModules: true,
      namedChunks: true,
      nodeEnv: prodEnv && 'production',
      mangleWasmImports: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      flagIncludedChunks: true,
      occurrenceOrder: true,
      providedExports: true,
      usedExports: true,
      concatenateModules: prodEnv,
      minimize: prodEnv,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: { // api-doc: https://terser.org/docs/api-reference#minify-options
            compress: {
              drop_console: prodEnv,
            },
            mangle: true,
            module: true,
            toplevel: true,
            keep_classnames: false,
            keep_fnames: false,
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        }),
      ],
    },
    plugins: [
      prodEnv ? () => {} : new BundleAnalyzerPlugin({
        defaultSizes: 'gzip',
        analyzerMode: 'server', // 'disabled'
      }),
      new CleanWebpackPlugin(),
      new CompressionPlugin(),
      new LoadablePlugin(),
      new MiniCssExtractPlugin({
        filename: `[name].${hasType}.spa.bundle.css`,
        chunkFilename: `[name].${hasType}.spa.chunk.css`,
        ignoreOrder: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/images/',
            to: 'images/'
          },
          {
            from: './src/components/TypesIcon/iconTypes',
            to: 'images/'
          }
        ]
      }),
      new RobotstxtPlugin(robotsOption),
    ],
  },
  {
    name: 'server',
    target: 'node',
    entry: {
      main: './src/server.jsx',
    },
    externals: [webpackNodeExternals()],
    output: {
      path: buildPath,
      filename: 'server.js',
      chunkFilename: `[name].${hasType}.ssr.chunk.js`,
    },
    module: {
      rules: [
        ...rules,
        {
          test: [
            /\.(less|svg|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          ],
          use: [
            {
              loader: 'ignore-loader',
            },
          ]
        },
      ],
    },
    resolve: {
      extensions: [
        ...extensions
      ],
    },
    plugins: [
      new NodemonPlugin({
        watch: buildPath,
        script: path.join(buildPath, 'server.js'),
      }),
    ],
  }
];
