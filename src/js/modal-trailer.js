import MoviesApiService from './api-service/apiService';
const moviesApiService = new MoviesApiService();
import spinner from './spinner';

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
  moviesApiService
    .getTrailer(movieId)
    .then(({ data: { results } }) => {
      const trailerKey = results[0].key;

      const markupModalTrailer = `<div class="modal-trailer-backdrop">
        <div class="modal-trailer-container">
          <button
            type="button"
            class="close-trailer-btn material-icons"
            data-action="close-trailer">
            close
          </button>
          <iframe src="https://www.youtube.com/embed/${trailerKey}" class="trailer" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div >`;
      spinner.hideSpinner();
      clearContainer();
      createHTML(markupModalTrailer);
    })
    .catch(() => {
      const markupModalImage = `<div class="modal-trailer-backdrop">
      <div class="modal-trailer-container">
      <button
      type="button"
      class="close-trailer-btn material-icons"
      data-action="close-trailer">
      close
      </button>
      <img src="https://linuxliaison.org/wp-content/uploads/2017/10/Screenshot-from-2017-10-16-23-05-56.png" class="trailer" />
      </div >
      </div >`;
      spinner.hideSpinner();
      createHTML(markupModalImage);
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

function createHTML(murkup) {
  refs.modalOverlayTrailer.insertAdjacentHTML('beforeend', murkup);
  addClassList();
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
