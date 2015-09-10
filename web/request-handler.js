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

//some major opportunities for modularity here.
var fetchWebsite = function(siteURL, request, response){
  //First, check to see if the site is archived.
  archive.isUrlArchived(siteURL, function(value){
    if(value === true){
      var fileName = archive.paths.archivedSites + "/" + siteURL;
      fs.readFile(fileName, function(err, data){
        if(!err){
          headers['Content-Type'] = "text/html";
          response.writeHead(200, headers);
          response.end(data.toString());
        } else{
          console.log(err);
        }
      });
    //The site isn't archived, so check to see if archiving is pending.  Would love to refactor but for this issues.
    }else {
      archive.isUrlInList(siteURL, function(value){
        if(value === true){
          var fileName = path.join(__dirname, './public/loading.html');
          fs.readFile(fileName, function(err, data){
            if(!err){
              headers['Content-Type'] = mime.lookup(fileName);
              response.writeHead(200, headers);
              response.end(data.toString());
            } else{
              console.log(err);
            }
          });
        } else {
          utils.sendResponse(response, '', 404);
        }
      });
    }
  });
};

var renderLoadingPage = function(request, response){
  fs.readFile(archive.paths.loadingPage, function(err, data){
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
        fetchWebsite(subURL.substring(1), request, response);
      }
    });
  },

  'POST': function(request, response) {
    var messageData = '';
    var URLs = '';
    var archURL = '';

    request.on('data', function(chunk) {
      messageData += chunk;
      archURL = messageData.substr(4);
      if(archURL === ""){
        //error out
      } else {
        archive.addUrlToList(archURL, response);
      }
    });

    //console.log(messageData.substr(4));
    //Check if the site is already in the archive
      //render it
    //Check if the site is on the list
      //render the list
    //Write the file to the queue
      //render the list

  },

  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);
  }
};

exports.requestHandler = utils.makeActionHandler(actions);
//archive.initalize();