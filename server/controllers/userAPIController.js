var User = require('../models/userModel');
var bCrypt = require('bcrypt-nodejs');


exports.create = function (req, res) {

    var pw = bCrypt.hashSync("adminpass8888");
    console.log("PW: " + pw);

    var user = new User({ username: "admin", password: pw, isAdmin: true });

    user.save(function (err) {

        if (err) {
            console.log("error: " + err);
            return res.status(500).json({ errors: "Could not create admin user" });
        }

        var socketio = req.app.get('socketio');
        socketio.sockets.emit('user.created', user);

        res.status(201).json(user);
    });
};


exports.delete = function (req, res) {

    var user = req.params.id;

    User.findOneAndRemove({ username: "admin" }, function (err, user) {

        if (err) {
            console.log("error: " + err);
            return res.status(500).json({ errors: "Could not delete user" });
        }

        console.log("user deleted: " + user);
        res.status(200).json(user);
    });

};
