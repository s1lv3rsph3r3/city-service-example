// eslint-disable-next-line no-unused-vars
const { Route } = require('@s1lv3rsph3r3/metropolitan');
/**
 * Example usage is as follows:
 *
 * A simple Web Route GET request
 *    => Route.get('/admin', (req, res) => { res.send('HELLO WORLD'); });
 *
 * A simple Web Route POST request
 *    => Route.post('/admin', (req, res) => { res.send('HELLO WORLD'); });
 */

/* Example GET */
Route.get('/get', 'ExampleController@exampleGetFunction')
  .setName('example.get');

/* Example POST */
Route.post('/post', 'ExampleController@examplePostFunction')
  .setName('example.post');

/* Help and About function - NOT CURRENTLY SUPPORTED */
Route.get('/help', (req, res) => {
  res.send('Not currently supported');
}).setName('example.help');
Route.get('/about', (req, res) => {
  res.send('Not currently supported');
}).setName('example.about');
