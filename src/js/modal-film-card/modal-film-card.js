import modalCardTemplate from '../../templates/modal-film-card.hbs';
import MoviesApiService from '../api-service/apiService';
import onCloseTrailer from '../modal-trailer';

import newStorage from '../local-storage/local-storage';
import { updateWatched, updateQueue } from '../firebase';
class ModalFilmCard {
  constructor() {
    this.modalRef = document.querySelector('.modal');
    this.modalBackdropeRef = document.querySelector('.modal-backdrope');
    this.modalContentRef = document.querySelector('.modal-content');
    this.moviesListRef = document.querySelector('.movies-list');
    this.modalOverlayTrailer = document.querySelector('.modal-trailer-overlay');
    this.drawSelectedFilm = this.drawSelectedFilm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.storageHandler = this.storageHandler.bind(this);
    this.modalCloseByEsc = this.modalCloseByEsc.bind(this);
    this.createObjForStoring = this.createObjForStoring.bind(this);
    this.cardInToObj = {};
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

    if (this.modalOverlayTrailer.classList.contains('show-trailer')) {
      onCloseTrailer();
      return;
    }
    this.modalRef.classList.remove('is-open');
    this.modalContentRef.innerHTML = '';
    window.removeEventListener('keyup', this.modalCloseByEsc);
  }

  storageHandler(event) {
    const activeItem = event.target;

    if (activeItem === event.currentTarget) return;

    if (activeItem.dataset.active === 'watched') {
      updateWatched(this.cardInToObj);
      // newStorage.addToWatched();
      activeItem.disabled = true;
    }

    if (activeItem.dataset.active === 'queue') {
      updateQueue(this.cardInToObj);
      // newStorage.addToQueue();
      activeItem.disabled = true;
    }
  }

  createObjForStoring(data) {
    this.cardInToObj.homepege = data.homepage;
    this.cardInToObj.poster_path = data.poster_path;
    this.cardInToObj.original_title = data.original_title;
    this.cardInToObj.vote_average = data.vote_average;
    this.cardInToObj.vote_count = data.vote_count;
    this.cardInToObj.vote_count = data.vote_count;
    this.cardInToObj.popularity = data.popularity;
    this.cardInToObj.genres = data.genres;
    this.cardInToObj.name = data.name;
  }

  drawSelectedFilm(event) {
    if (event.target.nodeName === 'UL') {
      return;
    }
    if (!event.target === 'IMG') {
      return;
    }

    const newApi = new MoviesApiService();

    const checkTargetElements = event.path.find(
      element => element.nodeName === 'LI',
    );
    const targetId = checkTargetElements.dataset.sourse;

    const contentRef = this.modalContentRef;
    const openModalInPromice = this.openModal();
    const closeModalInPromice = this.closeModal;
    const storageHandler = this.storageHandler;
    const newObj = this.createObjForStoring;
    newStorage.addMovieId = targetId;
    const modalButtonsDivRefPromice = this.modalButtonsDivRef;
    this.modalContentRef.innerHTML = '';

    newApi.getResponseInfo(targetId).then(function (answer) {
      newObj(answer.data);
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
