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
    return db.addColumn('client', 'Interest',
        {type: 'int', defaultValue: 0x7f},
        function (err) {
            if (err) throw err;
        });
};

exports.down = function(db) {
  return db.removeColumn('client', 'Interest', function (err) {
      if(err) throw err;
  });
};

exports._meta = {
  "version": 1
};
