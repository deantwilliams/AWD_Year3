var users = require('../controllers/userAPIController');
var express = require('express');
var router = express.Router();

module.exports = function (passport) {

  // Temp
  router.delete('/deleteadmin', users.delete)

  router.post('/createadmin', users.create);


  /* Handle Login POST */


    // router.post('/login', passport.authenticate('login', {
    //   successRedirect: '/admin',
    //   failureRedirect: '/login',
    //   failureFlash: true
    // }));
    
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

  // router.post('/login', function (req, res, next) {
  //   passport.authenticate('login', function (err, user, info) {
  //     if (err) { return next(err); }
  //     // Redirect if it fails
  //     if (!user) { return res.redirect('/login'); }
  //     req.logIn(user, function (err) {
  //       if (err) { return next(err); }
  //       // Redirect if it succeeds
  //       return res.redirect('/' + user.username);
  //     });
  //   })(req, res, next);
  // });

  /* Handle Logout */
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


// var isAuthenticated = function (req, res, next) {
//   console.log("isAuthenticated");
//   // if user is authenticated in the session, call the next() to call the next request handler 
//   // Passport adds this method to request object. A middleware is allowed to add properties to
//   // request and response objects
//   if (req.isAuthenticated())
//     return next();
//   // if the user is not authenticated then redirect him to the login page
//   res.redirect('/');
// }