const request = require('supertest');

describe('Test event endpoints in default mode', () => {
  beforeAll(() => {
    // Create the express app
    // Start the routing for the predefined modules
    // Start the routing for the API endpoints
  });
  // Middleware to handle username/password not currently supported
  test.skip('expect POST /default/register-new-user to return unauthorised', async (done) => {
    // const response = await request(expressApp)
    //   .post('/default/register-new-user')
    //   .send({
    //     username: undefined,
    //     password: 'password',
    //     userId: 1,
    //   }).set('Accept', 'application/json');
    // expect(response.status).toBe(401);
    // expect(response.message).toBe('Request not authorised');
    expect(true).toEqual(false);
    done();
  });
});
