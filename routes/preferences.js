var express = require('express');
var router = express.Router();
var jadeFuncPref = require('../views/jadeFuncs').preferences;
var sendWithPreference = require('./_utils').sendWithPreference;
var categoriesMask = require('../config/constants').CATEGORY_MASK;
var queryClient = require('../db/client');

// showing on web
router.get('/', function (req, res, next) {
    sendWithPreference(req, res, {
        argLoggedIn: req.isAuthenticated()
    }, jadeFuncPref);
});

router.get('/1', function (req, res, next) {
    sendWithPreference(req, res, {
        argLoggedIn: req.isAuthenticated(),
        argSuccess: true
    }, jadeFuncPref);
});

router.get('/2', function (req, res, next) {
    sendWithPreference(req, res, {
        argLoggedIn: req.isAuthenticated(),
        argFail: true
    }, jadeFuncPref);
});

router.post('/', function (req, res, next) {
    if(req.isAuthenticated()) {
        var interest = 0;
        var categories = req.body.categories;
        for (var i in categories) {
            switch (categories[i]) {
                case 'sports':
                    interest |= categoriesMask.SPORTS;
                    break;
                case 'ent':
                    interest |= categoriesMask.ENTERTAINMENT;
                    break;
                case 'local':
                    interest |= categoriesMask.LOCAL;
                    break;
                case 'world':
                    interest |= categoriesMask.WORLD;
                    break;
                case 'military':
                    interest |= categoriesMask.MILITARY;
                    break;
                case 'tech':
                    interest |= categoriesMask.TECHNOLOGY;
                    break;
                case 'finance':
                    interest |= categoriesMask.FINANCE;
                    break;
            }
        }
        queryClient.update('Username', req.user, 'Interest', interest, function (success) {
            if(success)
                res.redirect('/pref/1');
            else
                res.redirect('/pref/2');
        });
    } else {
        res.redirect('/login');
    }
});


module.exports = router;