const ExampleServiceProvider = require('../../serviceProviders/ExampleServiceProvider');

class ExampleController {
  static async exampleGetFunction(req, res) {
    await ExampleServiceProvider.retrieveData()
      .then((results) => res.status(200).json(results))
      .catch((err) => {
        const responseValues = {
          status: 500,
          message: err.message,
        };
        return res.status(responseValues.status).json({
          message: responseValues.message,
        });
      });
  }

  static async examplePostFunction(req, res) {
    console.log(req.body);
    await ExampleServiceProvider.updateData()
      .then((results) => res.status(200).json(results))
      .catch((err) => {
        const responseValues = {
          status: 500,
          message: err.message,
        };
        return res.status(responseValues.status).json({
          message: responseValues.message,
        });
      });
  }
}

module.exports = ExampleController;
