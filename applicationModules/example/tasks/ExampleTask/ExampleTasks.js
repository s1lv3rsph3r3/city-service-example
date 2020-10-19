const schedule = require('node-schedule');

/**
 * List tasks here in the following manner:
 * '<key>': () => {
 *     return schedule.scheduleJob('<cronSchedule>', (<arg1>, <arg2>, <arg3>, ...) => {
 *         // Fill in the task to be completed here
 *     })
 * }
 * <key>: Must be a unique value to distinguish in the global task space
 * <cronSchedule>: A string that follows the cron format '* * * * * *'
 * <arg1>, <arg2>, <arg3> etc: Arguments to use as part of your scheduled function
 */
const tasks = {

    /*
     * A five second print job. When loaded by the task factory and started
     * this will print 'exampleTask called.' every five seconds.
     */
    'exampleTask': () => {
        return schedule.scheduleJob('*/5 * * * * *', () => {
            // This example job should print this statement every 5 seconds
            console.log('exampleTask called.');
        });
    }
}

module.exports = { tasks };