const fs = require('fs');
const path = require('path');

const absolutePathToBaseProject = path.resolve('..');
const routeConfig = require('../config/routes.json');
const applicationModulesConfig = require('../config/applicationModules.json');
const modulesConfig = require('../config/modules.json');
const middlewareConfig = require('../config/middlewares.json');

// config/applicationModules.json
describe('config/applicationModules.json', () => {
  test('should expect only the list of base keys', () => {
    const expectedBaseKeys = [
      'baseDir',
      'main',
    ];
    expect(Object.keys(applicationModulesConfig)).toEqual(expectedBaseKeys);
  });
  test('should expect baseDir to be a string', () => {
    expect(typeof applicationModulesConfig.baseDir).toEqual('string');
  });
});

// At present, the @s1lv3rsph3r3/metropolitan uses a preconfigured controllers.json
// assumption which means that the config/controllers.json in this project is considered
// obsolete until a further feature has been developed.
// config/controllers.json
describe('config/controllers.json', () => {
  test.skip('setup return false', () => {
    expect(true).toEqual(false);
  });
  // TODO: Write a test to check the format of controllers.json
});

// config/middleware.json
describe('config/middleware.json', () => {
  test('should expect only the list of base keys', () => {
    const expectedBaseKeys = [
      'app',
      'rootDir',
    ];
    expect(Object.keys(middlewareConfig)).toEqual(expectedBaseKeys);
  });
  test('should expect ./globalMiddlewareProvider as the middleware directory', () => {
    expect(middlewareConfig.rootDir).toEqual('./globalMiddlewareProviders');
  });
  test('should expect app value to be an object', () => {
    expect(typeof middlewareConfig.app).toEqual('object');
  });
  test('should expect each key in the app object to exist as a file', () => {
    Object.keys(middlewareConfig.app).forEach((key) => {
      expect(fs.existsSync(`${absolutePathToBaseProject}/globalMiddlewareProviders/${key}.js`))
        .toEqual(true);
    });
  });
  // TODO: Write a test check that the defined functions actually exist for the middleware
});

// config/modules.json
describe('config/modules.json', () => {
  test('should expect only the list of base keys', () => {
    const expectedBaseKeys = [
      'main',
      'modules',
    ];
    expect(Object.keys(modulesConfig)).toEqual(expectedBaseKeys);
  });
  test('should expect modules to contain the following list of keys', () => {
    const expectedBaseKeys = [
      'production',
    ];
    expect(Object.keys(modulesConfig.modules)).toEqual(expectedBaseKeys);
  });
  test('should expect the following modules to exist in production', () => {
    const expectedProductionModules = [
      'default',
    ];
    expect(Object.keys(modulesConfig.modules.production)).toEqual(expectedProductionModules);
  });
});

// config/routes.json
describe('config/routes.json', () => {
  test('should expect only the list of base keys', () => {
    const expectedBaseKeys = [
      'baseDir',
      'routes',
      'events',
      'api',
    ];
    expect(Object.keys(routeConfig)).toEqual(expectedBaseKeys);
  });
  test('should expect baseDir value to be a string', () => {
    expect(typeof routeConfig.baseDir).toEqual('string');
  });
  test('should expect routes value to be a string', () => {
    expect(typeof routeConfig.routes).toEqual('string');
  });
  test('should expect events value to be a string', () => {
    expect(typeof routeConfig.events).toEqual('string');
  });
  test('should expect api value to be an object', () => {
    expect(typeof routeConfig.api).toEqual('object');
  });
  test('should expect only the list of expected keys in api', () => {
    const expectedBaseKeys = [
      'filename',
      'prefix',
      'version',
    ];
    expect(Object.keys(routeConfig.api)).toEqual(expectedBaseKeys);
  });
  test('should expect api.filename to be a string', () => {
    expect(typeof routeConfig.api.filename).toEqual('string');
  });
  test('should expect api.prefix to be a string', () => {
    expect(typeof routeConfig.api.prefix).toEqual('string');
  });
  test('should expect api.version to be a string', () => {
    expect(typeof routeConfig.api.version).toEqual('number');
  });
});
