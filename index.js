const {transports, createLogger, format} = require('winston');
require('winston-daily-rotate-file');
let moment = require('moment');

let transport = new (transports.DailyRotateFile)({
    filename: 'boa-api.log',
    dirname: 'var/log',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '1m',
});

let logger = createLogger({
    level: 'info',
    format: format.combine(
        format.json(),
        format.timestamp()
    ),
    defaultMeta: {
        service: 'boa-cron',
        timestamp: moment().format()
    },
    transports: [
        transport
    ]
});

const CronJob = require('cron').CronJob;
const request = require('request');

// Once a day at 1 AM
new CronJob('00 00 01 * * *', async function() {
    logger.info('Signaling scraper job - STARTING');
    try {
        await request('http://scraper:5000');
        logger.info('Signaling scraper job - COMPLETE')
    } catch (e) {
        logger.error(e.toString())
    }
}, null, true, 'America/Los_Angeles');

// Update date every minute
new CronJob('0 */1 * * * *', async function() {
    logger.info('Signaling update date - STARTING');
    try {
        await request('http://api:80/update-date');
        logger.info('Signaling update date - COMPLETE')
    } catch (e) {
        logger.error(e.toString())
    }
}, null, true, 'America/Los_Angeles');
