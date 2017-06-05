var express = require('express');
var router = express.Router();
var jadeFuncIndex = require('../views/jadeFuncs').index;
var sendWithPreference = require('./_utils').sendWithPreference;

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.isAuthenticated()) {
        // res.send(jadeFuncIndex({
        //     argUser: req.user,
        //     argLoggedIn: req.isAuthenticated()
        // }));
        sendWithPreference(req, res, {
            argUser: req.user,
            argLoggedIn: req.isAuthenticated()
        }, jadeFuncIndex);
    } else {
        // res.send(jadeFuncIndex({argLoggedIn: req.isAuthenticated()}));
        sendWithPreference(req, res, {argLoggedIn: req.isAuthenticated()}, jadeFuncIndex);
    }
});

module.exports = router;
