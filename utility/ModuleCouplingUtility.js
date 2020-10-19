
class ModuleCouplingUtility {
  // TODO: Return a promise and try to connect to the other microservices
  static async communicate() {
    // TODO: Required params: module/microservice
    // TODO: Required params: url
    // TODO: Required params: headers
    // TODO: Required params: payload
    console.log('Attempt to communicate with microservice');
  }
}

module.exports = ModuleCouplingUtility;

// EXAMPLE: Axios request to another microservice
// const axios = require('axios');
// await axios({
//   method: 'post',
//   url: 'https://127.0.0.1:8000/pdfGenerator/pdf-example',
//   data: {
//     key: 'value',
//   },
// }).then((d) => {
//   console.log(d);
// }).catch((err) => {
//   console.log(err);
// });

