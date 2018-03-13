require("dotenv").config();
var fs = require("fs"); 
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var job = process.argv[2];
var spotify = require('node-spotify-api');
var omdb = require("omdb");




// INSTRUCTIONS
switch(job) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;
    default: console.log("\r\n" +"Type 'node liri.js' then type one of the following commands: " +"\r\n"+
        "1. my-tweets 'any twitter twitter handle' " +"\r\n"+
        "2. spotify-this-song 'any song name' "+"\r\n"+
        "3. movie-this 'any movie name' "+"\r\n"+
        "4. do-what-it-says."+"\r\n"+
        "Be sure to put the movie, song name, or twitter handle in quotation marks.");
};

// Twitter
function myTweets() {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: process.argv[3],
        count: 20
    };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                output = ("\n" + "--------- @" + params.screen_name + " tweeted: " + tweets[i].text + " at time: " + tweets[i].created_at + " --------\n");
                console.log(output);
            }
        } else {
            console.log("Something was wrong with that user handle. Try this one 'b33fNoodleSoup");
        }
    });
};

// OMDB Movie
function movieThis() {

    var movieArgs = process.argv;
    var movieName = "";

    for (var i = 3; i < movieArgs.length; i++) {
        if (i > 3 && i < movieArgs.length) {
            movieName = movieName + "+" + movieArgs[i];
        } else {
            movieName += movieArgs[i];
        }
    }

    if (movieArgs.length === 3) {
        movieName = "Jumanji";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(" ");
            console.log(":::::::::::::::::::::   " + JSON.parse(body).Title + "   ::::::::::::::::::::");
            console.log(" ");
            console.log("• Released:                " + JSON.parse(body).Year);
            console.log("• IMDB Rating:             " + JSON.parse(body).imdbRating);
            console.log("• Rotten Tomatoes Rating:  " + JSON.parse(body).Ratings[1].Value);
            console.log("• Filmed in:               " + JSON.parse(body).Country);
            console.log("• Language:                " + JSON.parse(body).Language);
            console.log("• Plot:                    " + JSON.parse(body).Plot);
            console.log("• Actors in Movie:         " + JSON.parse(body).Actors);
            console.log(" ");
        }
    });
};


	// Do What It Says function, uses the reads and writes module to access the random.txt file and do what's written in it
	function doWhatItSays() {
		fs.readFile("./random.txt", "utf8", function(error, data){
			if (!error) {
				doWhatItSaysResults = data.split(",");
				movieThis(doWhatItSaysResults[0], doWhatItSaysResults[1]);
            } 
            
            else {
				console.log("Error occurred" + error);
			}
		});
	};

 
