module.exports = {
    COLUMN: {
        SPORTS: 1,
        ENTERTAINMENT: 2,
        TECHNOLOGY: 3,
        FINANCE: 4,
        MILITARY: 5,
        WORLD: 6,
        LOCAL: 7
    },
    COLUMN_NAME: {
        RECOMMEND: "推荐快讯",
        SPORTS: "体育新闻",
        ENTERTAINMENT: "娱乐快报",
        TECHNOLOGY: "科技前沿",
        FINANCE: "财经讯息",
        MILITARY: "军事动态",
        WORLD: "世界新闻",
        LOCAL: "本地报道"
    },
    CATEGORY_MASK: {
        SPORTS: 1<<0,
        ENTERTAINMENT: 1<<1,
        TECHNOLOGY: 1<<2,
        FINANCE: 1<<3,
        MILITARY: 1<<4,
        WORLD: 1<<5,
        LOCAL: 1<<6
    },

    datetimeFormat: 'YYYY-MM-DD HH:mm:ss',

    cookieKey: 'this is key',

    sessionAge: 1000 * 3600 * 3
};