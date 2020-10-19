const { tasks } = require('./ExampleTasks');
/**
 * This is an ExampleTaskFactory
 * This factory class can start multiple scheduled jobs
 * however, all the jobs should be closely related and
 * uniquely identifiable through a taskKey.
 */
class ExampleTaskFactory {

    // TODO: Keep stats on starting and stopping tasks and length of running
    constructor() {
        this.jobs = {};
        this.tasks = tasks;
    }

    /**
     * Setup task used to load any necessary data or run any checks before
     * starting the scheduled job - This function should be called in the bootloader
     * of the module in which it resides.
     * @returns {Promise<void>}
     */
    async setup() {
        // Run any setup logic here before registering your task
    }

    /**
     * Start all the necessary scheduled jobs with this function.
     * This should only be executed after setup() has successfully completed
     */
    spawn() {
        Object.keys(this.tasks).forEach((key) => {
            this.start(key);
        });
    }

    dispose() {
        Object.keys(this.tasks).forEach((key) => {
           this.stop(key);
        });
    }

    /**
     * Pass a unique taskKey and the job will be started and added
     * to the list of running jobs
     * @param taskKey
     */
    start(taskKey) {
        // TODO: Check that the key is unique before assigning to prevent schedules from running anonymously in the background
        // Keep track of all the jobs with unique key
        this.jobs[taskKey] = this.tasks[taskKey].apply(null);
    }

    /**
     * Pass a unique taskKey and the job will be stopped and removed
     * from the list of running jobs
     * @param taskKey
     */
    stop(taskKey) {
        // TODO: Catch/Throw errors when a taskKey is given but it is not part of the current running jobs
        this.jobs[taskKey].cancel();
        delete this.jobs[taskKey];
    }
}
module.exports = ExampleTaskFactory;