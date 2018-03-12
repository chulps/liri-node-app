require("dotenv").config();
var fs = require("fs"); //reads and writes files
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
//var spotify = require ("spotify");
var job = process.argv[2];


// Possible commands for this liri app
switch(job) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;
    // Instructions displayed in terminal to the user
    default: console.log("\r\n" +"Type 'node liri.js' then type one of the following commands: " +"\r\n"+
        "1. my-tweets 'any twitter name' " +"\r\n"+
        "2. spotify-this-song 'any song name' "+"\r\n"+
        "3. movie-this 'any movie name' "+"\r\n"+
        "4. do-what-it-says."+"\r\n"+
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};

function myTweets() {
    var client = new Twitter(keys.twitter);
    console.log("client = " + client);
    var twitterUsername = process.argv[3];
    if(!twitterUsername){
        twitterUsername = "b33fN00dleSoup";
    }
    params = {screen_name: twitterUsername};
    client.get("statuses/user_timeline/", params, function(error, data, response){
        if (!error) {
            for(var i = 0; i < data.length; i++) {
                //console.log(response); // Show the full response in the terminal
                var twitterResults = 
                "@" + data[i].user.screen_name + ": " + 
                data[i].text + "\r\n" + 
                data[i].created_at + "\r\n" + 
                "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults); // calling log function
            }
        }  else {
            console.log("Error :"+ error);
            return;
        }
    });
}
