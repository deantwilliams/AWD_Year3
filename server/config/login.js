var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            console.log("FINDING USER");
            console.log("Username: " + username);
            console.log("Password: " + password);
            // check in mongo if a user with username exists or not
            User.findOne({ 'username': username },
                function (err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    console.log("Valid password");
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function (user, password) {
        console.log("COMPARING PASSWORD");
        console.log("PASSWORD: " + password);
        console.log("PASSWORD2: " + user.password);
        return bCrypt.compareSync(password, user.password);
    }



}