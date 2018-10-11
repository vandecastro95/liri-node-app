require("dotenv").config();
let keys = require('./keys')
let request = require('request');
let moment = require('moment')
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

// SPOTIFY
function spotifyRequest(input) {
    spotify
        .search({ type: 'track', query: input.split(" ").join('%20') })
        .then(function (response) {
            console.log('\x1b[36m%s\x1b[7m', "________________________\n")
            let artist = response.tracks.items[0].artists[0].name;
            console.log('\x1b[36m%s\x1b[7m', "  Artists: " + artist)
            let songName = response.tracks.items[0].name;
            console.log('\x1b[36m%s\x1b[7m', "  Song name: " + songName)
            let albumName = response.tracks.items[0].album.name
            console.log('\x1b[36m%s\x1b[7m', "  Album: " + albumName)
            if (response.tracks.items[0].preview_url) {
                let previewUrl = response.tracks.items[0].preview_url;
                console.log('\x1b[36m%s\x1b[7m', "Preview Url: " + previewUrl);
            }

        })
        .catch(function (err) {
            console.log(err);
        });
}

// BANDS IN TOWN
function bandsintownRequest(input) {
    let artist = input.split(" ").join('%20');
    // console.log(artist)
    let bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(bandsUrl, function (error, response, body) {
        let events = JSON.parse(body);
        // console.log(body)
        if(!events.length) {
            console.log('\x1b[36m%s\x1b[7m', "No Concerts found!")
        }

        events.forEach(element => {
            console.log('\x1b[36m%s\x1b[7m', "________________________\n")
            console.log(element.venue.name)
            let location = element.venue.city + ", " + element.venue.region + ", " + element.venue.country
            console.log('\x1b[36m%s\x1b[7m', location)
            console.log('\x1b[36m%s\x1b[7m', moment(element.datetime).format("MM/DD/YYYY, h:mm:ss a"));
        });

        
    })
}

//OMDB
function omdbRequest(input) {
    let movie = input.split(" ").join('%20');
    let omdbUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

    request(omdbUrl, function (error, response, body) {
        let movieData = JSON.parse(body);
        // console.log(movieData)
        console.log('\x1b[36m%s\x1b[7m', "___________________________________\n\n");
        console.log('\x1b[36m%s\x1b[7m', "Title: " + movieData.Title + " ");
        console.log('\x1b[36m%s\x1b[7m', "Year: " + movieData.Year + " ");
        if(movieData.imdbRating) { console.log('\x1b[36m%s\x1b[7m', "imdb Rating: " + movieData.imdbRating + " ") };
        if(movieData.Ratings[1]){ console.log('\x1b[36m%s\x1b[7m', "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value + " ") }
        console.log('\x1b[36m%s\x1b[7m', "Country: " + movieData.Country + " ");
        console.log('\x1b[36m%s\x1b[7m', "Language: " + movieData.Language + " ");
        console.log('\x1b[36m%s\x1b[7m', "Actors: " + movieData.Actors + " ")
        console.log('\x1b[36m%s\x1b[7m', "\nPlot: " + movieData.Plot + " ");
    })
}

let method = process.argv[2];
let input = process.argv[3];

if( method === "concert-this") {
    bandsintownRequest(input);
}

if( method === "spotify-this-song"){
    spotifyRequest(input);
}

if( method === "movie-this") {
    omdbRequest(input);
}

if( method === "do-what-it-says"){

}