var express 		= require('express');
var socketio          = require( 'socket.io' )
var http              = require( 'http' )
var path 			= require('path');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session      	= require( 'express-session' );
var passport = require('passport');

var app 			= express();

app.use( express.static( 'client' ) );

app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./passportinit');
initPassport(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use( session({
	    secret: 'someRandomString',
	    resave: false,
	    saveUninitialized: false
}));

var itemRoutes = require( '../routes/itemRoutes.js' );
var orderRoutes = require( '../routes/orderRoutes.js' );
var adminRoutes = require( '../routes/adminRoutes.js' )(passport);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.get('*', function(req, res) {
	res.sendFile( '/index.html', {root: './client'} );
})

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

var server = http.createServer( app );
var io = socketio.listen( server );
app.set( 'socketio', io );
app.set( 'server', server );

module.exports = app;