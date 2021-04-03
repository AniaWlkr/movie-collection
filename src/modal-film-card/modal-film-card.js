import modalCardTemplate from '../templates/modal-film-card.hbs';
import MoviesApiService from '../js/api-service/apiService';
import LocalStorageService from '../js/local-storage/local-storage';

class ModalFilmCard {
  constructor() {
    this.modalRef = document.querySelector('.modal');
    this.modalBackdropeRef = document.querySelector('.modal-backdrope');
    this.modalContentRef = document.querySelector('.modal-content');
    this.moviesListRef = document.querySelector('.movies-list');
    this.drawSelectedFilm = this.drawSelectedFilm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.modalCloseByEsc = this.modalCloseByEsc.bind(this);
  }

  openModal(even) {
    this.modalRef.classList.add('is-open');
    window.addEventListener('keyup', this.modalCloseByEsc);
  }

  closeModal(event) {
    this.modalRef.classList.remove('is-open');
    this.modalContentRef.innerHTML = '';
    window.removeEventListener('keyup', this.modalCloseByEsc);
  }

  modalCloseByEsc(event) {
    if (event.code !== 'Escape') return;
    closeModal();
  }

  drawSelectedFilm(event) {
    if (event.target.nodeName === 'UL') {
      return;
    }

    const newApi = new MoviesApiService();
    const newStorage = new LocalStorageService();

    const checkTargetElements = event.path.find(
      element => element.nodeName === 'LI',
    );
    const targetId = checkTargetElements.dataset.sourse;

    const contentRef = this.modalContentRef;
    const openModalInPromice = this.openModal();
    const closeModalInPromice = this.closeModal;
    newStorage.addMovieId = targetId;
    const modalButtonsDivRefPromice = this.modalButtonsDivRef;
    this.modalContentRef.innerHTML = '';

    newApi.getResponseInfo(targetId).then(function (answer) {
      contentRef.insertAdjacentHTML(
        'afterbegin',
        modalCardTemplate(answer.data),
      );
      openModalInPromice;
      const modalCloseButtonRef = document.querySelector('.modal-close-button');
      const modalButtonsDivRef = document.querySelector('.modal-button-div');
      modalCloseButtonRef.addEventListener('click', closeModalInPromice);
      // openModalInPromice;
      newStorage.addLocalStorageListener(modalButtonsDivRef);
    });
  }

  addEventListeners() {
    this.modalBackdropeRef.addEventListener('click', this.closeModal);
    this.moviesListRef.addEventListener('click', this.drawSelectedFilm);
  }
}

const newModal = new ModalFilmCard();
newModal.addEventListeners();

export default ModalFilmCard;

// const modalRef = document.querySelector('.modal');
// const modalBackdropeRef = document.querySelector('.modal-backdrope');
// const modalContentRef = document.querySelector('.modal-content');
// const moviesListRef = document.querySelector('.movies-list');

// const newApi = new MoviesApiService();

// const openModal = event => {
//   modalRef.classList.add('is-open');
//   window.addEventListener('keyup', modalCloseByEsc);
// };

// const closeModal = event => {
//   modalRef.classList.remove('is-open');
//   modalContentRef.innerHTML = '';
// };

// const modalCloseByEsc = event => {
//   if (event.code !== 'Escape') return;
//   modalRef.classList.remove('is-open');
//   window.removeEventListener('keyup', modalCloseByEsc);
// };

// const drawSelectedFilm = event => {
//   const checkTargetElements = event.path.find(
//     element => element.nodeName === 'LI',
//   );
//   const targetId = checkTargetElements.dataset.sourse;
//   newApi.getResponseInfo(targetId).then(function (answer) {
//     modalContentRef.insertAdjacentHTML(
//       'afterbegin',
//       modalCardTemplate(answer.data),
//     );
//     const modalCloseButtonRef = document.querySelector('.modal-close-button');
//     modalCloseButtonRef.addEventListener('click', closeModal);
//     openModal();
//   });
// };

// modalBackdropeRef.addEventListener('click', closeModal);
// moviesListRef.addEventListener('click', drawSelectedFilm);
