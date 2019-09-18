import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import nunjucks from 'nunjucks';
// const chalk = require('chalk');
import chalk from 'chalk';
import router from './routes';
import middleware from './middlewares/middleware';

// connect database
// eslint-disable-next-line import/first
import './services/helper/db.service';

const app = express();

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(cors());

app.use(express.static(path.join(__dirname, './public'), { maxAge: 31557600000 }));

app.set('views', path.join(__dirname, 'views'));
nunjucks.configure(app.get('views'), {
  express: app,
  autoescape: true,
});
app.set('view engine', 'html');

/**
 * Router - Primary app routes.
 */
app.use('*', middleware.before);
app.use('', router);
// app.use(middleware.routeNotFound);


app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), process.env.PORT, process.env.NODE_ENV);
  // app.log('  Press CTRL-C to stop\n');
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
