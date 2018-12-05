var Spotify = require('node-spotify-api');
const command = process.argv[2];



var spotify = new Spotify({
    id: "46e1627783324b74a54bf12092dba700" ,
    secret: "3ca085fd2a464fd9bb92061a65f43dd0"
  });




if(command =="spotify-this"){
   var song = process.argv.splice(3, process.argv.length).join(" ");
    spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      
      console.log("Song name : " + response.tracks.items[0].name);
      console.log("preview url: " + response.tracks.items[0].preview_url);
      console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
      console.log("Album: " + response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      console.log(err);
    });

}else if(command == "band-this"){
    console.log("This is bands")
}