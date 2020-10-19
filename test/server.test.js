// const getVariablesMock = () => ({
//   // Server settings
//   appPort: '3000',
//   appEnv: 'local',
//
//   // SSL credentials
//   sslKey: './test/testingUtils/dummySsl/server.key',
//   sslCert: './test/testingUtils/dummySsl/server.crt',
//
//   // Database connection
//   dbHost: process.env.DB_HOST,
//   dbDatabase: process.env.DB_DATABASE,
//   dbUsername: process.env.DB_USERNAME,
//   dbPassword: process.env.DB_PASSWORD,
//
//   // Engine API connection credentials
//   engineAccessKey: process.env.ENGINE_ACCESS_KEY,
//   engineAccessSecret: process.env.ENGINE_ACCESS_SECRET,
// });
// jest.doMock('../environment', () => ({
//   getVariables: getVariablesMock,
// }));
const express = require('express');
const http = require('http');

const app = express();
const { server, params, callbacks } = require('../server');

describe('Test the server in server.js.... ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  test('expect server to exist as a type of object', () => {
    expect(typeof server).toEqual('object');
  });
  test('expect server keys to be of size 1', () => {
    expect(Object.keys(server).length).toEqual(1);
  });
  test('expect server keys to include only startServer', () => {
    const expected = ['startServer'];
    const keys = Object.keys(server);
    expect(keys).toEqual(expected);
  });
  test('expect startServer to return an instance of https.Server in prod', () => {
    const s = server.startServer(app);
    expect(s).toBeInstanceOf(http.Server);
  });
});

describe('Test the params in server.js...', () => {
  test('expect params to exist as a type of object', () => {
    expect(typeof params).toEqual('object');
  });
  test('expect server keys to be of size 0', () => {
    expect(Object.keys(params).length).toEqual(0);
  });
  test('expect server keys to exist as an empty array', () => {
    const expected = [];
    const keys = Object.keys(params);
    expect(keys).toEqual(expected);
  });
});

describe('Test the callbacks in server.js...', () => {
  test('expect callbacks to exist as a type of object', () => {
    expect(typeof callbacks).toEqual('object');
  });
  test('expect callbacks keys to be of size 0', () => {
    expect(Object.keys(callbacks).length).toEqual(0);
  });
  test('expect callbacks keys to exist as an empty array', () => {
    const expected = [];
    const keys = Object.keys(callbacks);
    expect(keys).toEqual(expected);
  });
});
