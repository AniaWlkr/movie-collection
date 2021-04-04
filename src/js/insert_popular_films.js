// import noImage from '../images/movies-card/noimage.jpg';
import defOptions from './pagination/paginationOptions';
const { options } = defOptions;
import spinner from './spinner';
// import refs from './refs/refs';
import goUp from './utils/goUp';
import renderCard from './utils/renderCard';
import createCorrectResult from './utils/createCorrectResults';
import createNewPagination from './utils/createNewPagination';
import { newApi } from './api-service/apiService';
//--------------------------------------------------------
// константи
const searchForm = document.querySelector('#search-form');
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
  //------------------------------------------------------------------ <------ не реалізовано
  //заготовка під скрол до потрібної сторінки
  //якщо у нас записалась якась сторінка на локал сторадж
  let page = 1;
  // let storadgePage = 2; //Для перевірки наступну строку заоментувати і навпаки
  let storadgePage = 0;
  if (storadgePage !== 1 && storadgePage) page = storadgePage;
  //------------------------------------------------------------------ <------ не реалізовано
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
  removeAndChangePagTheme(pagBox);
  PaginationPlugin.setTotalItems(total_results);
  // якщо пустий масив в результатах <------ коли нічого не знайдено а відповідь приходить
  if (total_results === 0) {
    errorRef.classList.remove('is-hidden');
    setTimeout(errorSearchMovie, 2000);
    console.log('нічого не знайдено'); // <-------------------------------- все на pnotify
    return;
  }
  const correctResult = await createCorrectResult(results);
  renderCard(correctResult);
  // spinner.hideSpinner();
  PaginationPlugin.on('beforeMove', e => {
    removeAndChangePagTheme(pagBox);
  });

  PaginationPlugin.on('afterMove', async ({ page }) => {
    spinner.showSpinner();
    removeAndChangePagTheme(pagBox);
    const {
      data: { results },
    } = await promise(page);

    //PaginationPlugin.setTotalItems(total_results);

    const correctResult = await createCorrectResult(results);
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
    setTimeout(errorSearchMovie, 2000);
    spinner.hideSpinner();
    return;
  }
  newApi.searchQuery = query;
  renderAndPagination('word');
  searchForm.reset();
}
//--------------------------------------------------------
//зміна теми для пагінації
function removeAndChangePagTheme(selector) {
  selector.children.forEach(element => element.classList.remove('dark-theme'));
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
  removeAndChangePagTheme(pagBox);
  const firstMovie = arrayFilm.filter((_, index) => index < maxCardPerPage);
  renderCard(firstMovie);
  PaginationPlugin.on('beforeMove', ({ page }) => {
    let nextMovie = null;
    if (page === 1) {
      nextMovie = arrayFilm.filter((_, index) => index < maxCardPerPage);
    } else {
      nextMovie = arrayFilm.filter(
        (_, index) =>
          index >= maxCardPerPage * (page - 1) && index < maxCardPerPage * page,
      );
    }
    removeAndChangePagTheme(pagBox);
    renderCard(nextMovie);
    goUp(headerRef);
  });
  PaginationPlugin.on('afterMove', e => removeAndChangePagTheme(pagBox));
}

export { renderAndPaginationPopularMovies, renderLibrary };
//----------------------------------------------------------------------------------------------------------------
//варіанти для Бібліотеки
//отримуєм масив коректних id без 404
const testArrId = [
  399566,
  412656,
  791373,
  621954,
  660006,
  651589,
  69050,
  600354,
  464052,
  802504,
  527774,
  95557,
  90970,
  93454,
  508442,
  587807,
  567797,
  1429,
  399566,
  412656,
  791373,
  621954,
  660006,
  651589,
  69050,
  600354,
  464052,
  802504,
  527774,
  95557,
  90970,
  93454,
  508442,
  587807,
  567797,
  1429,
  791373,
  621954,
  660006,
  651589,
  69050,
  600354,
  464052,
  802504,
  527774,
  95557,
  90970,
  93454,
  508442,
  587807,
  567797,
  1429,
];
async function requestHandler(arr) {
  const promises = arr.map(el => {
    try {
      return newApi.getResponseInfo(el);
    } catch (error) {
      console.log(error);
      return;
    }
  });
  const results = await Promise.all(promises);
  const correctResult = await createCorrectResult(results);
  renderCard(correctResult);
}
function renderLibraryById(arrayMovieId) {
  const maxCardPerPage = 12;
  options.itemsPerPage = maxCardPerPage;
  options.totalItems = arrayMovieId.length;
  const { PaginationPlugin } = createNewPagination();
  const pagBox = document.querySelector('#pagination-box');

  removeAndChangePagTheme(pagBox);
  const firstMovieId = arrayMovieId.filter(
    (_, index) => index < maxCardPerPage,
  );
  requestHandler(firstMovieId);
  PaginationPlugin.on('beforeMove', ({ page }) => {
    let nextMovieId = null;
    if (page === 1) {
      nextMovieId = arrayMovieId.filter((_, index) => index < maxCardPerPage);
    } else {
      nextMovieId = arrayMovieId.filter(
        (_, index) =>
          index >= maxCardPerPage * (page - 1) && index < maxCardPerPage * page,
      );
    }
    requestHandler(nextMovieId);
    goUp(headerRef);
  });

  PaginationPlugin.on('afterMove', e => removeAndChangePagTheme(pagBox));
}
// renderLibraryById(testArrId);
function errorSearchMovie() {
  errorRef.classList.add('is-hidden');
}
