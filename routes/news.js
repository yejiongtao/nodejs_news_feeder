var express = require('express');
var router = express.Router();
var jadeFuncNews = require('../views/jadeFuncs').news;
var queryNews = require('../db/news');
var queryClient = require('../db/client');
var async = require('async');
var sendWithPreference = require('./_utils').sendWithPreference;

router.get('/recommend', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'recommend',
    //     argActive: {RECOMMEND: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'recommend',
        argActive: {RECOMMEND: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/recommend/data', function (req, res, next) {
    // by default, 10 per category
    var total = 70, sports = 10, ent = 10, military = 10, world = 10, local = 10, tech = 10, finance = 10;
    if(req.isAuthenticated()) {
        queryClient.selectViaUsername(req.user, function (rows) {
            if(rows) {
                var ratio = total / rows[0].Total;
                sports = Math.round(rows[0].Sports * ratio);
                ent = Math.round(rows[0].Ent * ratio);
                military = Math.round(rows[0].Military * ratio);
                world = Math.round(rows[0].World * ratio);
                local = Math.round(rows[0].Local * ratio);
                tech = Math.round(rows[0].Tech * ratio);
                finance = Math.round(rows[0].Finance * ratio);
            }
            recommendHelper(sports, ent, military, world, local, tech, finance, res);
        })
    } else {
        recommendHelper(sports, ent, military, world, local, tech, finance, res);
    }
});

function recommendHelper(sports, ent, military, world, local, tech, finance, res) {
    var recommendRows = [];
    async.parallel({
        one: function (done) {
            queryNews.selectWithLimit('news_sports', sports, function (rows) {
                if(rows)
                    recommendRows = recommendRows.concat(rows);
                done(null);
            })
        },
        two: function (done) {
            queryNews.selectWithLimit('news_ent', ent, function (rows) {
                if(rows)
                    recommendRows = recommendRows.concat(rows);
                done(null);
            })
        },
        three: function (done) {
            queryNews.selectWithLimit('news_military', military, function (rows) {
                if(rows)
                    recommendRows = recommendRows.concat(rows);
                done(null);
            })
        },
        four: function (done) {
            queryNews.selectWithLimit('news_world', world, function (rows) {
                if(rows)
                    recommendRows = recommendRows.concat(rows);
                done(null);
            })
        },
        five: function (done) {
            queryNews.selectWithLimit('news_local', local, function (rows) {
                if(rows)
                    recommendRows = recommendRows.concat(rows);
                done(null);
            })
        },
        six: function (done) {
            queryNews.selectWithLimit('news_tech', tech, function (rows) {
                if(rows)
                    recommendRows = recommendRows.concat(rows);
                done(null);
            })
        },
        seven: function (done) {
            queryNews.selectWithLimit('news_finance', finance, function (rows) {
                if(rows)
                    recommendRows = recommendRows.concat(rows);
                done(null);
            })
        }
    }, function (error, result) {
        if(error)
            console.error("ERROR getting recommend");
        else {
            recommendRows.sort(function (a, b) {
                return Math.random() > 0.5 ? 1 : -1;
            });
            res.send(recommendRows);
        }
    });
}

router.get('/sports', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'sports',
    //     argActive: {SPORTS: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'sports',
        argActive: {SPORTS: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/sports/data', function (req, res, next) {
    queryNews.selectAllDesc('news_sports', function (rows) {
        res.send(rows);
    });
});

router.get('/ent', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'ent',
    //     argActive: {ENTERTAINMENT: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'ent',
        argActive: {ENTERTAINMENT: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/ent/data', function (req, res, next) {
    queryNews.selectAllDesc('news_ent', function (rows) {
        res.send(rows);
    });
});

router.get('/finance', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'finance',
    //     argActive: {FINANCE: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'finance',
        argActive: {FINANCE: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/finance/data', function (req, res, next) {
    queryNews.selectAllDesc('news_finance', function (rows) {
        res.send(rows);
    });
});

router.get('/local', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'local',
    //     argActive: {LOCAL: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'local',
        argActive: {LOCAL: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/local/data', function (req, res, next) {
    queryNews.selectAllDesc('news_local', function (rows) {
        res.send(rows);
    });
});

router.get('/military', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'military',
    //     argActive: {MILITARY: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'military',
        argActive: {MILITARY: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/military/data', function (req, res, next) {
    queryNews.selectAllDesc('news_military', function (rows) {
        res.send(rows);
    });
});

router.get('/tech', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'tech',
    //     argActive: {TECHNOLOGY: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'tech',
        argActive: {TECHNOLOGY: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/tech/data', function (req, res, next) {
    queryNews.selectAllDesc('news_tech', function (rows) {
        res.send(rows);
    });
});

router.get('/world', function (req, res, next) {
    // res.send(jadeFuncNews({
    //     argCategory: 'world',
    //     argActive: {WORLD: true},
    //     argLoggedIn: req.isAuthenticated()
    // }));
    sendWithPreference(req, res, {
        argCategory: 'world',
        argActive: {WORLD: true},
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncNews);
});

router.get('/world/data', function (req, res, next) {
    queryNews.selectAllDesc('news_world', function (rows) {
        res.send(rows);
    });
});




module.exports = router;
