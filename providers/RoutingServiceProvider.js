const app = require('../app');
const EndpointUtility = require('../utility/EndpointUtility');

class RoutingServiceProvider{
  static addRouter(routerNamespace, router){
    app.use(routerNamespace, router);
    EndpointUtility.printEndpoints();
  }
}

module.exports = RoutingServiceProvider;
