import MoviesApiService from './api-service/apiService';
// import noImage from '../images/movies-card/noimage.jpg';
import defOptions from './pagination/paginationOptions';
const { options } = defOptions;
import Spinner from './spinner';
import refs from './refs/refs';
import goUp from './utils/goUp';
import renderCard from './utils/renderCard';
import createCorectResult from './utils/createCorectResults';
import createNewPagination from './utils/createNewPagination';
import { newApi } from './api-service/apiService';

// екземпляр класу АПІ в подальшому потрібно буде передати зразу в експорт новий екземпляр, щоб код не дублювався у всіх хто працює з АПІ
const moviesApiService = new MoviesApiService();
const spinner = new Spinner();
//--------------------------------------------------------
// константи

const searchForm = document.querySelector('#search-form');
// const pagBox = document.querySelector('#pagination-box');
const errorRef = document.querySelector('.search-error');
const headerRef = document.querySelector('header');

// const searchForm = document.querySelector('#search-form');
// const moviesRef = document.querySelector('.movies-list');
// const pagBox = document.querySelector('#pagination-box');
// const errorRef = document.querySelector('.search-error');

//--------------------------------------------------------
// функція для рендеру і пагінації
async function renderAndPagination(key) {
  function getAllMovie(page) {
    // return moviesApiService.getResponseAll(page);
    return newApi.getResponseAll(page);
  }
  //повертаем проміс
  function getSearchWord(page) {
    // return moviesApiService.getResponseWord(page);
    return newApi.getResponseWord(page);
  }
  //берем ссилку на необхідну функцію
  let promise = getAllMovie;
  if (key === 'word') promise = getSearchWord;

  //заготовка під скрол до потрібної сторінки
  //якщо у нас записалась якась сторінка на локал сторадж
  let page = 1;
  // let storadgePage = 2; //Для перевірки наступну строку заоментувати і навпаки
  let storadgePage = 0;
  if (storadgePage !== 1 && storadgePage) page = storadgePage;

  // spinner.showSpinner();
  const {
    data: { results, total_results },
  } = await promise(page);
  spinner.hideSpinner();
  //налаштування пагінації відбувається при запуску функції
  // перестворюєм пагінатор і отримуєм на нього ссилку
  //перехід пагінації до потрібної сторінки
  options.totalItems = total_results;
  options.itemsPerPage = 20;
  const { PaginationPlugin } = createNewPagination();
  const pagBox = document.querySelector('#pagination-box');
  PaginationPlugin.movePageTo(page);
  //-------------------------------
  changePagTheme(pagBox);
  PaginationPlugin.setTotalItems(total_results);
  const correctResult = await createCorectResult(results);
  // spinner.hideSpinner();
  renderCard(correctResult);
  // spinner.hideSpinner();

  PaginationPlugin.on('afterMove', async ({ page }) => {
    spinner.showSpinner();
    changePagTheme(pagBox);
    const {
      data: { results, total_results },
    } = await promise(page);
    PaginationPlugin.setTotalItems(total_results);
    const correctResult = await createCorectResult(results);
    renderCard(correctResult);
    goUp(headerRef);
    spinner.hideSpinner();
  });
}

//--------------------------------------------------------
// функція популярних фільмів
function renderAndPaginationPopularMovies() {
  renderAndPagination();
}
//--------------------------------------------------------
// функція пошук по слову
function renderAndPaginationSearchMovies() {
  refs.searchForm.addEventListener('submit', onSearch);
}
//--------------------------------------------------------
function onSearch(event) {
  event.preventDefault();
  spinner.showSpinner();
  //получаем строку и удаляем пробели
  let query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    refs.errorRef.classList.remove('is-hidden');
    spinner.hideSpinner();
    return;
  }
  // moviesApiService.query = query;

  newApi.searchQuery = query;
  renderAndPagination('word');
}
//--------------------------------------------------------
//зміна теми для пагінації
function changePagTheme(selector) {
  if (document.body.classList.contains('dark-theme')) {
    selector.children.forEach(element => element.classList.add('dark-theme'));
  }
}
//--------------------------------------------------------
// функція популярних фільмів
renderAndPaginationPopularMovies();
// функція пошук по слову
renderAndPaginationSearchMovies();
//-----------------------------------------------------------
//функція для рендеру і пагінації для бібліотеки
// отримуєм масив готових коректних обєктів
function renderLibrary(arrayFilm) {
  const maxCardPerPage = 12;
  options.itemsPerPage = maxCardPerPage;
  options.totalItems = arrayFilm.length;
  const { PaginationPlugin } = createNewPagination();
  const pagBox = document.querySelector('#pagination-box');
  changePagTheme(pagBox);
  const firstMovie = arrayFilm.filter((_, index) => index < maxCardPerPage);
  renderCard(firstMovie);
  PaginationPlugin.on('beforeMove', ({ page }) => {
    let nextMovie = null;
    if (page === 1) {
      nextMovie = arrayFilm.filter((_, index) => index < maxCardPerPage);
    } else {
      nextMovie = arrayFilm.filter(
        (_, index) =>
          index > maxCardPerPage * page - maxCardPerPage - 2 &&
          index < maxCardPerPage * page - 1,
      );
    }
    changePagTheme(pagBox);
    renderCard(nextMovie);
    goUp(headerRef);
  });
  PaginationPlugin.on('afterMove', e => changePagTheme(pagBox));
}

