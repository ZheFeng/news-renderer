import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import winston from 'winston';
const moment = require('moment');

import routes from './routes/index';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static/', express.static(path.join(__dirname, '../public')));
app.use('/doc/', express.static(path.join(__dirname, '../doc')));
app.use(
  '/coverage/',
  express.static(path.join(__dirname, '../coverage/lcov-report'))
);

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


function onError(error) {
  winston.error(error);
  process.exit(1);
}
function onListening(port) {
  const ts = moment().format('MM-DD HH:mm:ss');
  winston.info(`[${ts}]: Server started, listening on port ${port}`);
}

export function startServer(PORT) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const SERVER_PORT = isDevelopment ? 8080 : PORT;
  const DEV_SERVER_PORT = PORT;


  app.set('port', SERVER_PORT);
  const server = http.createServer(app);

  winston.info(`[${process.env.NODE_ENV}] Starting server...`);
  server.listen(SERVER_PORT);
  server.on('error', onError);
  if (isDevelopment) {
    const startDevServer = require('./webpackDevServer').startServer;
    server.on('listening', () => {
      startDevServer(SERVER_PORT, DEV_SERVER_PORT, onListening);
    });
  } else {
    server.on('listening', () => onListening(SERVER_PORT));
  }
}
startServer(process.env.PORT || '3000');
