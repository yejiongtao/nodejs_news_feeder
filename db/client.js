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

module.exports = funcs;