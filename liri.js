require('dotenv').config();
const request = require('request');
const fs = require('fs');
const keys = require('./keys.js');
var Spotify = require('node-spotify-api');
const command = process.argv[2];



const spotify = new Spotify(keys.spotify);

function spotifyMusic(song) {
  spotify
    .search({ type: 'track', query: song })
    .then(function (response) {

      console.log("Song name : " + response.tracks.items[0].name);
      console.log("preview url: " + response.tracks.items[0].preview_url);
      console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
      console.log("Album: " + response.tracks.items[0].album.name);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Function for concerts
function getConcert(artistName) {
  // Runs a request to the OMDB API with the movie specified
  var queryUrl = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=codingbootcamp`;

  // Helps debugging
  console.log(queryUrl);

  //Callback to Bands in town API to get concert info
  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      var bandObject = JSON.parse(body);

      // Show the text in the terminal
      var bandResults =
        "------------------------------ begin ------------------------------" + "\r\n" +
        "Name of the Venue: " + bandObject[0].venue.name + "\r\n" +
        "Venue location: " + bandObject[0].venue.city + "," + bandObject[0].venue.country + "\r\n" +
        "------------------------------ end ------------------------------" + "\r\n";
      console.log(bandResults);

    }
    else {
      console.log("Error :" + error);
      return;
    }
  });
}

//Function for movies
function getMovie(movieName) {
    //If no movie name is provided, use Mr.Nobody as default
  if (!movieName) {
    movieName = "mr nobody";
  }

  // Runs a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";

  // Helps debugging
  console.log(queryUrl);

  //Callback to OMDB API to get movie info
  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      var movieObject = JSON.parse(body);

      //console.log(movieObject); // Show the text in the terminal
      var movieResults =
        "------------------------------ begin ------------------------------" + "\r\n" +
        "Title: " + movieObject.Title + "\r\n" +
        "Year: " + movieObject.Year + "\r\n" +
        "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
        "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
        "Country: " + movieObject.Country + "\r\n" +
        "Language: " + movieObject.Language + "\r\n" +
        "Plot: " + movieObject.Plot + "\r\n" +
        "Actors: " + movieObject.Actors + "\r\n" +
        "------------------------------ end ------------------------------" + "\r\n";
      console.log(movieResults);

    }
    else {
      console.log("Error :" + error);
      return;
    }
  });
}

if (command == "spotify-this-song") {
  var arg = process.argv.splice(3, process.argv.length).join(" ");
  spotifyMusic(arg);
} else if (command == "concert-this") {
  var arg = process.argv.splice(3, process.argv.length).join(" ");
  getConcert(arg);
} else if (command == "movie-this") {
  var arg = process.argv.splice(3, process.argv.length).join(" ");
  getMovie(arg);
} else if (command == "do-what-it-says") {
  //Reads text in random.txt file
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    //creates a variable for data in random.txt
    var randomData = data.split(",");
    console.log(randomData);
    var arg = randomData[1];

    if (randomData[0] == "spotify-this-song") {
      spotifyMusic(arg);
    } else if (randomData[0] == "concert-this") {
      getConcert(arg);
    } else if (randomData[0] == "movie-this") {
      getMovie(arg);
    } else {
      console.log('Invalid command!');
    }
  });
} else {
  console.log('Invalid command!');
}