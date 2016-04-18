import path from 'path';
import webpack from 'webpack';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

const buildPath = 'public/dist';
const cdnPath = '/static/dist/';

const { NODE_ENV } = process.env;
const BUILD_DEV = NODE_ENV === 'development';
const BUILD_PROD = !BUILD_DEV;


const entry = {
  main: './app',
};
const filename = BUILD_PROD ? '[chunkhash].js' : '[name].js';

const output = {
  path: path.join(__dirname, buildPath),
  filename,
  publicPath: BUILD_PROD ? cdnPath : '/',
};
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
    __DEV__: BUILD_DEV,
    __PROD__: BUILD_PROD,
  }),
  new StatsWriterPlugin(),
];


const webpackConfig = {
  entry,
  output,
  module: {
    loaders: [{
      test: /\.less?$/,
      loader: 'style!css!less',
    }, {
      test: /\.css?$/,
      loader: 'style!css',
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
      loader: 'url?limit=1',
    }, {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
    }],
  },
  plugins,
};

if (BUILD_PROD) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: { warnings: false },
  }));
}

export default webpackConfig;
