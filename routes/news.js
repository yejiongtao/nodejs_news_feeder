var express = require('express');
var router = express.Router();
var jadeFuncNews = require('../views/jadeFuncs').news;
var queryNews = require('../db/news');


router.get('/recommend', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'recommend',
        argActive: {RECOMMEND: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/recommend/data', function (req, res, next) {
    queryNews.selectAllDesc('news_sports', function (rows) {
        res.send(rows);
    });
});

router.get('/sports', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'sports',
        argActive: {SPORTS: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/sports/data', function (req, res, next) {
    queryNews.selectAllDesc('news_sports', function (rows) {
        res.send(rows);
    });
});

router.get('/ent', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'ent',
        argActive: {ENTERTAINMENT: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/ent/data', function (req, res, next) {
    queryNews.selectAllDesc('news_ent', function (rows) {
        res.send(rows);
    });
});

router.get('/finance', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'finance',
        argActive: {FINANCE: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/finance/data', function (req, res, next) {
    queryNews.selectAllDesc('news_finance', function (rows) {
        res.send(rows);
    });
});

router.get('/local', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'local',
        argActive: {LOCAL: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/local/data', function (req, res, next) {
    queryNews.selectAllDesc('news_local', function (rows) {
        res.send(rows);
    });
});

router.get('/military', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'military',
        argActive: {MILITARY: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/military/data', function (req, res, next) {
    queryNews.selectAllDesc('news_military', function (rows) {
        res.send(rows);
    });
});

router.get('/tech', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'tech',
        argActive: {TECHNOLOGY: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/tech/data', function (req, res, next) {
    queryNews.selectAllDesc('news_tech', function (rows) {
        res.send(rows);
    });
});

router.get('/world', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'world',
        argActive: {WORLD: true},
        argLoggedIn: req.isAuthenticated()
    }));
});

router.get('/world/data', function (req, res, next) {
    queryNews.selectAllDesc('news_world', function (rows) {
        res.send(rows);
    });
});




module.exports = router;
