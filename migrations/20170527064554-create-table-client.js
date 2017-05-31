'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return db.createTable('client', {
        ID: {type: 'bigint', primaryKey: true, autoIncrement: true},
        Username: {type: 'string', length: 100},
        Digest: { type: 'string', length: 64},
        Email: {type: 'string', length: 100},

        Total: {type: 'bigint', defaultValue: 70},
        Sports: {type: 'bigint', defaultValue: 10},
        Ent: {type: 'bigint', defaultValue: 10},
        Finance: {type: 'bigint', defaultValue: 10},
        Local: {type: 'bigint', defaultValue: 10},
        Military: {type: 'bigint', defaultValue: 10},
        Tech: {type: 'bigint', defaultValue: 10},
        World: {type: 'bigint', defaultValue: 10}
    });
};

exports.down = function(db) {
  return db.dropTable('client');
};

exports._meta = {
  "version": 1
};
