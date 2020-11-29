#!/usr/bin/env node
const shell = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const commander = require('commander');
const { cloneDeep } = require('lodash');
const chalk = require('chalk');
const packageJson = require('./package.json');

(async () => {
  const src = './applicationModules';

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
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')}`)
    .action((name) => {
      projectName = name;
    })
    .on('--help', () => {
      console.log();
      console.log(
        `Only ${chalk.green('<project-directory>')} is required.`,
      );
      console.log();
    })
    .parse(process.argv);
  const baseDir = path.resolve();
  const rootDir = path.resolve(`applicationModulesCopy/${projectName}`);

  try {
    shell(`cp -r ${src}/* "${rootDir}"`);
  } catch (e) {
    console.error(
      `${chalk.bgRed('ERR')}: while attempting to setup framework.`,
    );
    process.exit(1);
  }
  console.log(
    `Created city service example version ${chalk.green(`${packageJson.version}`)} successfully in ${chalk.green(`${rootDir}`)}`,
  );

  // eslint-disable-next-line import/no-dynamic-require
  const selfJson = require(`${baseDir}/config/self/self.json`);
  // eslint-disable-next-line global-require
  const modulesConfig = require(`${baseDir}/config/modules.json`);

  // eslint-disable-next-line global-require
  const citySelfJson = require('./config/self/self.json');
  // eslint-disable-next-line global-require
  const cityModulesConfig = require('./config/modules.json');

  // console.log(modulesConfig, cityModulesConfig);

  // console.log(selfJson, citySelfJson);

  // console.log(citySelfJson.install[0]);

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

  await fs.writeFileSync(`${baseDir}/config/self/self.json`, JSON.stringify(selfJson));
  // Update the modules folder of the city blueprint with dependency modules
})();

// TODO: Update the modules.json file with an object for the 'example' module
// TODO: Console output for the .env file updates
