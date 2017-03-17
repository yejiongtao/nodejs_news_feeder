var fs = require('fs');
var file = require('file');
var path = require('path');

clear('finance');
clear('ent');
clear('local');
clear('military');
clear('sports');
clear('tech');
clear('world');

function clear(dir) {
    clearDir(path.resolve(__dirname, '../public/news/' + dir + '/a'));
    clearDir(path.resolve(__dirname, '../public/news/' + dir + '/img'));
}

function clearDir(path) {
    file.walk(path, function(err, dirPath, dirs, files) {
        files.forEach(function(filePath) {
            fs.unlinkSync(filePath);
        });
    });
}

var mysql = require('mysql');
var conf = require('../db/query').conf;
var connection = mysql.createConnection({
    host     : conf.host,
    user     : conf.user,
    password : conf.password,
    database : conf.database
});

connection.connect();

connection.query('truncate news_ent', function (error, results, fields) {
    if (error) throw error;
});
connection.query('truncate news_finance', function (error, results, fields) {
    if (error) throw error;
});
connection.query('truncate news_local', function (error, results, fields) {
    if (error) throw error;
});
connection.query('truncate news_military', function (error, results, fields) {
    if (error) throw error;
});
connection.query('truncate news_sports', function (error, results, fields) {
    if (error) throw error;
});
connection.query('truncate news_tech', function (error, results, fields) {
    if (error) throw error;
});
connection.query('truncate news_world', function (error, results, fields) {
    if (error) throw error;
});

connection.end();