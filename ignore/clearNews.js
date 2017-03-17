var fs = require('fs');
var file = require('file');
var path = require('path');

clear('finance');
clear('ent');
clear('local');
clear('military');
clear('sports');
clear('tech');
clear('world');

function clear(dir) {
    clearDir(path.resolve(__dirname, '../public/news/' + dir + '/a'));
    clearDir(path.resolve(__dirname, '../public/news/' + dir + '/img'));
}

function clearDir(path) {
    file.walk(path, function(err, dirPath, dirs, files) {
        files.forEach(function(filePath) {
            fs.unlinkSync(filePath);
        });
    });
}