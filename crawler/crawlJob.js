function cronJob () {
    var crawlAll = require('./crawl').crawlAll;

    var CronJob = require('cron').CronJob;
    var job = new CronJob({
        cronTime: '00 00 */4 * * *',		// sec min hour date month weekday
        onTick: function() {
            crawlAll();
        },
        start: false,
        timeZone: 'Asia/Shanghai'	// Asia/Shanghai
    });
    job.start();
}

function go() {

}
