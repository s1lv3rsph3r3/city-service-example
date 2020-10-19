/* Used to list the routingProviders of the application in a console friendly output */
const listEndpoints = require('express-list-endpoints');
const Table = require('cli-table3');
const colors = require('colors');
const expressApp = require('../app');

class EndpointUtility {
  static printEndpoints() {
    const endpoints = listEndpoints(expressApp);
    const partialHeader = ['URL'];
    // First loop for unique table head
    const set = new Set();
    for (let index = 0; index < endpoints.length; index += 1) {
      // merge into unique array from endpoints[index].methods
      (endpoints[index].methods).reduce((s, e) => s.add(e), set);
    }
    const header = [...partialHeader, ...[...set]];
    const table = new Table({ head: header });
    for (let index = 0; index < endpoints.length; index += 1) {
      const arr = [];
      (endpoints[index].methods).forEach((e) => {
        if (header.indexOf(e) !== -1) {
          arr.push(header.indexOf(e));
        }
      });
      const row = [];
      row.push((endpoints[index].path).replace(/\\/g, ''));
      for (let i = 1; i < header.length; i += 1) {
        if (arr.includes(i)) {
          // set to green yes
          row[i] = { content: colors.green('Y'), hAlign: 'center' };
        } else {
          // set to null
          row[i] = { content: colors.red('X'), hAlign: 'center' };
        }
      }
      table.push(row);
    }
    // Print the table
    console.log(table.toString());
  }
}

module.exports = EndpointUtility;
