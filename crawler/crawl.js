var tag = '[CRAWLER]';

function mkdir() {
    var fs = require('fs');
    var path = require('path');
    var prefix = path.resolve(__dirname, '../public/news');

    if(!fs.existsSync(prefix))
        fs.mkdirSync(prefix);

    if(!fs.existsSync(path.resolve(prefix, './sports')))
        fs.mkdirSync(path.resolve(prefix, './sports'));
    if(!fs.existsSync(path.resolve(prefix, './ent')))
        fs.mkdirSync(path.resolve(prefix, './ent'));
    if(!fs.existsSync(path.resolve(prefix, './finance')))
        fs.mkdirSync(path.resolve(prefix, './finance'));
    if(!fs.existsSync(path.resolve(prefix, './local')))
        fs.mkdirSync(path.resolve(prefix, './local'));
    if(!fs.existsSync(path.resolve(prefix, './world')))
        fs.mkdirSync(path.resolve(prefix, './world'));
    if(!fs.existsSync(path.resolve(prefix, './military')))
        fs.mkdirSync(path.resolve(prefix, './military'));
    if(!fs.existsSync(path.resolve(prefix, './tech')))
        fs.mkdirSync(path.resolve(prefix, './tech'));

    if(!fs.existsSync(path.resolve(prefix, './sports/a')))
        fs.mkdirSync(path.resolve(prefix, './sports/a'));
    if(!fs.existsSync(path.resolve(prefix, './sports/img')))
        fs.mkdirSync(path.resolve(prefix, './sports/img'));
    if(!fs.existsSync(path.resolve(prefix, './ent/a')))
        fs.mkdirSync(path.resolve(prefix, './ent/a'));
    if(!fs.existsSync(path.resolve(prefix, './ent/img')))
        fs.mkdirSync(path.resolve(prefix, './ent/img'));
    if(!fs.existsSync(path.resolve(prefix, './finance/a')))
        fs.mkdirSync(path.resolve(prefix, './finance/a'));
    if(!fs.existsSync(path.resolve(prefix, './finance/img')))
        fs.mkdirSync(path.resolve(prefix, './finance/img'));
    if(!fs.existsSync(path.resolve(prefix, './local/a')))
        fs.mkdirSync(path.resolve(prefix, './local/a'));
    if(!fs.existsSync(path.resolve(prefix, './local/img')))
        fs.mkdirSync(path.resolve(prefix, './local/img'));
    if(!fs.existsSync(path.resolve(prefix, './world/a')))
        fs.mkdirSync(path.resolve(prefix, './world/a'));
    if(!fs.existsSync(path.resolve(prefix, './world/img')))
        fs.mkdirSync(path.resolve(prefix, './world/img'));
    if(!fs.existsSync(path.resolve(prefix, './military/a')))
        fs.mkdirSync(path.resolve(prefix, './military/a'));
    if(!fs.existsSync(path.resolve(prefix, './military/img')))
        fs.mkdirSync(path.resolve(prefix, './military/img'));
    if(!fs.existsSync(path.resolve(prefix, './tech/a')))
        fs.mkdirSync(path.resolve(prefix, './tech/a'));
    if(!fs.existsSync(path.resolve(prefix, './tech/img')))
        fs.mkdirSync(path.resolve(prefix, './tech/img'));
}

function crawlAll() {
    var count = 10;

    crawlTencent('http://sports.qq.com', '/a', 'sports', count);
    crawlTencent('http://finance.qq.com', 'http://finance.qq.com/a', 'finance', count);
    crawlTencent('http://ent.qq.com', 'http://ent.qq.com/a', 'ent', count);
    crawlTencent('http://tech.qq.com', 'http://tech.qq.com/a', 'tech', count);
    crawlTencent('http://mil.qq.com/mil_index.htm', 'http://mil.qq.com/a', 'military', count);
    crawlTencent('http://news.qq.com/world_index.shtml', 'http://news.qq.com/a', 'world', count);
    crawlTencent('http://society.qq.com', 'http://society.qq.com/a', 'local', count);

    crawlIfeng('http://sports.ifeng.com', 'http://sports.ifeng.com/a', 'sports', count);
    crawlIfeng('http://ent.ifeng.com', 'http://ent.ifeng.com/a', 'ent', count);
    crawlIfeng('http://finance.ifeng.com', 'http://finance.ifeng.com/a', 'finance', count);
    crawlIfeng('http://news.ifeng.com/mil', 'http://news.ifeng.com/a', 'military', count);
    crawlIfeng('http://tech.ifeng.com', 'http://tech.ifeng.com/a', 'tech', count);
    crawlIfeng('http://news.ifeng.com/world', 'http://news.ifeng.com/a', 'world', count);
    crawlIfeng('http://news.ifeng.com/society', 'http://news.ifeng.com/a', 'local', count);

    crawlZaker('http://www.myzaker.com/channel/8', '//www.myzaker.com/article', 'sports', count);
    crawlZaker('http://www.myzaker.com/channel/9', '//www.myzaker.com/article', 'ent', count);
    crawlZaker('http://www.myzaker.com/channel/13', '//www.myzaker.com/article', 'tech', count);
    crawlZaker('http://www.myzaker.com/channel/3', '//www.myzaker.com/article', 'military', count);
    crawlZaker('http://www.myzaker.com/channel/4', '//www.myzaker.com/article', 'finance', count);
    crawlZaker('http://www.myzaker.com/channel/2', '//www.myzaker.com/article', 'world', count);
    crawlZaker('http://www.myzaker.com/channel/1', '//www.myzaker.com/article', 'local', count);

    // todo this process never ends cuz the connection is not released
}

function crawlTencent(uri, linkPrefix, category, count) {
    crawl(uri, linkPrefix, category, count, '腾讯', {id: 'Cnt-Main-Article-QQ'});
}

function crawlIfeng(uri, linkPrefix, category, count) {
    crawl(uri, linkPrefix, category, count, '凤凰网', {id: 'main_content'});
}

function crawlZaker(uri, linkPrefix, category, count) {
    crawl(uri, linkPrefix, category, count, 'Zaker', {class: 'article_content'});
}

function crawl(uri, linkPrefix, category, num, source, mainContentIdentifier) {
    var uuidV1 = require('uuid/v1');
    var url = require('url');
    var getDom = require('./util').getDom;
    var saveContent = require('./util').saveContent;

    getDom(uri, function (err, $) {
        if (err) {
            console.error(tag, err.message, uri);
            return;
        }

        var count = 0;
        $('a').each(function (i, elem) {
            if (elem.attribs.href)
                if (elem.attribs.href.indexOf(linkPrefix) === 0
                    && elem.children && elem.children[0] && elem.children[0].data
                    && elem.children[0].data.trim()) {

                    count++;
                    if (count > num)
                        return false;

                    var title = elem.children[0].data.trim();
                    var contentUri = url.resolve(uri, elem.attribs.href);

                    if (title.length > 5) {
                        console.log(tag, source, title);
                        var uuid = uuidV1();

                        getDom(contentUri, function (err, $) {
                            if (err) {
                                console.error(tag, err.message, contentUri);
                                return;
                            }

                            saveContent($(mainContentIdentifier.id ? '#' + mainContentIdentifier.id :
                                    '.' + mainContentIdentifier.class).children(), category, uuid,
                                contentUri, source, title);
                        });
                    } else {
                        console.log(tag, 'skipped', source, title);
                    }
                }
        });
    });
}

module.exports = {
    crawlAll: crawlAll
};

mkdir();