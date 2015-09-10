// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');

archive.downloadUrls(function(){
  console.log("htmlFetcher has archived pending files.");
});