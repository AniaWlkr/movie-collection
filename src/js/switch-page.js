import movieCard from '../templates/movie-card.hbs';
import LocalStorageService from './local-storage/local-storage';
// import { renderLibraryFilms, renderAndPaginationPopularMovies } from './insert_popular_films';
import './insert_popular_films';

const localStorageService = new LocalStorageService();

const refs = {
  header: document.querySelector(".header"),
  footer: document.querySelector(".footer"),
  navigationList: document.querySelector(".navigation-list"),
  searchFofm: document.querySelector(".search-form"),
  tabs: document.querySelector(".tabs"),
  movieList: document.querySelector(".movies-list"),
  paginationBox: document.querySelector("#pagination-box")
};

const setMoviesLibraryListHeight = () => {
  const paddings = 110;
  const margins = 26;
  const headerHeight = refs.header.clientHeight;
  const footerHeight = refs.footer.clientHeight;
  const paginationHeight = refs.paginationBox.clientHeight;
  const windowHeight = document.documentElement.clientHeight;
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  const moviesListCurrentHeight = scrollHeight - (headerHeight + footerHeight + paginationHeight + paddings + margins);
  console.log(moviesListCurrentHeight);
  if (scrollHeight <= windowHeight) {
    refs.movieList.style.height = moviesListCurrentHeight + 'px';
  } else { refs.movieList.removeAttribute('style')}
};

//Функция для работы с Библиотекой
const onChangeList = (event) => {

  const currentActiveItem = refs.tabs.querySelector('.is-active');

  if (currentActiveItem) {
    currentActiveItem.classList.remove('is-active');
  }

  const windowHeight = document.documentElement.clientHeight;
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  if (scrollHeight <= windowHeight) {
    refs.movieList.removeAttribute('style')
  }

  //Отрисовывает если нажата кнопка "WATCHED"
  if (event.target.dataset.action === "finished") {
    event.target.classList.add('is-active');
    const movies = localStorageService.getMoviesFromStorage();
    const watchedMovies = movies.watсhed;
    renderLibraryFilms(watchedMovies);
  }

  
  //Отрисовывает если нажата кнопка "QUEUE"
  if (event.target.dataset.action === "waiting") {
    event.target.classList.add('is-active');
    const movies = localStorageService.getMoviesFromStorage();
    const moviesInQueue = movies.inQueue;
    renderLibraryFilms(moviesInQueue);
  }
}

//Перерисовка разметки
const changeMarkup = (page) => {

   const activePageState = page.dataset.state;

  if (activePageState === 'home') {
    refs.movieList.removeAttribute('style');
    refs.movieList.innerHTML = "";
    refs.header.classList.add('header');
    refs.header.classList.remove('header-library');
    refs.searchFofm.classList.remove('is-hidden');
    refs.tabs.classList.add('is-hidden');
    renderAndPaginationPopularMovies();
  }
  if (activePageState === 'library') {
    refs.movieList.innerHTML = ""
    refs.header.classList.add('header-library');
    refs.header.classList.remove('header');
    refs.searchFofm.classList.add('is-hidden');
    refs.tabs.classList.remove('is-hidden');
    refs.tabs.addEventListener('click', onChangeList);
    setMoviesLibraryListHeight();
  }
}

//Меняет хедеры 
const pageSwitcher = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== 'A') return;

  const prevActivePage = refs.navigationList.querySelector (".current");
  
  if (prevActivePage) {
    prevActivePage.classList.remove("current")
  };

  const currentActivePage = event.target;
  currentActivePage.classList.add("current");

  changeMarkup(currentActivePage);
}

refs.navigationList.addEventListener('click', pageSwitcher);
