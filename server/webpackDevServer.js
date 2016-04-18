import webpack from 'webpack';
import winston from 'winston';
import webpackConfig from '../webpack.config.babel';
import WebpackDevServer from 'webpack-dev-server';


function setDevWebpackConfig(originConfig, DEV_PORT) {
  const config = { ...originConfig };

  config.devtool = '#cheap-source-map';

  Object.keys(config.entry).forEach(key => {
    const val = config.entry[key];
    if (typeof val === 'string') {
      config.entry[key] = [
        val,
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:${DEV_PORT}`,
      ];
    } else if (typeof val.push === 'function') {
      config.entry[key].push('webpack/hot/dev-server');
      config.entry[key].push(
        `webpack-dev-server/client?http://localhost:${DEV_PORT}`
      );
    }
  });
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  return config;
}

export function startServer(PORT, DEV_PORT, onListening) {
  const compiler = webpack(setDevWebpackConfig(webpackConfig, DEV_PORT));
  const app = new WebpackDevServer(compiler, {
    contentBase: 'build',
    proxy: { '*': `http://localhost:${PORT}` },
    hot: true,
    inline: true,
    noInfo: true,
  });
  winston.info('Starting development server...');
  app.listen(DEV_PORT, () => {
    winston.info(`Dev server is now running on http://localhost:${DEV_PORT}`);
    onListening(PORT);
  });
}
