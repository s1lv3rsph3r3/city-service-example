#!/usr/bin/env node
const bodyParser = require('body-parser');
const environment = require('./environment');
const { server } = require('./server');
const expressApp = require('./app');
const ApplicationUtility = require('./utility/ApplicationUtility');
const EndpointUtility = require('./utility/EndpointUtility');

const subscriber = require('./subscriber');

// Create the http server
const httpServer = server.startServer(
  expressApp,
);

/* Not ready to use until middleware are properly implemented */
// applicationUtils.bindApplicationMiddleware(expressApp);

// Start the middleware for the current application
ApplicationUtility.startApplication(
  expressApp,
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Start the routing for the predefined modules
ApplicationUtility.startWebRouting(expressApp);

// Start the routing for the API endpoints
ApplicationUtility.startApiRouting(expressApp);

/* Not ready to use until redis is appropriately implemented */
ApplicationUtility.startEventRouting(subscriber);

/* Not ready to implement yet */
/* This should take records from the database and subscribe to the channels */
ApplicationUtility.moduleSpecificBootloader();

// Let the server listen on a particular port
httpServer.listen(environment.getVariables().appPort, () => {
  // console.log(`Listening on port ${environment.getVariables().appPort}`);
});

// On connection the following events should happen:
//  > Check if exists: [GUEST_JWT, AUTH_JWT]
//  > Authenticate either/both
//  > Log Socket ID in Redis with either GUEST or Authorised User ID as saved in the JWT
//  > Redis can subscribe to all events but only authorised people will receive
//    the dataProviders when broadcasting

// Consider moving the Redis subscriptions to a separate module

// Consider moving the Redis emitting to another module
// Emit message to subscribed sockets when an event occurs

// io.on('connect', function(socket) {
//
//   socket.on('message', function(msg){
//     // console.log(msg.token);
//     // if(msg.token !== undefined){
//     //   result = jwt.verify(msg.token, jwtSecret);
//     //   console.log(result);
//     // }
//     console.log('socket: ' + socket.id);
//   });
//
//   socket.on('disconnect', function(){
//     console.log('socket: ' + socket.id);
//     console.log('socket disconnected');
//   });
// });

// io.on('disconnect', function(socket) {
//   console.log('socket disconnected');
// });

subscriber.on('message', (channel, message) => {
  console.log(`Message Received: ${message}`);
  // at the moment the channel is something like <userId>::<domain>::<channel>
  // this is no good for clients as they only register with domain
  // needs to be a suitable way to map <userId>::<domain>::<channel> to a public token
  // just like a simple string/keyword
  // this way clients connect using keyword and only get events they should
  // io.emit(channel, message);
});
EndpointUtility.printEndpoints();
