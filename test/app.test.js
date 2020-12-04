// Mock functions in express
const useSpy = jest.fn();
const listenSpy = jest.fn();
jest.doMock('express', () => () => ({
  use: useSpy,
  listen: listenSpy,
}));
const getVariablesMock = () => ({
  // Server settings
  appPort: '3000',
  appUrl: 'production',
});
jest.doMock('../environment', () => ({
  getVariables: getVariablesMock,
}));
const bodyParser = require('body-parser');
const app = require('../utility/ApplicationUtility');
const expressApp = require('../app');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: true,
});

// describe('Test the params in ApplicationUtility.js...', () => {
//   test('should expect params to exist as a type of object', () => {
//     expect(typeof params).toEqual('object');
//   });
//   test('should expect params to be of size 1', () => {
//     expect(Object.keys(params).length).toEqual(1);
//   });
//   test('should expect params keys to include only getUrlEncodedOptions', () => {
//     const expected = ['getUrlEncodedOptions'];
//     const keys = Object.keys(params);
//     expect(keys).toEqual(expected);
//   });
// });

// describe('Test the callbacks in ApplicationUtility.js...', () => {
//   test('should expect callbacks to exist as a type of object', () => {
//     expect(typeof callbacks).toEqual('object');
//   });
//   test('should expect callbacks to be of size 0', () => {
//     expect(Object.keys(callbacks).length).toEqual(0);
//   });
//   test('should expect callbacks keys to include only []', () => {
//     const expected = [];
//     const keys = Object.keys(callbacks);
//     expect(keys).toEqual(expected);
//   });
// });

// Basic ApplicationUtility.js tests for object integrity
// describe('ApplicationUtility.js', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.resetModules();
//   });
// });

// startApplication function tests
describe('ApplicationUtility.js => startApplication()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  test('should expect an error if arguments are not defined or null', () => {
    // No arguments
    expect(() => { app.startApplication(); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Single argument
    expect(() => { app.startApplication(null); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Both null
    expect(() => { app.startApplication(null, null); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Both undefined
    expect(() => { app.startApplication(undefined, undefined); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Mix null/undefined
    expect(() => { app.startApplication(null, undefined); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Mix undefined/null
    expect(() => { app.startApplication(undefined, null); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Mix valid/null
    expect(() => { app.startApplication(jsonParser, null); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Mix valid/undefined
    expect(() => { app.startApplication(jsonParser, undefined); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Mix null/valid
    expect(() => { app.startApplication(null, urlencodedParser); })
      .toThrowError('Missing middleware arguments for startApplication');
    // Mix undefined/valid
    expect(() => { app.startApplication(undefined, urlencodedParser); })
      .toThrowError('Missing middleware arguments for startApplication');
  });
  test('should expect the app.use to have been called 2 times', () => {
    app.startApplication(expressApp, jsonParser, urlencodedParser);
    expect(useSpy).toHaveBeenCalledTimes(2);
  });
  test('should expect the app.use to have been called with args', () => {
    app.startApplication(expressApp, jsonParser, urlencodedParser);
    expect(useSpy).toHaveBeenNthCalledWith(1, jsonParser);
    expect(useSpy).toHaveBeenNthCalledWith(2, urlencodedParser);
  });
});

// startRoutingModules function test
describe('ApplicationUtility.js => startRoutingModules()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  test('should expect an error if arguments are not defined or null', () => {
    expect(() => { app.startWebRouting(); })
      .toThrowError('Express application is not defined');
  });
});
