var login = require('./login');
var User = require('../models/userModel');

module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        console.log('serializing user: '); console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log('deserializing user:', user);
            done(err, user);
        });
    });

    // Set up Passport strategy
    login(passport);

}