import './sass/main.scss';
import './button-up/go-up';
import './modal-film-card/modal-film-card';
import './js/switch-page.js';
import MoviesApiService from './js/api-service.js/apiService';
import pagination from './js/pagination/pagination';

// (apiServise('all', 1).then(({ data: { results } }) => console.log(results)));

const moviesApiService = new MoviesApiService();
moviesApiService
  .getResponseAll()
  .then(({ data: { results } }) => console.log(results));

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('input', onSearch);

function onSearch(event) {
  moviesApiService.query = event.currentTarget.elements.query.value;
  moviesApiService
    .getResponseWord()
    .then(({ data: { results } }) => console.log(results));
}
