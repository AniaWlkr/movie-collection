import './sass/main.scss';
import MoviesApiService from './js/api-service.js/apiService';

const moviesApiService = new MoviesApiService();
moviesApiService.getResponseAll().then(({ data: { results } }) => console.log(results));
 
const inputRef = document.querySelector('.search-input');
inputRef.addEventListener('input', onSearch);

function onSearch(event) {
    moviesApiService.query = event.target.value;
    moviesApiService.getResponseWord().then(({ data: { results } }) => console.log(results));
}
