var express = require('express');
var router = express.Router();
var jadeFuncNews = require('../views/jadeFuncs').news;
var queryNews = require('../db/news');

router.get('/sports', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'sports'
    }));
});

router.get('/sports/data', function (req, res, next) {
    queryNews.selectAllDesc('news_sports', function (rows) {
        res.send(rows);
    });
});

router.get('/ent', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'ent'
    }));
});

router.get('/ent/data', function (req, res, next) {
    queryNews.selectAllDesc('news_ent', function (rows) {
        res.send(rows);
    });
});

router.get('/finance', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'finance'
    }));
});

router.get('/finance/data', function (req, res, next) {
    queryNews.selectAllDesc('news_finance', function (rows) {
        res.send(rows);
    });
});

router.get('/local', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'local'
    }));
});

router.get('/local/data', function (req, res, next) {
    queryNews.selectAllDesc('news_local', function (rows) {
        res.send(rows);
    });
});

router.get('/military', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'military'
    }));
});

router.get('/military/data', function (req, res, next) {
    queryNews.selectAllDesc('news_military', function (rows) {
        res.send(rows);
    });
});

router.get('/tech', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'tech'
    }));
});

router.get('/tech/data', function (req, res, next) {
    queryNews.selectAllDesc('news_tech', function (rows) {
        res.send(rows);
    });
});

router.get('/world', function (req, res, next) {
    res.send(jadeFuncNews({
        argCategory: 'world'
    }));
});

router.get('/world/data', function (req, res, next) {
    queryNews.selectAllDesc('news_world', function (rows) {
        res.send(rows);
    });
});




module.exports = router;
