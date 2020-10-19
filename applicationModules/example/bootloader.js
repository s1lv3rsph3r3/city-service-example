/** ===================================================================== **/
/** This is the bootloader class for the module.                          **/
/** ===================================================================== **/

// Task Factory Classes
const ExampleTaskFactory = require('./tasks/ExampleTask/ExampleTaskFactory');

// Atomic functions
const examplePreReqFunction1 = () => new Promise((resolve) => {
  resolve([]);
});

/**
 * Bootloader should call all required functions
 * for loading necessary data for this particular
 * module to work. Calls should be handled in a synchronous
 * fashion to ensure the correct processes occur in
 * declared order.
 */
(async () => {

  // Start up and spawn the necessary tasks
  const exampleTaskFactory = new ExampleTaskFactory();
  await exampleTaskFactory.setup();
  await exampleTaskFactory.spawn();

  // Run each function synchronously
  await examplePreReqFunction1()
    .catch((err) => {
      // Handle errors
      throw err;
    });
})();
