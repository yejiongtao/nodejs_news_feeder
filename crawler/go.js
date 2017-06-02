function go() {
    var file = require('path').resolve(__dirname, './crawlJob.js');
    var p = require('child_process').spawn('node', [file]);
    p.stdout.pipe(process.stdout);
    p.stderr.pipe(process.stderr);
}

module.exports = {
    go: go
};
