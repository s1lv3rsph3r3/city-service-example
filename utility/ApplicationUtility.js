const { applicationUtils } = require('@s1lv3rsph3r3/metropolitan');

class ApplicationUtility {
  static startApplication(expressApp, jsonParser, urlencodedParser) {
    if (jsonParser === undefined
      || jsonParser === null
      || urlencodedParser === undefined
      || urlencodedParser === null) {
      throw (new Error('Missing middleware arguments for startApplication'));
    }
    // Let the expressApp use specified middleware
    expressApp.use(jsonParser);
    expressApp.use(urlencodedParser);
  }

  static startWebRouting(expressApp) {
    if (expressApp === null || expressApp === undefined) {
      throw (new Error('Express application is not defined'));
    }
    // Boot the routing modules defined in the config
    applicationUtils.bootWebRoutes(expressApp);
  }

  static startApiRouting(expressApp) {
    if (expressApp === null || expressApp === undefined) {
      throw (new Error('Express application is not defined'));
    }
    applicationUtils.bootApiRoutes(expressApp);
  }

  static startEventRouting(subscriber) {
    if (subscriber === null || subscriber === undefined) {
      throw (new Error('Subscriber is not defined'));
    }
    applicationUtils.bootModuleEvents(subscriber);
  }

  static moduleSpecificBootloader() {
    /**
     * Any process that must be started for specific modules to load
     * correctly should be dispatched from this point in the application
     */
    applicationUtils.bootModulePreReq();
  }
}

module.exports = ApplicationUtility;
