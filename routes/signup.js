var express = require('express');
var router = express.Router();
var jadeFuncSignup = require('../views/jadeFuncs').signup;
var queryClient = require('../db/client');
var digest = require('../config/digest');

// showing on web
router.get('/', function (req, res, next) {
    res.send(jadeFuncSignup({argLoggedIn: req.isAuthenticated()}));
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    queryClient.selectViaUsername(username, function (rows) {
        if(rows && rows.length != 0)
            res.send(jadeFuncSignup({
                argError: "Username already exists.",
                argLoggedIn: req.isAuthenticated()
            }));
        else
            queryClient.selectViaEmail(email, function (rows) {
                if(rows && rows.length != 0)
                    res.send(jadeFuncSignup({
                        argError: "Email already exists.",
                        argLoggedIn: req.isAuthenticated()
                    }));
                else {
                    var d = digest(username+password);
                    queryClient.insert({
                        Username: username,
                        Digest: d,
                        Email: email
                    }, function (success) {
                        if(success) {
                            res.redirect('/login/1');
                        } else {
                            console.error('failed to signup');
                        }
                    });
                }
            });
    });

});


module.exports = router;