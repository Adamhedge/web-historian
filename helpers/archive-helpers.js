var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');
var utils = require('../web/utils');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  loadingPage: path.join(path.join(__dirname, '../web/public'), '/loading.html'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  testlist: '../test/testdata/sites.txt',
  testArchive: '../test/testData/sites'
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(paths.list, function(err, data){
      if(!err){
        //we were able to read the sites file.
        urls = data.toString().split("\n");
        urls.pop();
        if(callback){
          callback(urls);
        }
        return urls;
      } else{
        console.log(err);
      }
  });

};

exports.isUrlInList = function(myURL, callback) {
  fs.readFile(paths.list, function(err, data){
      if(!err){
        var URLs= data.toString().split("\n");
        for(var i = 0; i < URLs.length; i ++){
          if(URLs[i] === myURL){
            callback(true);
          }
        }
        callback(false);
      } else{
        console.log(err);
      }
  });
};

exports.addUrlToList = function(archURL, response) {
  getWebsiteTool(archURL);
  fs.readFile(paths.list, function(err, data){
    URLs = data.toString();
    //console.log("Total write: "+ URLs + archURL);
    fs.writeFile(paths.list, URLs + archURL + "\n", function(err){
      if(err){
        console.log("There was an error: " + err);
      } else {
        console.log("File write success");
        if(typeof response === 'function'){
          console.log("AddURL callback.");
          response();
        } else {
          utils.sendResponse(response, '', 302);
        }
      }
    });
  });
};

exports.isUrlArchived = function(myURL, callback) {
  fs.readdir(paths.archivedSites, function(err, data){
      var isArch = false;
      if(!err){
        for(var i = 0; i < data.length; i ++){
          if(data[i] === myURL){
            isArch = true;
          }
        }
        console.log("isURL callback");
        callback(isArch, myURL);
      } else{
        console.log(err);
      }
  });
};

var getWebsiteTool = function(url){
  http.get({url: url}, paths.archivedSites + "/" + url, function(err){
    if (!err){
    console.log("Success!");
  } else {
    console.log(err);
  }
  });
  return '';
  //result
};
// var getWebsite = function(url){
//   fs.writeFile(paths.archivedSites + "/" + url, getWebsiteTool(url), function(err){
//     if(!err){
//       console.log("scraped another website!");
//     }
//   });
// };

exports.downloadUrls = function(array, callback) {
  var myURLs = [];
  if (typeof array === 'function'){
    callback = array;
  } else if (Array.isArray(array)){
    myURLs = array;
  }
  console.log(myURLs);
  if(myURLs.length == 0){
    fs.readFile(paths.list, function(err, data){
      if(!err){
        var URLs= data.toString().split("\n");
        console.log(URLs);
        for(var i = 0; i < URLs.length; i ++){
          exports.isUrlArchived(URLs[i], function(value, myUrl){
            console.log("Value is: " + value);
            if (!value && myUrl != "\n"){
              console.log("Archiving site.");
              getWebsiteTool(myUrl);
            }
          });
        }
        fs.writeFile(paths.list, "\n", function(err){
          if(!err){
            console.log("Cleared pending sites list.");
          } else {
            console.log("Error: " + err);
          }
        });
        callback(false);
      } else{
        console.log(err);
      }
    });
  } else {
    for(var i = 0; i < myURLs.length; i ++){
      exports.isUrlArchived(myURLs[i], function(value, cbURL){
        console.log("Value is: " + value + " " + cbURL);
        if (!value){
          console.log("Archiving site.");
          getWebsite(cbURL);
        }
      });
    }
  }
};
