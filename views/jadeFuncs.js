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
        path.resolve(__dirname, 'article.jade')),
    login: jade.compileFile(
        path.resolve(__dirname, 'login.jade')),
    signup: jade.compileFile(
        path.resolve(__dirname, 'signup.jade')),
    preferences: jade.compileFile(
        path.resolve(__dirname, 'preferences.jade')
    )
};