import movieCard from '../templates/movie-card.hbs';
import MoviesApiService from './api-service/apiService';
import LocalStorageService from './local-storage/local-storage';

const localStorageService = new LocalStorageService();
const moviesApiService = new MoviesApiService();

const refs = {
  header: document.querySelector(".header"),
  navigationList: document.querySelector(".navigation-list"),
  searchFofm: document.querySelector(".search-form"),
  tabs: document.querySelector(".tabs"),
  movieList: document.querySelector(".movies-list")
};

//Функция для работы с Библиотекой
const onChangeList = (event) => {

  const currentActiveItem = refs.tabs.querySelector('.is-active');

  if (currentActiveItem) {
    currentActiveItem.classList.remove('.is-active');
  }

  //Отрисовывает если нажата кнопка "WATCHED"
  if (event.target.dataset.action === "finished") {
    refs.movieList.innerHTML = "";

    event.target.classList.add('.is-active');

    const movies = localStorageService.takeFromStorage();
    const watchedMovies = movies.watched;
    watchedMovies.forEach(element => {
      moviesApiService.getResponseInfo(element).then(({ data }) => {
        const markup = movieCard(data);
        return refs.movieList.insertAdjacentHTML('beforeend', markup);
      }); 
    }); 
  }

  
  //Отрисовывает если нажата кнопка "QUEUE"
  if (event.target.dataset.action === "waiting") {
    refs.movieList.innerHTML = "";

    event.target.classList.add('.is-active');

    const movies = localStorageService.takeFromStorage();
    const moviesInQueue = movies.inQueue;
    moviesInQueue.forEach(element => {
      moviesApiService.getResponseInfo(element).then(({ data }) => {
        const markup = movieCard(data);
        return refs.movieList.insertAdjacentHTML('beforeend', markup);
      }); 
    }); 
  }
}

//Перерисовка разметки
const changeMarkup = (page) => {

   const activePageState = page.dataset.state;

  if (activePageState === 'home') {
    refs.header.classList.add('header');
    refs.header.classList.remove('header-library');
    refs.searchFofm.classList.remove('is-hidden');
    refs.tabs.classList.add('is-hidden');
  }

  if (activePageState === 'library') {
    refs.header.classList.add('header-library');
    refs.header.classList.remove('header');
    refs.searchFofm.classList.add('is-hidden');
    refs.tabs.classList.remove('is-hidden');
    refs.tabs.addEventListener('click', onChangeList);
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
