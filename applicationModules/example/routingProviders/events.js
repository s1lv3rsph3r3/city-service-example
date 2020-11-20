const { Event } = require('@s1lv3rsph3r3/metropolitan');

// Event.subscribe('ExampleEvent').publish('ExampleEventController@exampleEvent');
Event.subscribe('ExampleEvent').publish(() => {
  /* Empty publish handler */
});
