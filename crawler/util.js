var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var fs = require('fs');
var path = require('path');
var async = require('async');
var url = require('url');

var qGetDom = async.queue(function (obj, cb) {
    request.get({
        uri: obj.uri,
        encoding: null,
        timeout: 5000
    }, function (err, res, body) {
        cb();

        if (err) {
            obj.callback(err);
            return;
        }

        var contentType = res.headers['content-type'];
        var charset = 'utf-8';
        if (contentType.indexOf('=') >= 0)
            charset = contentType.substr(contentType.indexOf('=') + 1);

        $ = cheerio.load(iconv.decode(body, charset));

        obj.callback(null, $);
    });
}, 10);

var qGetImg = async.queue(function (obj, cb) {
    var filename = obj.filename;
    request.get({
        uri: obj.uri,
        timeout: 10000
    }).on('error', function (err) {
        fs.unlinkSync(filename);
        cb();
    }).pipe(fs.createWriteStream(filename)
    ).on('close', function () {
        cb();
        if (fs.existsSync(filename))
            fs.rename(filename, path.join(path.dirname(filename), 'done_' + path.basename(filename)),
                function (err) {
                    if (err)
                        throw err;
                });
    });
}, 2);

function getDom(uri, callback) {
    qGetDom.push({
        uri: uri,
        callback: callback
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
    if (fs.existsSync(filename));
    // todo 存到数据库
}

function getData(child, str, category, uuid) {
    if (child.name === 'style' || child.name === 'script' || child.name === 'iframe'
        || child.name === 'span' || child.name === 'ul' || child.name === 'a' ||
        child.name === 'ol' || child.name === 'i' || child.name === 'table') // div 不能搞掉，ZAKER 的图片是在 div 里面的
        return str;

    if (child.data && child.type !== 'comment')
        str += child.data.trim();

    if (child.children)
        for (var i = 0; i < child.children.length; i++)
            str = getData(child.children[i], str, category, uuid);

    if (child.name === 'img') {
        var filename = path.resolve(__dirname, '../public/news/' + category + '/img/' + uuid + '.jpeg');
        if (!fs.existsSync(filename) && (child.attribs.src || child.attribs['data-original'])) {
            var uri = child.attribs.src ? url.resolve('http://', child.attribs.src) :
                url.resolve('http://', child.attribs['data-original']);
            // console.log(uri);
            qGetImg.push({
                uri: uri,
                filename: filename
            });
        }
    }
    return str;
}

module.exports = {
    getDom: getDom,
    saveContent: saveContent
};
