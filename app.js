var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Desktop02Router = require('./routes/Desktop02');
var Desktop02v2Router = require('./routes/Desktop02v2');
var Desktop03Router = require('./routes/Desktop03');
var Desktop04Router = require('./routes/Desktop04');
var Desktop05Router = require('./routes/Desktop05');
var Desktop06Router = require('./routes/Desktop06');
var Desktop06v2Router = require('./routes/Desktop06v2');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Desktop02Router);
app.use('/Desktop02', Desktop02Router);
app.use('/Desktop02v2', Desktop02v2Router);
app.use('/Desktop03', Desktop03Router);
app.use('/Desktop04', Desktop04Router);
app.use('/Desktop05', Desktop05Router);
app.use('/Desktop06', Desktop06Router);
app.use('/Desktop06v2', Desktop06v2Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
