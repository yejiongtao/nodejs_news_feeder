var crypto = require('crypto');

function digest(content) {
    var md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
}

module.exports = digest;