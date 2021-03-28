import './sass/main.scss';
import './modal_film_card/modal-film-card';
import './modal_film_card/go-up';
import './js/switch-page'
import MoviesApiService from './js/api-service/apiService';
import pagination from './js/pagination/pagination';

// (apiServise('all', 1).then(({ data: { results } }) => console.log(results)));

const moviesApiService = new MoviesApiService();
moviesApiService.getResponseAll().then(({ data: { results } }) => console.log(results));
 
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('input', onSearch);

function onSearch(event) {
    moviesApiService.query = event.currentTarget.elements.query.value;
    moviesApiService.getResponseWord().then(({ data: { results } }) => console.log(results));
}

