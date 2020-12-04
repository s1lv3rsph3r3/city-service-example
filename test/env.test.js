const environment = require('../environment');

const getVariablesMock = () => ({
  // Server settings
  appPort: '3000',
  appUrl: 'localhost',
});
jest.doMock('../environment', () => ({
  getVariables: getVariablesMock,
}));
const mockedEnv = require('../environment');

const expectedArrayOfKeys = [
  // Server Settings
  'appPort',
  'appUrl',
];

// Tests that the .env exists with the correct declarations
describe('Test the environment is setup with the correct variables...', () => {
  test('should expect environment to exist as a type of object', () => {
    expect(typeof environment).toEqual('object');
  });
  test('should expect environment to be of size 1', () => {
    expect(Object.keys(environment).length).toEqual(1);
  });
  test('should expect environment keys to include only getVariables', () => {
    const expected = ['getVariables'];
    expect(Object.keys(environment)).toEqual(expected);
  });
  test('should expect getVariables to return type of object', () => {
    expect(typeof (environment.getVariables())).toEqual('object');
  });
  test('should expect getVariables object to be of size 11', () => {
    expect(Object.keys(environment.getVariables()).length).toEqual(2);
  });
  test('should expect the getVariables keys to include expected list', () => {
    expect(Object.keys(environment.getVariables())).toEqual(expectedArrayOfKeys);
  });
});

// Mocks the environment to ensure values are expected
describe('Test dummy environment with a jest mock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  test('should expect dummy mock stuff', () => {
    expect(Object.keys(mockedEnv.getVariables())).toEqual(expectedArrayOfKeys);
  });
  test('should expect the values of mocked env to be as expected', () => {
    const list = mockedEnv.getVariables();
    const expectedList = getVariablesMock();
    Object.values(expectedArrayOfKeys).forEach((value) => {
      expect(expectedList[`${value}`]).not.toEqual(undefined);
      expect(list[`${value}`]).toEqual(expectedList[`${value}`]);
    });
  });
});
