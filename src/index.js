import './sass/main.scss';
import './button-up/go-up';
import './modal-film-card/modal-film-card';
import './js/switch-page';

//---------------------- Раскомментировать чтобы запустить проверку localStorage в тестовом режиме
// import './js/test'; 
//---------------------- Но перед этим закомментировать import './modal-film-card/modal-film-card'; 
//---------------------- и всё что ниже констант

// import './js/insert_popular_films'; //необхідно поєднати з аксіосом
import movieCard from './templates/movie-card.hbs';
import MoviesApiService from './js/api-service/apiService';
import PaginationPlugin from './js/pagination/pagination';
import LocalStorageService from './js/local-storage/local-storage';

// екземпляр класу
const moviesApiService = new MoviesApiService();
const localStorageService = new LocalStorageService();
//--------------------------------------------------------
// константи
const searchForm = document.querySelector('#search-form');
const moviesRef = document.querySelector('.movies-list');

//--------------------------------------------------------

//сброс пагинации
// популярні фільми
PaginationPlugin.reset();
moviesApiService.getResponseAll().then(({ data }) => {
  const { results, total_results } = data;
  renderCard(results);
  PaginationPlugin.setTotalItems(total_results);
  PaginationPlugin.on('afterMove', ({ page }) => {
    moviesApiService.goToPage(page);
    moviesApiService.getResponseAll().then(({ data: { results } }) => {
      renderCard(results);
    });
  });
});

// //--------------------------------------------------------
searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  //знімаем слушателя на інпут
  searchForm.removeEventListener('submit', onSearch);
  PaginationPlugin.reset();
  moviesApiService.page = 1;
  moviesApiService.query = event.currentTarget.elements.query.value;
  moviesApiService.getResponseWord().then(({ data }) => {
    const { results, total_results } = data;
    renderCard(results);
    //добавляем після першого рендеру
    searchForm.addEventListener('submit', onSearch);
    //------------
    PaginationPlugin.setTotalItems(total_results);
    PaginationPlugin.on('afterMove', ({ page }) => {
      moviesApiService.goToPage(page);
      moviesApiService.getResponseWord().then(({ data: { results } }) => {
        renderCard(results);
      });
    });
  });
}

function renderCard(arr) {
  moviesRef.innerHTML = '';
  moviesRef.insertAdjacentHTML(
    'beforeend',
    arr.map(query => movieCard(query)).join(''),
  );
}