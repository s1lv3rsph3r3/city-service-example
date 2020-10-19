const { BRC487 } = require('@s1lv3rsph3r3/central');
// eslint-disable-next-line import/no-dynamic-require
const exampleDataProvider = require(BRC487.commute('dataProviders.ExampleDataProvider'));
module.exports = (function start() {
  const retrieveData = () => new Promise((resolve, reject) => {
    exampleDataProvider.retrieveData()
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
  const updateData = () => new Promise((resolve, reject) => {
    exampleDataProvider.updateData()
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
  return {
    retrieveData,
    updateData,
  };
}());
