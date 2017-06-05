var queryFuncs = require('./queryFuncs');

var funcs = {};
var table = 'client';

funcs.selectViaUsername = function (username, callback) {
    queryFuncs.selectWithWhere(table, 'Username', username, callback);
};

funcs.selectViaEmail = function(email, callback) {
    queryFuncs.selectWithWhere(table, 'Email', email, callback);
};

funcs.selectViaUsernameAndDigest = function (username, digest, callback) {
    queryFuncs.selectWithMultipleWhere(table, ['Username', 'Digest'], [username, digest], callback);
};

funcs.insert = function (row, callback) {
    queryFuncs.insert(table, row, callback);
};

funcs.increment = function(username, colName, callback) {
    queryFuncs.selectWithWhere(table, 'Username', username, function (rows) {
        if(rows) {
            var oldVal = rows[0][colName];
            queryFuncs.update(table, 'Username', username, colName, oldVal+1, callback);
        } else {
            callback(false);
        }
    });
};

funcs.update = function (whereField, whereVal, field, newVal, callback) {
    queryFuncs.update(table, whereField, whereVal, field, newVal, callback);
};

module.exports = funcs;