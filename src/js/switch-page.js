import LocalStorageService from './local-storage/local-storage';
import {
  renderAndPaginationPopularMovies,
  renderLibrary,
} from './insert_popular_films';

const refs = {
  header: document.querySelector('.header'),
  footer: document.querySelector('.footer'),
  navigationList: document.querySelector('.navigation-list'),
  searchFofm: document.querySelector('.search-form'),
  tabs: document.querySelector('.tabs'),
  movieList: document.querySelector('.movies-list'),
  paginationBox: document.querySelector('.pagination-wrapper'),
};

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
    // fixedFooterAndPaginationBox();
    event.target.classList.add('is-active');
    renderWatched();
  }

  //Отрисовывает если нажата кнопка "QUEUE"
  if (event.target.dataset.action === 'waiting') {
    // fixedFooterAndPaginationBox();
    event.target.classList.add('is-active');
    renderQueue();
  }
};

// function fixedFooterAndPaginationBox() {
//   if (refs.movieList.clientHeight === 0) {
//     refs.footer.classList.add('footer--fixed');
//     refs.paginationBox.classList.add('pagination-wrapper--fixed');
//   } else {
//     refs.footer.classList.remove('footer--fixed');
//     refs.paginationBox.classList.remove('pagination-wrapper--fixed');
//   }
// }

//Перерисовка разметки
const changeMarkup = page => {
  const activePageState = page.dataset.state;

  if (activePageState === 'home') {
    refs.movieList.innerHTML = '';
    refs.header.classList.add('header');
    refs.header.classList.remove('header-library');
    refs.searchFofm.classList.remove('is-hidden');
    refs.tabs.classList.add('is-hidden');
    renderAndPaginationPopularMovies(); //асинхрон
    // setTimeout(fixedFooterAndPaginationBox(), 100); //забираєм фіксацію
  }

  if (activePageState === 'library') {
    refs.movieList.innerHTML = '';
    checkActive(refs.tabs);
    refs.header.classList.add('header-library');
    refs.header.classList.remove('header');
    refs.searchFofm.classList.add('is-hidden');
    refs.tabs.classList.remove('is-hidden');
    document
      .querySelector('button[data-action="waiting"]')
      .classList.add('is-active');
    try {
      renderQueue();
      // fixedFooterAndPaginationBox(); //забираєм фіксацію
    } catch {
      // fixedFooterAndPaginationBox(); //забираєм фіксацію
    }
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
