import LocalStorageService from './local-storage/local-storage';
import {
  renderAndPaginationPopularMovies,
  renderLibrary,
} from './insert_popular_films';
import refs from './refs/refs';
import { newApi } from './api-service/apiService';


const renderQueue = () => {
  const movies = LocalStorageService.getMoviesFromStorage();
  let queueMovies = null;
  if (!movies) {
    queueMovies = [];
  } else {
    queueMovies = movies.inQueue;
  }
  renderLibrary(queueMovies);
};

const renderWatched = () => {
  const movies = LocalStorageService.getMoviesFromStorage();
  let watchedMovies = null;
  if (!movies) {
    watchedMovies = [];
  } else {
    watchedMovies = movies.watсhed;
  }
  renderLibrary(watchedMovies);
};

const refreshLibrary = (selector) => {
  const isLibrary = selector.classList.contains('header-library');
  if (isLibrary) {
    const tabsRef = document.querySelector('.tabs');
    const activeList = tabsRef.querySelector('.is-active');

    if (activeList.dataset.action === 'finished') {
      renderWatched();
    }

    if (activeList.dataset.action === 'waiting') {
      renderQueue();
    }
  }

  return;
};

export { refreshLibrary };

const checkActive = selector => {
  const currentActiveItem = selector.querySelector('.is-active');

  if (currentActiveItem) {
    currentActiveItem.classList.remove('is-active');
  }
};

//Функция для работы с Библиотекой
const onChangeList = event => {
  checkActive(refs.tabs);

  //Отрисовывает если нажата кнопка "WATCHED"
  if (event.target.dataset.action === 'finished') {
    event.target.classList.add('is-active');
    renderWatched();
  }

  //Отрисовывает если нажата кнопка "QUEUE"
  if (event.target.dataset.action === 'waiting') {
    event.target.classList.add('is-active');
    renderQueue();
  }
};

const filterReset = () => {
  refs.filterSortByButton.textContent = 'SORT BY';
  refs.filterSortByButton.dataset.value = 'no-filter';
  newApi.sortByCriterion = '';
  refs.filterByGenreButton.textContent = 'ALL GENRES';
  refs.filterByGenreButton.id = 'default';
  newApi.genreCriterion = '';
}

const hideFilterButtons = () => {
  refs.filterByGenreButton.classList.add('is-hidden');
  refs.filterSortByButton.classList.add('is-hidden');
  refs.resetButton.classList.add('is-hidden');
};

const showFilterButtons = () => {
  refs.filterByGenreButton.classList.remove('is-hidden');
  refs.filterSortByButton.classList.remove('is-hidden');
  refs.resetButton.classList.remove('is-hidden');
};

//Перерисовка разметки
const changeMarkup = page => {
  const activePageState = page.dataset.state;

  if (activePageState === 'home') {
    refs.moviesRef.innerHTML = '';
    filterReset();
    showFilterButtons();
    refs.header.classList.add('header');
    refs.header.classList.remove('header-library');
    refs.searchForm.classList.remove('is-hidden');
    refs.tabs.classList.add('is-hidden');
    renderAndPaginationPopularMovies();
  }

  if (activePageState === 'library') {
    refs.moviesRef.innerHTML = '';
    filterReset();
    hideFilterButtons();
    checkActive(refs.tabs);
    refs.header.classList.add('header-library');
    refs.header.classList.remove('header');
    refs.searchForm.classList.add('is-hidden');
    refs.tabs.classList.remove('is-hidden');
    document
      .querySelector('button[data-action="waiting"]')
      .classList.add('is-active');
    renderQueue();
    refs.tabs.addEventListener('click', onChangeList);
  }
};

//Меняет хедеры
const pageSwitcher = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'A') return;

  const prevActivePage = refs.navigationList.querySelector('.current');

  if (prevActivePage) {
    prevActivePage.classList.remove('current');
  }

  const currentActivePage = event.target;
  currentActivePage.classList.add('current');

  changeMarkup(currentActivePage);
};

refs.navigationList.addEventListener('click', pageSwitcher);
