var express = require('express');
var router = express.Router();
var jadeFuncArticle = require('../views/jadeFuncs').article;
var fs = require('fs');
var path = require('path');
var queryClient = require('../db/client');
var sendWithPreference = require('./_utils').sendWithPreference;

/* GET home page. */
router.get('/:category/:id', function (req, res, next) {
    fs.readFile(path.resolve(__dirname, '../public/news/' + req.params.category + '/a/' + req.params.id + '.txt'),
        function (err, data) {
            if (err)
                console.error(err);
            else {
                var args = {
                    argTitle: req.query.title,
                    argContent: data,
                    argLoggedIn: req.isAuthenticated()
                };
                if(fs.existsSync(path.resolve(__dirname,
                        '../public/news/' + req.params.category + '/img/done_' + req.params.id + '.jpeg')))
                    args.argImgUri = '/news/' + req.params.category + '/img/done_' + req.params.id + '.jpeg';
                // res.send(jadeFuncArticle(args));
                sendWithPreference(req, res, args, jadeFuncArticle);
            }
        });
    if(req.isAuthenticated()) {
        var colName = 'Sports';
        switch(req.params.category) {
            case 'sports': colName = 'Sports'; break;
            case 'ent': colName = 'Ent'; break;
            case 'finance': colName = 'Finance'; break;
            case 'local': colName = 'Local'; break;
            case 'military': colName = 'Military'; break;
            case 'tech': colName = 'Tech'; break;
            case 'world': colName = 'World'; break;
        }
        var username = req.user;
        queryClient.increment(username, 'Total', function (res) {
            if(!res)
                console.error("Failed to increment Total");
            else
                queryClient.increment(username, colName, function (res) {
                    if(!res)
                        console.error("Failed to increment " + colName);
                })
        })
    }
});

module.exports = router;
