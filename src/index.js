import './sass/main.scss';
import './button-up/go-up';
import './modal-film-card/modal-film-card';
import './js/switch-page';
import './js/insert_popular_films';
import movieCard from './templates/movie-card.hbs';
import MoviesApiService from './js/api-service/apiService';
import PaginationPlugin from './js/pagination/pagination';

// (apiServise('all', 1).then(({ data: { results } }) => console.log(results)));

const PagPlugin = new PaginationPlugin();
const moviesApiService = new MoviesApiService();
moviesApiService
  .getResponseAll()
  .then(({ data }) => {
      const { results, total_results } = data;
      console.log(results);
    PagPlugin.updateTotalResult(total_results);
    PagPlugin.initPlugin().on('afterMove', ({ page }) => {
      moviesApiService
        .goToPagePopular(page)
        .then(({ data: { results, page } }) => {
          console.log(results);
          console.log(page);
        });
    });
  });
 
const searchForm = document.querySelector('#search-form');
const moviesRef = document.querySelector('.movies-list');
searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    moviesApiService.query = event.currentTarget.elements.query.value;
    appendMovieMarkup(moviesApiService.query, MoviesApiService);
    
};

function appendMovieMarkup(query) {
    moviesApiService.getResponseWord().then(({ data: { results } }) => {
        moviesRef.insertAdjacentHTML('beforeend', results.map(query => movieCard(query)))
    });
};
