/* import axios from 'axios';
import defOptions from '../pagination/paginationOptions';
const { options } = defOptions;
import spinner from '../spinner';
// import refs from './refs/refs';
import goUp from '../utils/goUp';
import renderCard from '../utils/renderCard';
import createCorectResult from '../utils/createCorectResults';
import createNewPagination from '../utils/createNewPagination';
import { newApi } from '../api-service/apiService';
import refs from '../refs/refs';


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
    console.log('нічого не знайдено'); // <-------------------------------- все на pnotify
    return;
  }
  const correctResult = await createCorectResult(results);
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

    const correctResult = await createCorectResult(results);
    renderCard(correctResult);
    goUp(headerRef);
    spinner.hideSpinner();
  });
}

//----------------------------------------------------

function renderAndPaginationFilteredMovies() {
  refs.genreSelector.addEventListener('change', filterMovies);
}

function filterMovies() {
  const select = refs.genreSelector;
  const selected = select.options[select.selectedIndex];
  const selectedGenre = selected.text;
  if (selected !== select.options[0]) {
    newApi.filterCriteria = selected.dataset.id;
    renderAndPagination('filter');
  } else renderAndPagination();
}
renderAndPaginationFilteredMovies();



function removeAndChangePagTheme(selector) {
  selector.children.forEach(element => element.classList.remove('dark-theme'));
  if (document.body.classList.contains('dark-theme')) {
    selector.children.forEach(element => element.classList.add('dark-theme'));
  }
}
 */
