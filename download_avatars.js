var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${secrets.GITHUB_TOKEN}`
      }
    };
  
    request(options, function(err, res, body) {
      
      
        cb(err, JSON.parse(body));
        
      
    });
  }

  var owner = process.argv[2]
  var repo = process.argv[3]


getRepoContributors(owner, repo, function(err, result) {
    if(owner && repo) {
        console.log("Errors:", err);
        for (var user of result) {
            var avatarUrl = user.avatar_url
            var userLogin = './avatars/' + user.login + '.jpg'
            downloadImageByURL(avatarUrl, userLogin)
        } 
    } else {
        console.log("Please enter valid information");
    }

    
    
  });

  function downloadImageByURL(url, filePath) {
    request.get(url) 
    .on('error', function (err) {                                   
             throw err; 
               })
    
    .pipe(fs.createWriteStream(filePath));  
    
}

// 

// request.get('https://sytantris.github.io/http-examples/future.jpg')               
//        .on('error', function (err) {                                   
//          throw err; 
//        })
//        .on('response', function (response) {                           
//          console.log('Response Status Code: ', response.statusCode);
//          console.log(response.statusMessage);
//          console.log(response.headers['content-type']);
//        })
//        .on('end', function() {
//          console.log('Download Complete');
//        })
//        .pipe(fs.createWriteStream('./future.jpg'));  
//        console.log('Downloading image...');
       



  