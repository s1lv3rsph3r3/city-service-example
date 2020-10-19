const dotEnv = require('dotenv');

dotEnv.config();

module.exports = (function start() {
  const variables = {
    // Server settings
    appPort: process.env.APP_PORT,
    appUrl: process.env.APP_URL,
  };
  const getVariables = () => variables;
  return {
    getVariables,
  };
}());
