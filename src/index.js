import './sass/main.scss';
import './modal_film_card/modal-film-card';
import './modal_film_card/go-up';
import './js/switch-page'
import MoviesApiService from './js/api-service.js/apiService';
import './js/switch-page';
import movieCard from './templates/movie-card.hbs';
import MoviesApiService from './js/api-service/apiService';
import pagination from './js/pagination/pagination'

const moviesApiService = new MoviesApiService();
moviesApiService.getResponseAll().then(({ data: { results } }) => console.log(results));
 
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('input', onSearch);

function onSearch(event) {
    event.preventDefault();
    moviesApiService.query = event.Target.children[0].value;
    moviesApiService.getResponseWord().then(({ data: { results } }) => console.log(results));
}

