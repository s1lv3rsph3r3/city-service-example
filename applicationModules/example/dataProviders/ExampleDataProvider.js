const mysql = require('mysql');

const dbHost = 'insert-host-here';
const dbDatabase = 'insert-database-here';
const dbUsername = 'insert-username-here';
const dbPassword = 'insert-password-here';

class ExampleDataProvider {
  static retrieveData() {
    return new Promise((resolve, reject) => {
      // insert this body.userId into the database for later tracking
      const connection = mysql.createConnection({
        host: dbHost,
        user: dbUsername,
        password: dbPassword,
        database: dbDatabase,
      });

      connection.connect([], (err) => {
        if (err) {
          reject(new Error('Failed to connect to the dataProviders services'));
        }
        connection.query('SELECT * FROM example', [], (err, results) => {
          if (results === undefined) {
            reject(new Error('Failed to retrieve the dataProviders'));
          }
          resolve(results);
        });
      });
    });
  }

  static updateData() {
    return new Promise((resolve, reject) => {
      const description = 'Hello World';
      // connect to the database using credentials
      const connection = mysql.createConnection({
        host: dbHost,
        user: dbUsername,
        password: dbPassword,
        database: dbDatabase,
      });

      connection.connect([], (err) => {
        if (err) {
          reject(new Error('Failed to connect to the dataProviders services'));
        }
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
    });
  }
}

module.exports = ExampleDataProvider;
