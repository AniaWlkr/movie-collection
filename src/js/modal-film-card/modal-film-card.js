import modalCardTemplate from '../../templates/modal-film-card.hbs';
import MoviesApiService from '../api-service/apiService';
import newStorage from '../local-storage/local-storage';
class ModalFilmCard {
  constructor() {
    this.modalRef = document.querySelector('.modal');
    this.modalBackdropeRef = document.querySelector('.modal-backdrope');
    this.modalContentRef = document.querySelector('.modal-content');
    this.moviesListRef = document.querySelector('.movies-list');
    this.drawSelectedFilm = this.drawSelectedFilm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.storageHandler = this.storageHandler.bind(this);
    this.modalCloseByEsc = this.modalCloseByEsc.bind(this);
  }
  openModal(even) {
    this.modalRef.classList.add('is-open');
    window.addEventListener('keyup', this.modalCloseByEsc);
  }
  closeModal(event) {
    this.modalRef.classList.remove('is-open');
    this.modalContentRef.innerHTML = '';
  }
  modalCloseByEsc(event) {
    if (event.code !== 'Escape') return;
    this.modalRef.classList.remove('is-open');
    this.modalContentRef.innerHTML = '';
    window.removeEventListener('keyup', this.modalCloseByEsc);
  }
  storageHandler(event) {
    const activeItem = event.target;
    console.log(event);
    if (activeItem === event.currentTarget) return;
    if (activeItem.dataset.active === 'watched') {
      newStorage.addToWatched();
      activeItem.disabled = true;
    }
    if (activeItem.dataset.active === 'queue') {
      newStorage.addToQueue();
      activeItem.disabled = true;
    }
  }
  drawSelectedFilm(event) {
    if (event.target.nodeName === 'UL') {
      return;
    }
    if (!event.target === 'IMG') {
      return;
    }
    const newApi = new MoviesApiService();
    const targetId = event.target.id;
    const contentRef = this.modalContentRef;
    const openModalInPromice = this.openModal();
    const closeModalInPromice = this.closeModal;
    const storageHandler = this.storageHandler;
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
      modalButtonsDivRef.addEventListener('click', storageHandler);
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
