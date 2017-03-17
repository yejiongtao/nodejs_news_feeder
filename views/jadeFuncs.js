var jade = require('jade');
var path = require('path');

module.exports = {
    index: jade.compileFile(
        path.resolve(__dirname, 'index.jade')),
    error: jade.compileFile(
        path.resolve(__dirname, 'error.jade')),
    news: jade.compileFile(
        path.resolve(__dirname, 'news.jade')),
    article: jade.compileFile(
        path.resolve(__dirname, 'article.jade'))
};