import movieCard from '../templates/movie-card.hbs';

const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'be8c1fddab60d3ca36450ce7d48f58dd';

const refs = {
    movieList : document.querySelector('.movies-list'),
}

function apiServise() {
    const url = `${BASE_URL}3/trending/all/day?api_key=${API_KEY}`;
    return fetch(url)
        .then(r => r.json())
        .then(({ results }) => { return results });
}

function genresApi() {
    const url = `${BASE_URL}3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    return fetch(url)
        .then(r => r.json())
        .then(({ genres }) => { return genres });
}

onSearchPopularFilms();

function onSearchPopularFilms() {
    apiServise()
        .then(insertPopularFilms)
}

function insertPopularFilms(results) {
    
    genresApi().then(function (genres) {
        for (let j = 0; j < results.length; j++) {
            if (!results[j]["release_date"]) {
                results[j]["release_date"] = results[j]["first_air_date"]; 
            }
            results[j]["release_date"] = results[j]["release_date"].slice(0, 4);
            results[j]["genres"] = []
            for (let i = 0; i < results[j]["genre_ids"].length; i++) {
                let genre = genres.find(genre => genre.id === results[j]["genre_ids"][i]);
                if (genre) {
                    results[j]["genres"].push(genre["name"]);
                }
            };
        }
        
        refs.movieList.insertAdjacentHTML('beforeend', results.map(result => movieCard(result)).join(''))
    });   
}



