var express 		= require('express');
var socketio          = require( 'socket.io' )
var http              = require( 'http' )
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session      	= require( 'express-session' );
var passport = require('passport');

var app 			= express();

app.use( express.static( 'client' ) );

// Configuring Passport
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passportinit');
initPassport(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use( session({
	    secret: 'someRandomString',
	    resave: false,
	    saveUninitialized: false
}));

// Initialize flash
var flash = require('connect-flash');
app.use(flash());

var itemRoutes = require( '../routes/itemRoutes.js' );
var orderRoutes = require( '../routes/orderRoutes.js' );
var adminRoutes = require( '../routes/adminRoutes.js' )(passport);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.get('*', function(req, res) {
	res.sendFile( '/index.html', {root: './client'} );
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.send(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// Attach Socket.io
var server = http.createServer( app );
var io = socketio.listen( server );
app.set( 'socketio', io );
app.set( 'server', server );

module.exports = app;