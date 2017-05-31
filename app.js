var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var cookieKey = require('./config/constants').cookieKey;
var sessionAge = require('./config/constants').sessionAge;
var passport = require('passport');

//todo spawn a crawler here

var connectionPool = require('./db/query').pool;
require('./config/passport');
var sessionStore = new MySQLStore({
    checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds.
    createDatabaseTable: true
    // charset: 'utf8_bin'
}, connectionPool);

var index = require('./routes/index');
var jadeFuncError = require('./views/jadeFuncs').error;
var news = require('./routes/news');
var article = require('./routes/article');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: cookieKey,
    resave: true,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {maxAge: sessionAge}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
app.use('/news', news);
app.use('/a', article);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(jadeFuncError({
        message: err.message,
        error: err
    }));
});

module.exports = app;
