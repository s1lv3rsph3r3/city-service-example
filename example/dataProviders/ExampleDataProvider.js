const { BRC487 } = require('@s1lv3rsph3r3/central');
const mysql = require('mysql');
// eslint-disable-next-line import/no-dynamic-require
const environment = require(BRC487.commute('environment'));
const { dbHost } = environment.getVariables();
const { dbDatabase } = environment.getVariables();
const { dbUsername } = environment.getVariables();
const { dbPassword } = environment.getVariables();

module.exports = (function start() {
  const retrieveData = () => new Promise((resolve, reject) => {
    // insert this body.userId into the database for later tracking
    const connection = mysql.createConnection({
      host: dbHost,
      user: dbUsername,
      password: dbPassword,
      database: dbDatabase,
    });

    connection.connect((err) => {
      if (err) {
        reject(new Error('Failed to connect to the dataProviders services'));
      }
    });

    connection.query('SELECT * FROM example', [], (err, results) => {
      if (results === undefined) {
        reject(new Error('Failed to retrieve the dataProviders'));
      }
      resolve(results);
    });
  });

  const updateData = () => new Promise((resolve, reject) => {
    const description = 'Hello World';
    // connect to the database using credentials
    const connection = mysql.createConnection({
      host: dbHost,
      user: dbUsername,
      password: dbPassword,
      database: dbDatabase,
    });

    connection.connect((err) => {
      if (err) {
        reject(new Error('Failed to connect to the dataProviders services'));
      }
    });

    const records = [
      [description],
    ];

    connection.query('INSERT INTO example (description) VALUES ? ', [records], (err, results) => {
      if (results === undefined) {
        reject(new Error('Failed to update the dataProviders'));
      }
      resolve(results);
    });
  });

  return {
    retrieveData,
    updateData,
  };
}());
