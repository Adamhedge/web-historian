var path = require('path');
var utils = require('./utils');
var archive = require('../helpers/archive-helpers');
var fs = require("fs");
var mime = require('mime');
var url = require('url');
// require more modules/folders here!

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var serveFile = function(){
  var fileName;
    if(subURL === '/'){
      fileName = path.join(__dirname, './public/index.html');
    } else {
      fileName = path.join(__dirname, './pulic/' + subURL);
    }
    fs.readFile(fileName, function(err, data){
      if(!err){
        headers['Content-Type'] = mime.lookup(fileName);
        response.writeHead(200, headers);
        response.end(data.toString());
      } else{
        console.log(err);
      }
    });
};

var actions = {
  'GET': function(request, response) {
    var subURL = request.url.split('?')[0];
    var fileName;
    //console.log(subURL);
    if(subURL === '/'){
      fileName = path.join(__dirname, './public/index.html');
    } else {
      fileName = path.join(__dirname, './public/' + subURL);
    }
    fs.readFile(fileName, function(err, data){
      if(!err){
        headers['Content-Type'] = mime.lookup(fileName);
        response.writeHead(200, headers);
        response.end(data.toString());
      } else{
        console.log(subURL)
      }
    });
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      message.objectId = ++objectIdCounter;
      messages.push(message);
      utils.sendResponse(response, {objectId: message.objectId}, 201);
    });
  },
  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);
  }
};

exports.requestHandler = utils.makeActionHandler(actions);

// headers['Content-Type'] = mime.lookup(fileName);
//         response.writeHead(200, headers);
//         response.end(data.toString());