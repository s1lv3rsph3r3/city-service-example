const request = require('supertest');
const bodyParser = require('body-parser');
const app = require('../../../utility/ApplicationUtility');
const expressApp = require('../../../app');

describe('Test the callbacks in ApplicationUtility.js...', () => {
  beforeAll(() => {
    // Create the express app
    app.startApplication(
      expressApp,
      bodyParser.json(),
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    // Start the routing for the predefined modules
    app.startWebRouting(expressApp);

    // Start the routing for the API endpoints
    app.startApiRouting(expressApp);
  });

  // Used to test the pdf generator module
  test.skip('generates a pdf', async (done) => {
    const response = await request(expressApp).get('/api/v1/pdfGenerator/pdf-example');
    expect(response.status).toBe(200);
    done();
  });
});
