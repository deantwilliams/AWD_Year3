var users = require('../controllers/userAPIController');
var express = require('express');
var router = express.Router();

module.exports = function (passport) {

  // Temp
  router.delete('/deleteadmin', users.delete)

  router.post('/createadmin', users.create);

  /* GET login page. */

  router.get('/login', function (req, res) {
    // Display the Login page with any flash message, if any
    res.render('login', { message: req.flash('message') });
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
  }));

  /* GET Admin Page */
  router.get('/admin', isAuthenticated, function (req, res) {
    res.render('admin', { user: req.user });
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

  return router;
}


var isAuthenticated = function (req, res, next) {
  console.log("isAuthenticated");
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}