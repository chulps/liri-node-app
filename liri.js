require("dotenv").config();
var fs = require("fs"); 
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var job = process.argv[2];
var Spotify = require('node-spotify-api');




// INSTRUCTIONS
switch(job) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;
    default: console.log("\r\n" +"Type 'node liri.js' then type one of the following commands: " +"\r\n"+
        "1. my-tweets 'any twitter name' " +"\r\n"+
        "2. spotify-this-song 'any song name' "+"\r\n"+
        "3. movie-this 'any movie name' "+"\r\n"+
        "4. do-what-it-says."+"\r\n"+
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};

// Twitter
function myTweets() {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: "b33fNoodleSoup",
        count: 20
    };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                output = ("\n" + "--------- @" + params.screen_name + " tweeted: " + tweets[i].text + " at time: " + tweets[i].created_at + " --------\n");
                console.log(output);
            }
        } else {
            console.log("Twitter Error!");
        }
    });
};

function spotifyThisSong(song) {
    var spotify = new Spotify(keys.spotify);
	var songName = process.argv[3];
		if(!songName){
			songName = "";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
						"------------------------------ " + i + " ------------------------------" + "\r\n";
						console.log(spotifyResults);
						log(spotifyResults); // calling log function
					}
				}
			}	else {
				console.log("-----------------Sorry, I can't find it... :"+ err);
				return;
			}
		});
};