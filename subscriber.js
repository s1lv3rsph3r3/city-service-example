const redis = require('redis');

// Create the subscriber
const subscriber = redis.createClient();

module.exports = subscriber;
