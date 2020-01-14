const fetch = require("node-fetch");

const apikey = 'f13b35a7449050301ba5dbef9580d820'
const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=f13b35a7449050301ba5dbef9580d820&language=en-US&page=1'


async function data(){

    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        console.log(json.results.map(movie => movie.title))
    } else {
        alert("HTTP-Error: " + response.status);
    }

}

data();