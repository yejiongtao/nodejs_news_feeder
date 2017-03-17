var query = require('./query').query;
var mysql = require('mysql');

var funcs = {};

function select(sql, callback) {
    query(sql, function (err, rows, fields) {
        // rows is an array of objects
        if(err) {
            console.error(err.message);
            return;
        }
        callback(rows);
    });
}

funcs.selectAll = function(table, callback) {
    var sql = 'select * from ' + table;
    select(sql, callback);
};

funcs.selectAllWithOrder = function (table, orderBy, order, callback) {
    var sql = 'select * from ' + table + ' order by ' + orderBy + ' ' + order;
    select(sql, callback);
};

funcs.selectWithWhere = function (table, field, value, callback) {
    var sql = mysql.format('select * from ' + table + ' where `' + field + '`=?',
        [value]);
    select(sql, callback);
};

funcs.selectWithLimit = function(table, offset, limit, callback) {
    var sql = mysql.format('select * from ' +table+ ' limit ?,?',
        [offset, limit]);
    select(sql, callback);
};

funcs.selectWithLimitAndWhere = function(table, offset, limit, field, value, callback) {
    var sql = mysql.format('select * from ' +table+ ' where `' + field + '`=? limit ?,?',
        [value, offset, limit]);
    select(sql, callback);
};

funcs.selectWithLimitAndOrder = function (table, offset, limit, orderField, order, callback) {
    var sql = mysql.format('select * from ' + table + ' order by ' + orderField + ' ' + order + ' limit ?,?',
        [offset, limit]);
    console.log(sql);
    select(sql, callback);
};

funcs.selectWithLimitAndWhereAndOrder = function (table, offset, limit,
                                                  whereField, value, orderField, order, callback) {
    var sql = mysql.format('select * from ' +table+ ' where `' + field + '`=? order by '
        + orderField + ' ' + order + ' limit ?,? ',
        [value, offset, limit]);
    console.log(sql);

    select(sql, callback);
};


funcs.selectColNames = function (table, callback) {
    var sql = mysql.format('select COLUMN_NAME from information_schema.columns' +
        ' where table_name=?', [table]);
    query(sql, function (err, rows, fields) {
        if(err) {
            console.error(err.message);
            return;
        }
        callback(rows.map(function (x) {
            return x.COLUMN_NAME;
        }));
    });
};

funcs.selectCount = function (table, callback) {
    var sql = 'select count(*) from ' +table;
    query(sql, function (err, rows, fields) {
        if(err) {
            console.error(err.message);
            return;
        }
        callback(rows[0]['count(*)']);
    });
};

funcs.update = function (table, whereField, whereVal, field, newVal, callback) {
    var sql = mysql.format('update ' +table+ ' set `' + field +'`=? where `' +whereField+ '`=?',
        [newVal, whereVal]);
    query(sql, function (err) {
        if(err) {
            console.error(err.message);
            if(callback)
                callback(false);
            return;
        } else {
            if(callback)
                callback(true);
        }
    });
};

funcs.insert = function (table, row, callback) {
    // row is an object
    var cols = [], values = [];
    for(var col in row) {
        cols.push('`' + col + '`');
        values.push('\'' + row[col] + '\'');
    }
    var sql = 'insert into ' +table+ ' (' +
        cols.join(',') +
        ') VALUES (' +
        values.join(',') +
        ')';
    query(sql, function (err, vals, fields) {
        if(err) {
            callback(false);
            console.error(err.message);
            return;
        }

        callback(true, vals.insertId);
    });
};

funcs.insertMultipleLines = function (table, fields, values, callback) {
    var fieldStrings = '';
    for(var i=0; i<fields.length; i++) {
        fieldStrings += '`' + fields[i] + '`';
        if(i != fields.length -1)
            fieldStrings += ',';
    }
    var sql = 'insert into ' +table+ ' (' + fieldStrings +
        ') VALUES ';
    for(var i=0; i<values.length; i++) {
        sql += '(';
        for(var j=0; j<values[i].length; j++) {
            sql += '\'' + values[i][j] + '\'';
            if(j != values[i].length - 1)
                sql += ',';
        }
        sql += ')';

        if(i != values.length -1)
            sql += ',';
    }

    query(sql, function (err) {
        if(err) {
            callback(false);
            console.error(err.message);
            return;
        }
        callback(true);
    });
};

funcs.deleteWithWhere = function (table, field, val, callback) {
    var sql = mysql.format('delete from '+ table + ' where `' + field + '`=?',
        [val]);
    query(sql, function (err) {
        if(err) {
            callback(false);
            console.error(err.message);
            return;
        } else
            callback(true);
    });
};

funcs.loadDataInfile = function (table, file, fields, extraCols, callback) {
    var sql = 'load data infile ? ignore into table ' + table +
        ' fields terminated by ? (';
    for(var i =0; i<fields.length; i++) {
        sql += '`' + fields[i] + '`';
        if (i != fields.length - 1)
            sql += ',';
    }
    sql += ')';

    if(extraCols) {
        sql += 'SET ';
        for(var col in extraCols) {
            sql += '`' + col + '`' + '=\'' + extraCols[col] + '\', ';
        }
        sql = sql.substr(0, sql.length -2);
    }

    sql = mysql.format(sql, [file, ' ']);

    console.log(sql);
    query(sql, function (err) {
        if(err) {
            callback(false);
            console.error(err.message);
            return;
        } else
            callback(true);
    })
};

funcs.average = function (table, col, groupByCol, callback) {
    var sql = 'SELECT ' + groupByCol + ', AVG(' + col +
        ') from ' + table + ' GROUP BY `' + groupByCol +'`';
    query(sql, function (err, rows, fields) {
        if(err) {
            console.error(err.message);
            return;
        }
        callback(rows);
    })
};

module.exports = funcs;

