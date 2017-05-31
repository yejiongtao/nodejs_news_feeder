var express = require('express');
var router = express.Router();
var jadeFuncIndex = require('../views/jadeFuncs').index;

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.isAuthenticated())
        res.send(jadeFuncIndex({
            argUser: req.user,
            argLoggedIn: req.isAuthenticated()
        }));
    else
        res.send(jadeFuncIndex({argLoggedIn: req.isAuthenticated()}));
});

module.exports = router;
