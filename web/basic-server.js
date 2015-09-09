var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var messages = require('./request-handler');
var url = require("url");
var utils = require('./utils');
// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var router = {
  '/': messages.requestHandler
  // ...
};

var port = 3001;
var ip = "127.0.0.1";

var server = http.createServer( function(req, res){
  console.log("Serving request type " + req.method + " for url " + req.url);
  messages.requestHandler(req, res);
  var route = router[url.parse(req.url).pathname];
  // if (route) {
  //   route(req, res);
  // } else {
  //   utils.sendResponse(res, '', 404);
  // }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}