export { renderAndPaginationPopularMovies, renderLibrary };

/**
//--------------------------------------------------------
// функція для рендеру і пагінації
function renderAndPagination(key) {
  //повертаем проміс
  function getAllMovie(page) {
    return moviesApiService.getResponseAll(page);
  }
  //повертаем проміс
  function getSearchWord(page) {
    return moviesApiService.getResponseWord(page);
  }
  //берем ссилку на необхідну функцію
  let promise = getAllMovie;
  if (key === 'word') promise = getSearchWord;
  //перший рендер
  promise().then(({ data }) => {
    //деструктуризація
    const { results, total_results } = data;
    if (results.length === 0) {
      refs.errorRef.classList.remove('is-hidden');
       setTimeout(errorSearchMovie, 2000);
      spinner.hideSpinner();
      return;
  }
    //формує коректний пагінатор
    PaginationPlugin.setTotalItems(total_results);
    PaginationPlugin.reset();
    changePagTheme();
    
    //створюєм коректний результат потім рендер
    createCorectResult(results)
      .then(data => {
        renderCard(data);
      })
    PaginationPlugin.setTotalItems(total_results);
spinner.hideSpinner();
    //рендери при зміні в пагінації
    PaginationPlugin.on('afterMove', ({ page }) => {
      //зміна теми
      changePagTheme();
      promise(page).then(({ data: { results } }) => {
        createCorectResult(results).then(renderCard);
        //скрол після кліку на верх
        setTimeout(goUp(), 100);
        // await goUp();
      });
    });
  });
}
//--------------------------------------------------------
// функція популярних фільмів
function renderAndPaginationPopularMovies() {
  renderAndPagination();
}
//--------------------------------------------------------
// функція пошук по слову
function renderAndPaginationSearchMovies() {
  refs.searchForm.addEventListener('submit', onSearch);
}
//--------------------------------------------------------
function onSearch(event) {
  event.preventDefault();
  spinner.showSpinner();
  //получаем строку и удаляем пробели
  let query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    refs.errorRef.classList.remove('is-hidden');
    setTimeout(errorSearchMovie, 2000);
    spinner.hideSpinner();
    return;
  }
  moviesApiService.query = query;
  renderAndPagination('word');
  refs.searchForm.reset();
}
//--------------------------------------------------------
//зміна теми для пагінації
function changePagTheme() {
  if (document.body.classList.contains('dark-theme')) {
    refs.pagBox.children.forEach(element => element.classList.add('dark-theme'));
  }
}
//--------------------------------------------------------
// функція популярних фільмів
renderAndPaginationPopularMovies();
// функція пошук по слову
renderAndPaginationSearchMovies();
//-----------------------------------------------------------
//-----------------------------------------------------------
//функция рендерит в My Library просмотренныефильмы и фильмы в очереди
export const renderLibraryFilms = function(arrayOfId) {
  let arr = [];  
  arrayOfId.forEach(element => {
        moviesApiService.getResponseInfo(element)
          .then(({ data }) => {
            arr.push(data);       
        });
  })
  createCorectResult(arr).then(renderCard);
}
//-----------------------------------------------------------
function errorSearchMovie() {
  refs.errorRef.classList.add('is-hidden'); 
};
*/

