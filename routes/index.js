var express = require('express');
var router = express.Router();
var jadeFuncIndex = require('../views/jadeFuncs').index;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(jadeFuncIndex());
});

module.exports = router;
