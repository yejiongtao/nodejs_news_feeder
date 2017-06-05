var express = require('express');
var router = express.Router();
var pugFuncLogin = require('../views/jadeFuncs').login;
var passport = require('passport');
var sendWithPreference = require('./_utils').sendWithPreference;

// showing on web
router.get('/', function (req, res, next) {
    // res.send(pugFuncLogin({argLoggedIn: req.isAuthenticated()}));
    sendWithPreference(req, res, {argLoggedIn: req.isAuthenticated()}, pugFuncLogin);
});

router.get('/1', function (req, res, next) {
    // res.send(pugFuncLogin({
    //     argInfo: "Successfully signed up. Please sign in.",
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argInfo: "Successfully signed up. Please sign in.",
        argLoggedIn: req.isAuthenticated()
    }, pugFuncLogin);
});

router.get('/2', function (req, res, next) {
    // res.send(pugFuncLogin({
    //     argError: "Incorrect username or password.",
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argError: "Incorrect username or password.",
        argLoggedIn: req.isAuthenticated()
    }, pugFuncLogin);
});

router.post('/', passport.authenticate('local', {failureRedirect: '/login/2'}),
    function (req, res, next) {
        res.redirect('/');
    });


module.exports = router;