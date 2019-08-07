const CronJob = require('cron').CronJob;
const request = require('request');

new CronJob('00 00 01 * * *', function() {
    request('http://localhost:5000');
}, null, true, 'America/Los_Angeles');

new CronJob('00 00 00 * * *', function() {
    request('http://localhost:80/update-date');
}, null, true, 'America/Los_Angeles');
