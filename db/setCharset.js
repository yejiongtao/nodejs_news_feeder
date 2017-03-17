var mysql      = require('mysql');
var conf = require('./query').conf;
var connection = mysql.createConnection({
    host     : conf.host,
    user     : conf.user,
    password : conf.password,
    database : conf.database
});

connection.connect();

connection.query('alter database ' + conf.database + ' character set utf8', function (error, results, fields) {
    if (error) throw error;
});

connection.end();