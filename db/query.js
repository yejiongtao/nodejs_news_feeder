var mysql = require('mysql');
var conf = process.env.NODE_ENV === 'production' ?
    require('../config/db').prod : require('../config/db').dev;
var pool = mysql.createPool({
    host:  conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
    charset: 'utf8'
});

var query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if(err) {
            callback(err, null, null);
        }
        else {
            conn.query(sql, function (qerr, vals, fields) {
                conn.release();
                callback(qerr, vals, fields);
            });
        }
    });
};

module.exports = {
    query: query,
    pool: pool,
    conf: conf
};