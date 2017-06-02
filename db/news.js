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

funcs.selectAllDesc = function (tableName, callback) {
    queryFuncs.selectAllWithOrder(tableName, 'Time', 'desc', callback);
};

funcs.deleteLeavingNew = function(tableName, count, callback) {
    queryFuncs.deleteLeavingNew(tableName, count, callback);
};

module.exports = funcs;