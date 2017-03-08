function crawlAll() {
    var count = 10;

    crawlTencent('http://sports.qq.com', '/a', 'sports', count);
    crawlTencent('http://finance.qq.com', 'http://finance.qq.com/a', 'finance', count);
    crawlTencent('http://ent.qq.com', 'http://ent.qq.com/a', 'ent', count);
    crawlTencent('http://tech.qq.com', 'http://tech.qq.com/a', 'tech', count);
    crawlTencent('http://mil.qq.com/mil_index.htm', 'http://mil.qq.com/a', 'military', count);
    crawlTencent('http://news.qq.com/world_index.shtml', 'http://news.qq.com/a', 'world', count);
    crawlTencent('http://society.qq.com', 'http://society.qq.com/a', 'local', count);

    // todo 用来抓其他网站的应该也可以，除了 Cnt-Main-Article-QQ
}

function crawlTencent(uri, linkPrefix, category, count) {
    crawl(uri, linkPrefix, category, count, '腾讯');
}

function crawl(uri, linkPrefix, category, num, source) {
    var uuidV1 = require('uuid/v1');
    var url = require('url');
    var getDom = require('./util').getDom;
    var saveContent = require('./util').saveContent;

    getDom(uri, function (err, $) {
        if (err)
            throw err;

        var count = 0;
        $('a').each(function (i, elem) {
            if (elem.attribs.href)
                if (elem.attribs.href.indexOf(linkPrefix) === 0
                    && elem.children[0].data
                    && elem.children[0].data.trim()) {  // todo 还要判断这个 uri 是不是已经有了

                    count++;
                    if(count > num)
                        return false;

                    console.log(elem.children[0].data.trim());
                    var title = elem.children[0].data.trim();
                    var contentUri = url.resolve(uri, elem.attribs.href);
                    var uuid = uuidV1();

                    getDom(contentUri, function (err, $) {
                        if(err)
                            throw err;
                        saveContent($('#Cnt-Main-Article-QQ').children(), category, uuid);
                    });
                }
        });
    });
}

module.exports = {
    crawlAll: crawlAll
};

crawlAll();