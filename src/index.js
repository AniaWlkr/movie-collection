import './sass/main.scss';
import './modal_film_card/modal-film-card';
import './modal_film_card/go-up';
import apiServise from './js/apiServise';
import './js/switch-page'
import MoviesApiService from './js/api-service.js/apiService';

// (apiServise('all', 1).then(({ data: { results } }) => console.log(results)));

const moviesApiService = new MoviesApiService();
moviesApiService.getResponseAll().then(({ data: { results } }) => console.log(results));
 
const inputRef = document.querySelector('.search-input');
inputRef.addEventListener('input', onSearch);

function onSearch(event) {
    moviesApiService.query = event.target.value;
    moviesApiService.getResponseWord().then(({ data: { results } }) => console.log(results));
}

