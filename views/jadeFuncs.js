var jade = require('jade');
var path = require('path');

module.exports = {
    index: jade.compileFile(
        path.resolve(__dirname, 'index.jade')),
    error: jade.compileFile(
        path.resolve(__dirname, 'error.jade'))
};