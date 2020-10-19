const expectedResultSet = {
  1: [],
};
const expectedSuccessMsg = 'User registered successfully';

const expectedErrorMsg = 'Expected Error';
const expectedError = new Error(expectedErrorMsg);

const createUserMock = jest.fn()
  .mockImplementationOnce(() => new Promise((resolve) => {
    resolve(expectedResultSet);
  }))
  .mockImplementationOnce(() => new Promise((resolve, reject) => {
    reject(expectedError);
  }));

jest.doMock(
  '../../../../applicationModules/default/dataProviders/RegisterDataProvider',
  () => ({
    createUser: createUserMock,
  }),
);

const registerServiceProvider = require(
  '../../../../applicationModules/default/serviceProviders/RegisterServiceProvider',
);

describe('Test RegisterServiceProvider in default module...', () => {
  test('expect registerNewUser() to process successfully', async (done) => {
    const userId = 1;
    const response = await registerServiceProvider.registerNewUser(userId);
    expect(response.message).toEqual(expectedSuccessMsg);
    done();
  });
  test('expect registerNewUser() to throw error', async (done) => {
    const userId = 1;
    await expect(registerServiceProvider.registerNewUser(userId))
      .rejects
      .toThrowError(expectedError);
    done();
  });
});
