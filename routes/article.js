var express = require('express');
var router = express.Router();
var jadeFuncArticle = require('../views/jadeFuncs').article;
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/:category/:id', function (req, res, next) {
    fs.readFile(path.resolve(__dirname, '../public/news/' + req.params.category + '/a/' + req.params.id + '.txt'),
        function (err, data) {
            if (err)
                console.error(err);
            else {
                var args = {
                    argTitle: req.query.title,
                    argContent: data
                };
                if(fs.existsSync(path.resolve(__dirname,
                        '../public/news/' + req.params.category + '/img/done_' + req.params.id + '.jpeg')))
                    args.argImgUri = '/news/' + req.params.category + '/img/done_' + req.params.id + '.jpeg';
                res.send(jadeFuncArticle(args));
            }
        })
});

module.exports = router;
