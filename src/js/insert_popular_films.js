import MoviesApiService from './api-service/apiService';
// import noImage from '../images/movies-card/noimage.jpg';
import defOptions from './pagination/paginationOptions';
const { options } = defOptions;
import Spinner from './spinner';
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
    // PaginationPlugin.setTotalItems(total_results);
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
  searchForm.addEventListener('submit', onSearch);
}
//--------------------------------------------------------
function onSearch(event) {
  event.preventDefault();
  spinner.showSpinner();
  //получаем строку и удаляем пробели
  let query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    errorRef.classList.remove('is-hidden');
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
  console.log(arrayFilm.length);
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