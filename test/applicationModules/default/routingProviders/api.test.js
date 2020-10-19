const expectedErrorMsg = 'Expected Error';
const expectedError = new Error(expectedErrorMsg);

const expectedSuccessMsg = 'User registered successfully';
const expectedSuccess = {
  message: expectedSuccessMsg,
};
const registerNewUserMock = jest.fn()
  // Mock for test 1 - test ignored whilst middleware is implemented
  // .mockImplementationOnce(() => new Promise((resolve) => {
  //   resolve(expectedSuccess);
  // }))
  // Mock for test 2
  .mockImplementationOnce(() => new Promise((resolve) => {
    resolve(expectedSuccess);
  }))
  // Mock for test 3
  .mockImplementationOnce(() => new Promise((resolve, reject) => {
    reject(expectedError);
  }));

jest.doMock('../../../../applicationModules/default/serviceProviders/RegisterServiceProvider', () => ({
  registerNewUser: registerNewUserMock,
}));
const request = require('supertest');
const expressApp = require('../../../../app');
const bodyParser = require('body-parser');
const app = require('../../../../utility/ApplicationUtility');

describe('Test api endpoints in default module...', () => {
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
  // Middleware to handle username/password not currently supported
  test.skip('expect POST /api/v1/default/register-new-user to return unauthorised', async (done) => {
    const response = await request(expressApp)
      .post('/api/v1/default/register-new-user')
      .send({
        username: undefined,
        password: 'password',
        userId: 1,
      }).set('Accept', 'application/json');
    expect(response.status).toBe(401);
    expect(response.message).toBe('Request not authorised');
    done();
  });
  test('expect POST /api/v1/default/register-new-user to exist ', async (done) => {
    const response = await request(expressApp)
      .post('/api/v1/default/register-new-user')
      .send({
        username: 'admin',
        password: 'password',
        userId: 1,
      })
      .set('Accept', 'application/json');
    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toEqual(expectedSuccess);
    done();
  });
  test('expect POST /api/v1/default/register-new-user to respond with error message', async (done) => {
    const response = await request(expressApp)
      .post('/api/v1/default/register-new-user')
      .send({
        username: 'admin',
        password: 'password',
        userId: 1,
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(expectedErrorMsg);
    done();
  });
});
