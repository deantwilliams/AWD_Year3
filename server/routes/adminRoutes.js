var users = require('../controllers/userAPIController');
var express = require('express');
var router = express.Router();

module.exports = function (passport) {

  // Temp
  router.delete('/deleteadmin', users.delete)

  router.post('/createadmin', users.create);
    
  router.post( '/login', function( req, res, next ){

      passport.authenticate('login', function( err, user, info ){

          if( err ){
            return next( err );
          }

          if( !user ){
            
            return res.status(401).json({
              err: info
            });
          }

          req.logIn( user, function( err ){

              if( err ){

                return res.status( 500 ).json({
                  err: 'Could not log in user'
                });

              }

              res.status( 200 ).json({

                status: 'Login successful!'
              });
          });

      })( req, res, next );
  });

  router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
  });


  router.get( '/status', function( req, res ){

    if( !req.isAuthenticated() ){
      return res.status( 200 ).json({ authenticated: false });
    }
    res.status( 200 ).json({ authenticated: true });

  });

  return router;
}