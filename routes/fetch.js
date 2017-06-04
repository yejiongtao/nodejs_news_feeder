var express = require('express');
var router = express.Router();
var queryNews = require('../db/news');

router.get('/', function (req, res, next) {
    var idx = Math.round(Math.random() * 10) % 7;
    var tableName = 'news_sports';
    switch(idx) {
        case 0: tableName = 'news_sports'; break;
        case 1: tableName = 'news_ent'; break;
        case 2: tableName = 'news_tech'; break;
        case 3: tableName = 'news_military'; break;
        case 4: tableName = 'news_local'; break;
        case 5: tableName = 'news_world'; break;
        case 6: tableName = 'news_finance'; break;
    }
    queryNews.selectWithLimit(tableName, 1, function (rows) {
        if(rows == null || rows.length == 0)
            res.send('');
        else
            res.send('/a/'+ rows[0].Category + '/' + rows[0].Filename + '?title='+ rows[0].Title);
    })
});

module.exports = router;