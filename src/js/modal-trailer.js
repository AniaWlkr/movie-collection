import templateTrailer from '../templates/modal-trailer.hbs';
import MoviesApiService from './api-service/apiService';
const moviesApiService = new MoviesApiService();

import Spinner from './spinner';
const spinner = new Spinner();

const refs = {
  openTrailerBtn: document.querySelector('.modal-content'),
  modalTrailer: document.querySelector('.modal-trailer'),
  modalOverlayTrailer: document.querySelector('.modal-trailer-overlay'),
};

function onOpenTrailer(event) {
  const movieId = event.target.dataset.sourse;

  if (event.target.className !== 'modal-card-button trailer-btn') {
    return;
  }
  // здесь можно поставить спиннер
  spinner.showSpinner();
  moviesApiService.getTrailer(movieId).then(({ data: { results } }) => {
    spinner.hideSpinner();
    clearContainer();
    refs.modalOverlayTrailer.insertAdjacentHTML(
      'beforeend',
      templateTrailer(results[0]),
    );
    addClassList();
  });
}

function onCloseTrailer(event) {
  if (event.target) {
    removeClassList();
    clearContainer();
  }
}

function clearContainer() {
  refs.modalOverlayTrailer.innerHTML = '';
}

function removeClassList() {
  refs.modalOverlayTrailer.classList.remove('show-trailer');
  document.body.classList.remove('no-scroll');
}

function addClassList() {
  refs.modalOverlayTrailer.classList.add('show-trailer');
  document.body.classList.add('no-scroll');
}

refs.openTrailerBtn.addEventListener('click', onOpenTrailer);
refs.modalOverlayTrailer.addEventListener('click', onCloseTrailer);
refs.modalTrailer.addEventListener('click', onCloseTrailer);
