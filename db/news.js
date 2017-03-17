var queryFuncs = require('./queryFuncs');
var funcs = {};

funcs.selectCount = function (tableName, callback) {
    queryFuncs.selectCount(tableName, callback);
};

funcs.insert = function (tableName, row, callback) {
    queryFuncs.insert(tableName, row, callback);
};

funcs.selectWithURI = function (tableName, uri, callback) {
    queryFuncs.selectWithWhere(tableName, 'URI', uri, callback);
};

module.exports = funcs;