// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('/Users/AdamandMaggie/Documents/Projects/Hack-Reactor/2015-08-web-historian/helpers/archive-helpers.js');
var fs = require('fs');

archive.downloadUrls(function(){
  fs.appendFile("/Users/AdamandMaggie/Documents/Projects/Hack-Reactor/2015-08-web-historian/crontab/log.txt",
    "Files have been written.", function(){}
  );
  console.log("htmlFetcher has archived pending files.");
});

// fs.writeFile(paths.list, "\n", function(err){
//           if(!err){
//             console.log("Cleared pending sites list.");
//           } else {
//             console.log("Error: " + err);
//           }
//         });
//*/30 * * * * /usr/local/bin/node /Users/AdamandMaggie/Documents/Projects/Hack-Reactor/2015-08-web-historian/workers/htmlfetcher.js


//*/1 * * * * /usr/local/bin/node /Users/AdamandMaggie/Documents/Projects/Hack-Reactor/2015-08-web-historian/workers/htmlfetcher.js