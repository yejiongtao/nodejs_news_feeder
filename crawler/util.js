var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var fs = require('fs');
var path = require('path');

function getDom(uri, callback) {
    request.get({
        uri: uri,
        encoding: null
    }, function (err, res, body) {
        if (err)
            callback(err);

        var contentType = res.headers['content-type'];
        var charset = contentType.substr(contentType.indexOf('=') + 1);
        $ = cheerio.load(iconv.decode(body, charset));

        callback(null, $);
    });
}

function saveContent(children, category, uuid) {
    var filename = path.resolve(__dirname, '../public/news/' + category + '/a/' + uuid + '.txt');
    children.each(function (i, elem) {
        var str = '';
        str = getData(elem, str, category, uuid);
        if (str !== '')
            fs.appendFileSync(filename, str + '\n\n');
    });
    if(fs.existsSync(filename));
        // todo 存到数据库
}

function getData(child, str, category, uuid) {
    if (child.name === 'style' || child.name === 'script' || child.name === 'iframe'
        || child.name === 'div' || child.name === 'ul')
        return str;

    if (child.data && child.type !== 'comment')
        str += child.data.trim();

    if (child.children)
        for(var i=0; i < child.children.length; i++)
            str = getData(child.children[i], str, category, uuid);

    if (child.name === 'img') {
        var filename = path.resolve(__dirname, '../public/news/' + category + '/img/' + uuid + '.jpeg');
        if (!fs.existsSync(filename) && child.attribs.src)
            request(child.attribs.src).pipe(fs.createWriteStream(filename));
    }
    return str;
}

module.exports = {
    getDom: getDom,
    saveContent: saveContent
};
