const createError = require('http-errors');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const appRouter = require('./routes/app');
const app = express();
const i18next = require('./i18n');
const i18nextMiddleware = require('i18next-http-middleware')

// view engine setup
const env = nunjucks.configure('views', {
  autoescape: true,
  express: app
});
env.addGlobal('lang', () => i18next.language);
env.addGlobal('__', (key, escapeValue = false) => {
  return i18next.t(key);
});
app.set('view engine', 'html');

app.use(i18nextMiddleware.handle(i18next));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/app', appRouter);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  res.status(404).render('404.html');
  res.status(500).render('404.html');
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   console.log(err.message);
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
