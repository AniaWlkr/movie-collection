import templateTrailer from '../templates/modal-trailer.hbs';
import spinner from './spinner';
import refs from './refs/refs';
import { newApi } from './api-service/apiService';

function onOpenTrailer(event) {
  const movieId = event.target.dataset.sourse;

  if (event.target.className !== 'modal-card-button trailer-btn') {
    return;
  }

  spinner.showSpinner();
  newApi.getTrailer(movieId).then(({ data: { results } }) => {
    spinner.hideSpinner();
    refs.modalOverlayTrailer.insertAdjacentHTML(
      'beforeend',
      templateTrailer(results[0]),
    );

    addClassList();
  });
}

function onCloseTrailer() {
  removeClassList();
  clearContainer();
}

function onCloseOverlay(event) {
  if (event.target) {
    onCloseTrailer();
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
refs.modalOverlayTrailer.addEventListener('click', onCloseOverlay);
refs.modalTrailer.addEventListener('click', onCloseTrailer);

export default onCloseTrailer;
