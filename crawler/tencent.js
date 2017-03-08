function crawlAll() {
    crawl('http://sports.qq.com', '/a', 'sports', 10);
    crawl('http://finance.qq.com', 'http://finance.qq.com/a', 'finance', 10);
    crawl('http://ent.qq.com', 'http://ent.qq.com/a', 'ent', 10);
    crawl('http://tech.qq.com', 'http://tech.qq.com/a', 'tech', 10);
    crawl('http://mil.qq.com/mil_index.htm', 'http://mil.qq.com/a', 'military', 10);
    crawl('http://news.qq.com/world_index.shtml', 'http://news.qq.com/a', 'world', 10);
    crawl('http://society.qq.com', 'http://society.qq.com/a', 'local', 10);
}

function crawl(uri, linkPrefix, category, num) {
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
                        return;

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