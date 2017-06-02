var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res, next) {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;