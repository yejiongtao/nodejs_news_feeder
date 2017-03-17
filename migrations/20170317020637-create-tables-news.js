'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

function createTable(db, name) {
    return db.createTable(name, {
        ID: {type: 'bigint', primaryKey: true, autoIncrement: true},
        URI: {type: 'string', length: 500},
        Source: {type: 'string', length: 30},
        Time: {type: 'string', length: 30},
        Title: {type: 'string', length: 100},
        Filename: {type: 'string', length: 100}
    });
}

exports.up = function (db) {
    return createTable(db, 'news_ent')
        .then(
            function (result) {
                createTable(db, 'news_finance');
            }, function (err) {}
        ).then(
            function (result) {
                createTable(db, 'news_local');
            }, function (err) {}
        ).then(
            function (result) {
                createTable(db, 'news_military');
            }, function (err) {}
        ).then(
            function (result) {
                createTable(db, 'news_sports');
            }, function (err) {}
        ).then(
            function (result) {
                createTable(db, 'news_tech');
            }, function (err) {}
        ).then(
            function (result) {
                createTable(db, 'news_world');
            }, function (err) {}
        );
};

exports.down = function (db) {
    return db.dropTable('news_ent')
        .then(
            function (result) {
                db.dropTable('news_finance');
            }, function (err) {}
        ).then(
            function (result) {
                db.dropTable('news_local');
            }, function (err) {}
        ).then(
            function (result) {
                db.dropTable('news_military');
            }, function (err) {}
        ).then(
            function (result) {
                db.dropTable('news_sports');
            }, function (err) {}
        ).then(
            function (result) {
                db.dropTable('news_tech');
            }, function (err) {}
        ).then(
            function (result) {
                db.dropTable('news_world');
            }, function (err) {}
        );
};

exports._meta = {
    "version": 1
};
