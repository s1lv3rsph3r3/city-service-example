const mysql = require('mysql');

class DatabaseUtility {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  static execute(config, callback) {
    const database = new DatabaseUtility(config);
    return callback(database).then(
      (result) => database.close().then(() => result),
      (err) => database.close().then(() => { throw err; }),
    );
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = DatabaseUtility;
