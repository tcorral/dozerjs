var fs = require('fs');
var stdout = require('./stdout.js');
var modules = require('./modules');

// Manages the API endpoints
var api = {

  // Processes call to endpoints
  process: function (req, res) {
    var endpoint = req.params.endpoint;
    var reqMethod = req.method;
    var supportedMethods = [];
    var method;
    // Ensures endpoint exists
    if (modules.api.endpoints.hasOwnProperty(endpoint)) {
      // Build array of supported methods
      for (method in modules.api.endpoints[endpoint]) {
        supportedMethods.push(method.toUpperCase());
      }
      // Ensure endpoint supports method
      if(supportedMethods.indexOf(reqMethod) >= 0) {
        res.send("Connected via " + reqMethod);
      } else {
        // Send allowed methods in header
        res.header("Access-Control-Allow-Methods", supportedMethods.join());
        // Send 405 - Method not allowed
        res.send(405, { "status": "error", "message": "Method not allowed" });
      }
    } else {
      // Endpoint not found
      res.send(404, { "status": "error", "message": "Endpoint does not exist" });
    }
  }

};

module.exports = api;