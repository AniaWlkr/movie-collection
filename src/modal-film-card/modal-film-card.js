import modalCardTemplate from '../templates/modal-film-card.hbs';
import MoviesApiService from '../js/api-service/apiService';

const modalRef = document.querySelector('.modal');
const modalBackdropeRef = document.querySelector('.modal-backdrope');
const modalContentRef = document.querySelector('.modal-content');
const moviesListRef = document.querySelector('.movies-list');

const newApi = new MoviesApiService();

const openModal = event => {
  modalRef.classList.add('is-open');
  window.addEventListener('keyup', modalCloseByEsc);
};

const closeModal = event => {
  modalRef.classList.remove('is-open');
  modalContentRef.innerHTML = '';
};

const modalCloseByEsc = event => {
  if (event.code !== 'Escape') return;
  modalRef.classList.remove('is-open');
  window.removeEventListener('keyup', modalCloseByEsc);
};

const drawSelectedFilm = event => {
  const checkTargetElements = event.path.find(
    element => element.nodeName === 'LI',
  );
  const targetId = checkTargetElements.dataset.sourse;
  newApi.getResponseInfo(targetId).then(function (answer) {
    modalContentRef.insertAdjacentHTML(
      'afterbegin',
      modalCardTemplate(answer.data),
    );
    const modalCloseButtonRef = document.querySelector('.modal-close-button');
    modalCloseButtonRef.addEventListener('click', closeModal);
    openModal();
  });
};

modalBackdropeRef.addEventListener('click', closeModal);
moviesListRef.addEventListener('click', drawSelectedFilm);
