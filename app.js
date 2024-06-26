var express = require('express');
var app = express();


var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sprintRouter = require('./routes/sprints');
var historicRouter = require('./routes/historic');
var acceptance_results = require('./routes/acceptance_results');
var login = require('./routes/login');
var demo = require('./routes/demo')
var authenticateSession = require('./middleware/authMiddleware');

const env = process.argv[2];

global.ApiURL = env === 'docker' ? 'http://webqa-api:8000' : 'http://127.0.0.1:8000';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Xsw23edcVfr45tgb', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1800000 }
}));


//Routes
app.use('/', indexRouter);
app.use('/login', login);
app.use('/users', authenticateSession, usersRouter);
app.use('/sprint', authenticateSession, sprintRouter);
app.use('/historic', historicRouter);
app.use('/acceptance_results', acceptance_results);
app.use('/demo', demo);

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
