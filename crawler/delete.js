var fs = require('fs');
var path = require('path');
var queryNews = require('../db/news');
var tag = '[CRAWLER]';

function deleteObsolete() {
    var count = 50;
    var cb = function (res) {
        console.error(tag, 'Failed to delete obsolete news');
    };
    queryNews.deleteLeavingNew('news_sports', count, cb);
    queryNews.deleteLeavingNew('news_finance', count, cb);
    queryNews.deleteLeavingNew('news_ent', count, cb);
    queryNews.deleteLeavingNew('news_tech', count, cb);
    queryNews.deleteLeavingNew('news_military', count, cb);
    queryNews.deleteLeavingNew('news_world', count, cb);
    queryNews.deleteLeavingNew('news_local', count, cb);
}

module.exports = {
    deleteObsolete: deleteObsolete
};