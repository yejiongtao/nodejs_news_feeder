var express = require('express');
var router = express.Router();
var jadeFuncSignup = require('../views/jadeFuncs').signup;
var queryClient = require('../db/client');
var digest = require('../config/digest');
var categoriesMask = require('../config/constants').CATEGORY_MASK;
var sendWithPreference = require('./_utils').sendWithPreference;

// showing on web
router.get('/', function (req, res, next) {
    // res.send(jadeFuncSignup({argLoggedIn: req.isAuthenticated()}));
    sendWithPreference(req, res, {argLoggedIn: req.isAuthenticated()}, jadeFuncSignup);
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    queryClient.selectViaUsername(username, function (rows) {
        if(rows && rows.length != 0)
            // res.send(jadeFuncSignup({
            //     argError: "Username already exists.",
            //     argLoggedIn: req.isAuthenticated()
            // }));
            sendWithPreference(req, res, {
                argError: "Username already exists.",
                argLoggedIn: req.isAuthenticated()
            }, jadeFuncSignup);
        else
            queryClient.selectViaEmail(email, function (rows) {
                if(rows && rows.length != 0)
                    // res.send(jadeFuncSignup({
                    //     argError: "Email already exists.",
                    //     argLoggedIn: req.isAuthenticated()
                    // }));
                    sendWithPreference(req, res, {
                        argError: "Email already exists.",
                        argLoggedIn: req.isAuthenticated()
                    }, jadeFuncSignup);
                else {
                    var interest = 0;
                    var categories = req.body.categories;
                    for(var i in categories) {
                        switch(categories[i]) {
                            case 'sports': interest |= categoriesMask.SPORTS; break;
                            case 'ent': interest |= categoriesMask.ENTERTAINMENT; break;
                            case 'local': interest |= categoriesMask.LOCAL; break;
                            case 'world': interest |= categoriesMask.WORLD; break;
                            case 'military': interest |= categoriesMask.MILITARY; break;
                            case 'tech': interest |= categoriesMask.TECHNOLOGY; break;
                            case 'finance': interest |= categoriesMask.FINANCE; break;
                        }
                    }

                    var d = digest(username+password);
                    queryClient.insert({
                        Username: username,
                        Digest: d,
                        Email: email,
                        Interest: interest
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