#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const commander = require('commander');
const { cloneDeep } = require('lodash');
const chalk = require('chalk');
const packageJson = require('./package.json');

function shCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        console.log(stdout, stderr);
        resolve({});
      }
    });
  });
}

(async () => {
  const currentNodeVersion = process.versions.node;
  const scriptName = 'Create City Blueprint';
  const semver = currentNodeVersion.split('.');
  const major = semver[0];

  if (major < 12) {
    console.error(
      `You are running Node ${currentNodeVersion}.\n`
      + `${scriptName} requires Node 12 or higher. \n`
      + 'Please update your version of Node.',
    );
    process.exit(1);
  }

  let projectName = '';
  new commander.Command(packageJson.name)
    .version(packageJson.version)
    .usage('')
    .on('--help', () => {
      console.log();
      console.log(
        `No arguments are required.`,
      );
      console.log();
    })
    .parse(process.argv);

  const baseDir = path.resolve();
  const rootDir = path.resolve('applicationModules');

  await shCommand(`mkdir "${rootDir}"`).then(() => {
    console.log(
      `Created ${chalk.green(`${rootDir}`)} without error.`,
    );
  }).catch(() => {
    console.error(
      `${chalk.bgRed('ERR')}: while attempting to make module directory.`,
    );
    process.exit(1);
  });
  const srcFiles = path.resolve(__dirname, 'applicationModules/example');
  await shCommand(`cp -r "${srcFiles}" "${rootDir}"`).then(() => {
    console.log(
      `Created city framework version ${chalk.green(`${packageJson.version}`)} successfully in ${chalk.green(`${rootDir}`)}`,
    );
  }).catch((err) => {
    console.error(
      `${chalk.bgRed('ERR')}: while attempting to setup the service.`,
    );
    process.exit(1);
  });

  console.log(
    `Created city service example version ${chalk.green(`${packageJson.version}`)} successfully in ${chalk.green(`${rootDir}`)}`,
  );

  // eslint-disable-next-line import/no-dynamic-require
  const selfJson = require(`${baseDir}/config/self/self.json`);
  // eslint-disable-next-line global-require
  // const modulesConfig = require(`${baseDir}/config/modules.json`);

  // eslint-disable-next-line global-require
  const citySelfJson = require('./config/self/self.json');
  // eslint-disable-next-line global-require
  const cityModulesConfig = require('./config/modules.json');

  // Update the self.json file with the module installation
  selfJson.install.push(citySelfJson.install[0]);

  // Take value from the modules folder
  const port = 5000;
  const server = '127.0.0.1';
  const protocol = 'http';

  // Take the value from the modules folder of this service
  const modulesExampleObject = cloneDeep(cityModulesConfig);
  modulesExampleObject.modules.example.port = port;
  modulesExampleObject.modules.example.server = server;
  modulesExampleObject.modules.example.protocol = protocol;

  // Update the self/self.json of the city blueprint
  selfJson.modules.example = modulesExampleObject.modules.example;

  await fs.writeFileSync(`${baseDir}/config/self/self.json`, JSON.stringify(selfJson, null, 2));
  // Update the modules folder of the city blueprint with dependency modules
})();

// TODO: Update the modules.json file with an object for the 'example' module
// TODO: Console output for the .env file updates
// TODO: Update the
