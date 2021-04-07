import defOptions from './pagination/paginationOptions';
const { options } = defOptions;
import spinner from './spinner';
// import refs from './refs/refs';
import goUp from './utils/goUp';
import renderCard from './utils/renderCard';
import createCorrectResult from './utils/createCorrectResults';
import createNewPagination from './utils/createNewPagination';
import { newApi } from './api-service/apiService';
import refs from './refs/refs';
//--------------------------------------------------------
// константи
const searchForm = document.querySelector('#search-form');
const errorRef = document.querySelector('.search-error');
const headerRef = document.querySelector('header');
const footerRef = document.querySelector('footer');
const paginationBox = document.querySelector('.pagination-wrapper');
const movieList = document.querySelector('.movies-list');
//--------------------------------------------------------
function fixedFooterAndPaginationBox() {
  footerRef.classList.remove('footer--fixed');
  paginationBox.classList.remove('pagination-wrapper--fixed');
  if (movieList.clientHeight === 0) {
    footerRef.classList.add('footer--fixed');
    paginationBox.classList.add('pagination-wrapper--fixed');
  }
}

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
  function getFilteredMovies(page) {
    return newApi.getMoviesByGenre(page);
  }
  //берем ссилку на необхідну функцію
  let promise = getAllMovie;
  if (key === 'word') promise = getSearchWord;
  if (key === 'filter') promise = getFilteredMovies;
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
    return;
  }
  const correctResult = await createCorrectResult(results);
  renderCard(correctResult);
  fixedFooterAndPaginationBox();
  PaginationPlugin.on('beforeMove', e => {
    removeAndChangePagTheme(pagBox);
    fixedFooterAndPaginationBox();
  });

  PaginationPlugin.on('afterMove', async ({ page }) => {
    spinner.showSpinner();
    removeAndChangePagTheme(pagBox);
    fixedFooterAndPaginationBox();
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
//функція фільтрації
function renderAndPaginationFilteredMovies() {
  refs.genreSelector.addEventListener('click', handleGenreSelection);
  refs.sortBySelector.addEventListener('click', handleSortBySelection);
}
//--------------------------------------------------------
function handleGenreSelection(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'BUTTON') return;
  if (target.id !== refs.filterByGenreButton.id) {
    refs.filterByGenreButton.textContent = target.textContent;
    if (target.id !== '0') {
      newApi.genreCriterion = target.id;
    } else {
      refs.filterByGenreButton.id = 'default';
      newApi.genreCriterion = '';
    }
  }

  setFiltration();
  refs.genresListBase.classList.add('is-hidden');
}

function handleSortBySelection(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'BUTTON') return;

  if (target.dataset.value !== refs.filterSortByButton.dataset.value) {
    if (target.dataset.value === 'no-filter') {
      refs.filterSortByButton.textContent = 'SORT BY';
      refs.filterSortByButton.dataset.value = target.dataset.value;
      newApi.sortByCriterion = '';
    } else {
      refs.filterSortByButton.textContent = target.textContent;
      refs.filterSortByButton.dataset.value = target.dataset.value;
      newApi.sortByCriterion = target.dataset.value;
    }
  }

  setFiltration();
  refs.sortByListBase.classList.add('is-hidden');
}

function setFiltration() {
  if (!newApi.genreCriterion && !newApi.sortByCriterion) {
    renderAndPagination();
  } else renderAndPagination('filter');
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
//функція фільтрації
renderAndPaginationFilteredMovies();
//-----------------------------------------------------------
//функція для рендеру і пагінації для бібліотеки
// отримуєм масив готових коректних обєктів
function renderLibrary(arrayFilm) {
  const maxCardPerPage = 12;
  options.itemsPerPage = maxCardPerPage;
  options.totalItems = arrayFilm.length;
  const { PaginationPlugin } = createNewPagination();
  const pagBox = document.querySelector('#pagination-box');
  removeAndChangePagTheme(pagBox);
  const firstMovie = arrayFilm.filter((_, index) => index < maxCardPerPage);
  renderCard(firstMovie);
  fixedFooterAndPaginationBox();
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
  PaginationPlugin.on('afterMove', e => {
    fixedFooterAndPaginationBox();
    removeAndChangePagTheme(pagBox);
  });
}

export { renderAndPaginationPopularMovies, renderLibrary };
//----------------------------------------------------------------------------------------------------------------
// renderLibraryById(testArrId);
function errorSearchMovie() {
  errorRef.classList.add('is-hidden');
}
