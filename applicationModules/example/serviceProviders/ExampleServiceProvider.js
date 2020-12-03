const ExampleDataProvider = require('../dataProviders/ExampleDataProvider');

class ExampleServiceProvider {
  static retrieveData() {
    return new Promise((resolve, reject) => {
      ExampleDataProvider.retrieveData()
        .then((results) => {
          const responseValues = {
            message: 'Data retrieved successfully',
            data: results,
          };
          resolve(responseValues);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  static updateData() {
    return new Promise((resolve, reject) => {
      ExampleDataProvider.updateData()
        .then((results) => {
          const responseValues = {
            message: 'Data updated successfully',
            data: results,
          };
          resolve(responseValues);
        }).catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = ExampleServiceProvider;
