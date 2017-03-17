var fs = require('fs');
var file = require('file');
var path = require('path');

count('finance');
count('ent');
count('local');
count('military');
count('sports');
count('tech');
count('world');

function count(dir) {
    countDir(path.resolve(__dirname, '../public/news/' + dir + '/a'), dir + ' a');
    countDir(path.resolve(__dirname, '../public/news/' + dir + '/img'), dir + ' i');
}

function countDir(path, folder) {
    fs.readdir(path, function (err, files) {
        if(err)
            throw err;
        console.log(folder, files.length);
    });
}