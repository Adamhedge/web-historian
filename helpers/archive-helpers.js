var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
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

exports.readListOfUrls = function() {
  //console.log(exports.isUrlInList("example1.com"));
  fs.readFile(paths.list, function(err, data){
      if(!err){
        //we were able to read the sites file.
        console.log(data.toString().split("\n"));
      } else{
        console.log(err);
        // fetchWebsite(subURL.substring(1));
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

exports.addUrlToList = function() {
};

exports.isUrlArchived = function(myURL, callback) {
  fs.readdir(paths.archivedSites, function(err, data){
      if(!err){
        //console.log(data);
        for(var i = 0; i < data.length; i ++){
          if(data[i] === myURL){
            callback(true);
          }
        }
        callback(false);
      } else{
        console.log(err);
      }
  });
};

exports.downloadUrls = function() {
};
