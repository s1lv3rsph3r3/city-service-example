const { BRC487 } = require('@s1lv3rsph3r3/central');
// eslint-disable-next-line import/no-dynamic-require
const exampleServiceProvider = require(BRC487.commute('serviceProviders.ExampleServiceProvider'));
module.exports = (function start() {
  const exampleGetFunction = async (req, res) => {
    await exampleServiceProvider.retrieveData().then((results) => {
      return res.status(200).json(results);
    }).catch((err) => {
      const responseValues = {
        status: 500,
        message: err.message,
      };
      return res.status(responseValues.status).json({
        message: responseValues.message,
      });
    });
  };
  const examplePostFunction = async (req, res) => {
    console.log(req.body);
    await exampleServiceProvider.updateData().then((results) => {
      return res.status(200).json(results);
    }).catch((err) => {
      const responseValues = {
        status: 500,
        message: err.message,
      };
      return res.status(responseValues.status).json({
        message: responseValues.message,
      })
    });
  };

  return {
    exampleGetFunction,
    examplePostFunction,
  };
}());
