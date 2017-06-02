function cronJob () {
    var crawlAll = require('./crawl').crawlAll;
    var deleteObsolete = require('./delete').deleteObsolete;
    var tag = '[CRAWLER]';

    var CronJob = require('cron').CronJob;
    var job = new CronJob({
        cronTime: '00 00 */4 * * *',		// sec min hour date month weekday
        // cronTime: '0 * * * * *',
        onTick: function() {
            deleteObsolete();
            crawlAll();
        },
        start: false,
        timeZone: 'Asia/Shanghai'	// Asia/Shanghai
    });
    job.start();
    console.log(tag, 'cronjob started');
}

cronJob();