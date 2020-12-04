#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const commander = require('commander');
const { cloneDeep } = require('lodash');
const chalk = require('chalk');
const packageJson = require('../../../package.json');

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
  const rootDir = path.resolve(baseDir, 'applicationModules');

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
  const baseProjectPath = path.resolve(__dirname, '../../../');
  const srcFiles = path.resolve(baseProjectPath, 'applicationModules/example');
  await shCommand(`cp -r "${srcFiles}" "${rootDir}"`).then(() => {
    console.log(
      `Created city framework version ${chalk.green(`${packageJson.version}`)} successfully in ${chalk.green(`${rootDir}`)}`,
    );
  }).catch((err) => {
    console.log(err);
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
  const citySelfJson = require('../../../config/self/self.json');
  // eslint-disable-next-line global-require
  // const cityModulesConfig = require('./config/modules.json');

  // Update the self.json file with the module installation
  selfJson.install.push(citySelfJson.install[0]);
  selfJson.modules.example = citySelfJson.modules.example;

  // Take value from the modules folder
  // const port = 5000;
  // const server = '127.0.0.1';
  // const protocol = 'http';

  // Take the value from the modules folder of this service
  // const modulesExampleObject = cloneDeep(cityModulesConfig);
  // modulesExampleObject.modules.example.port = port;
  // modulesExampleObject.modules.example.server = server;
  // modulesExampleObject.modules.example.protocol = protocol;

  // Update the self/self.json of the city blueprint
  // selfJson.modules.example = modulesExampleObject.modules.example;

  await fs.writeFileSync(`${baseDir}/config/self/self.json`, `${JSON.stringify(selfJson, null, 2)}\n`);
  // Update the modules folder of the city blueprint with dependency modules

  // TODO: Take all the test files for the module and include these

  // TODO: Remember the package json and dependencies
  // If the package json exists then we go ahead and run the dependencies

  let projectPackageJson;
  try{
    projectPackageJson = require(`${baseDir}/package.json`);
  } catch (e) {
    console.log('Package json does not exist');
  }
  // check that dependencies key exists
  if((projectPackageJson['dependencies'] === null || projectPackageJson['dependencies'] === undefined)){
    if(packageJson['dependencies'] === null || packageJson['dependencies'] === undefined){
      // then we just set an empty object
      projectPackageJson['dependencies'] = {};
    } else {
      projectPackageJson['dependencies'] = cloneDeep(packageJson.dependencies);
    }
  }else{
    if(packageJson['dependencies'] === null || packageJson['dependencies'] === undefined){
      // then we just take the project package json - do nothing
    } else {
      // Which values do we take?
      // const projectPackageDependencies = Object.keys(projectPackageJson['dependencies']);
      const packageJsonDependencies = Object.keys(packageJson.dependencies);
      // for each of the packageJsonDependencies
      // if already exists in the project AND the versions are different => flag an error
      // if already exists in the project and the version are the same => already well defined
      // else => append to the end of the project json
      packageJsonDependencies.forEach((item) => {
        if(
          projectPackageJson.dependencies[item] !== null
          && projectPackageJson.dependencies[item] !== undefined
          && projectPackageJson.dependencies[item] !== packageJson.dependencies[item]
        ){
          console.log(
            `Versioning Problem: ${item} ${packageJson.dependencies[item]} does not match current project dependency version ${item} ${projectPackageJson.dependencies[item]}`
          );
        } else if (
          projectPackageJson.dependencies[item] !== null
          && projectPackageJson.dependencies[item] !== undefined
          && projectPackageJson.dependencies[item] === packageJson.dependencies[item]
        ){
          console.log(`${item} already exists with the correct version - ${packageJson.dependencies[item]}`);
        } else {
          console.log('Package json needs updating');
          projectPackageJson.dependencies[item] = packageJson.dependencies[item];
        }
      });
    }
  }

  if((projectPackageJson['devDependencies'] === null || projectPackageJson['devDependencies'] === undefined)){
    if(packageJson['devDependencies'] === null || packageJson['devDependencies'] === undefined){
      // then we just set an empty object
      projectPackageJson['devDependencies'] = {};
    } else {
      projectPackageJson['devDependencies'] = cloneDeep(packageJson.devDependencies);
    }
  }else{
    if(packageJson['devDependencies'] === null || packageJson['devDependencies'] === undefined){
      // then we just take the project package json - do nothing
    } else {
      const packageJsonDevDependencies = Object.keys(packageJson.devDependencies);
      packageJsonDevDependencies.forEach((item) => {
        if(
          projectPackageJson.devDependencies[item] !== null
          && projectPackageJson.devDependencies[item] !== undefined
          && projectPackageJson.devDependencies[item] !== packageJson.devDependencies[item]
        ){
          console.log(
            `Versioning Problem: ${item} ${packageJson.devDependencies[item]} does not match current project dependency version ${item} ${projectPackageJson.devDependencies[item]}`
          );
        } else if (
          projectPackageJson.devDependencies[item] !== null
          && projectPackageJson.devDependencies[item] !== undefined
          && projectPackageJson.devDependencies[item] === packageJson.devDependencies[item]
        ){
          console.log(`${item} already exists with the correct version - ${packageJson.devDependencies[item]}`);
        } else {
          console.log('Package json needs updating');
          projectPackageJson.devDependencies[item] = packageJson.devDependencies[item];
        }
      });
    }
  }

  // Flush the package.json to file
  await fs.writeFileSync(`${rootDir}/package.json`, JSON.stringify(projectPackageJson, null, 2));

  // NPM install all dependencies required for this project
  await shCommand(`cd "${rootDir}" && npm install`).then(() => {
    // successfully installed the project
    console.log('Finished install of all dependencies');
  }).catch((err) => {
    // failed to create a default package json file
    console.log(err);

    // failed to install the project - problems
    console.error('Failed to run NPM install - check versioning in package.json')

    // Don't continue if the package.json doesn't exist
    process.exit(1);
  });

  // TODO: Remember to install using npm install
})();
// TODO: Console output for the .env file updates
