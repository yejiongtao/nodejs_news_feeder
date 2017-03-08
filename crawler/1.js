require('./util').getDom('http://finance.qq.com/a/20170308/009229.htm', function (err, $) {
    // require('./util').getDom('http://finance.qq.com/a/20170307/025178.htm', function (err, $) {
    if(err)
        throw err;
    require('./util').saveContent($('#Cnt-Main-Article-QQ').children(), 'finance', '111');
});

// console.log(require('url').resolve('http://mil.qq.com/mil_index.htm', '/a/123'))