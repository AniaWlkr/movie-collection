import modalCardTemplate from '../../templates/modal-film-card.hbs';
import { newApi } from '../api-service/apiService';
import newStorage from '../local-storage/local-storage';
import spinner from '../spinner';
import noImage from '../../images/movies-card/noimage.jpg';
import onCloseTrailer from '../modal-trailer';
import { refreshLibrary } from '../switch-page';

const requestError = document.querySelector('.request-error');
const boxModalTrailer = document.querySelector('.modal-trailer-overlay'); //ссылка на бокс
const headerRef = document.querySelector('.header'); // Добавил Денис для функции refreshLibrary

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
  }
  openModal() {
    this.modalRef.classList.add('is-open');
    window.addEventListener('keyup', this.modalCloseByEsc);
  }

  closeModal() {
    this.modalRef.classList.remove('is-open');
    this.modalContentRef.innerHTML = '';
    window.removeEventListener('keyup', this.modalCloseByEsc);
    refreshLibrary(headerRef); // Добавил Денис
  }

  modalCloseByEsc(event) {
    if (event.code !== 'Escape') return;
    if (this.modalOverlayTrailer.classList.contains('show-trailer')) {
      onCloseTrailer();
      return;
    }
    this.closeModal();
  }

  storageHandler(event) {
    const activeItem = event.target;
    const movieId = activeItem.dataset.sourse;

    if (activeItem === event.currentTarget) return;

    if (activeItem.dataset.active === 'watched') {
      if (activeItem.classList.contains('add')) {
        newStorage.addToWatched();
        this.toggleClasses(activeItem, 'add', 'remove');
        activeItem.textContent = 'Remove from Watched';
      } else {
        newStorage.removeMovieFromWatched();
        this.toggleClasses(activeItem, 'remove', 'add');
        activeItem.textContent = 'Add to Watched';
      }
    }

    if (activeItem.dataset.active === 'queue') {
      if (activeItem.classList.contains('add')) {
        newStorage.addToQueue();
        this.toggleClasses(activeItem, 'add', 'remove');
        activeItem.textContent = 'Remove from Queue';
      } else {
        newStorage.removeMovieFromQueue();
        this.toggleClasses(activeItem, 'remove', 'add');
        activeItem.textContent = 'Add to Queue';
      }
    }
  }

  toggleClasses(element, classToRemove, classToAdd) {
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
  }

  async getData(id) {
    try {
      const resolve = await newApi.getResponseInfo(id);
      return resolve;
    } catch (error) {
      return 'error';
    }
  }

  async drawSelectedFilm(event) {
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    spinner.showSpinner();

    const targetId = event.target.dataset.sourse;
    const isInQueue = newStorage.checkCurrentMovieInQueueList(targetId);
    const isInWatched = newStorage.checkCurrentMovieInWatchedList(targetId);
    const contentRef = this.modalContentRef;

    this.modalContentRef.innerHTML = '';

    const answer = await this.getData(targetId);
    newStorage.addMovieObj = newApi.movie;

    if (answer === 'error') {
      spinner.hideSpinner();
      requestError.classList.remove('visually-hidden');
      // console.log(requestError);
      setTimeout(() => {
        requestError.classList.add('visually-hidden');
      }, 2700);
      return;
    }

    if (!answer.poster_path) {
      answer.poster_path = `${noImage}`;
    } else if (answer.poster_path.length > 32) {
      answer.poster_path = answer.poster_path;
    } else {
      answer.poster_path =
        'https://image.tmdb.org/t/p/w500' + answer.poster_path;
    }

    const closeModalInPromice = this.closeModal;
    const storageHandler = this.storageHandler;

    spinner.hideSpinner();
    const modalMarkUp = modalCardTemplate(answer);
    contentRef.insertAdjacentHTML('afterbegin', modalCardTemplate(answer));
    const queueBtnRef = document.querySelector('button[data-active="queue"]');
    const watchedBtnRef = document.querySelector(
      'button[data-active="watched"]',
    );

    if (isInQueue) {
      queueBtnRef.textContent = 'Remove from Queue';
      queueBtnRef.classList.remove('add');
      queueBtnRef.classList.add('remove');
    }
    if (isInWatched) {
      watchedBtnRef.textContent = 'Remove from Watched';
      watchedBtnRef.classList.remove('add');
      watchedBtnRef.classList.add('remove');
    }

    this.openModal();
    const modalCloseButtonRef = document.querySelector('.modal-close-button');
    const modalButtonsDivRef = document.querySelector('.modal-button-div');
    modalCloseButtonRef.addEventListener('click', closeModalInPromice);
    modalButtonsDivRef.addEventListener('click', storageHandler);
  }
  addEventListeners() {
    this.modalBackdropeRef.addEventListener('click', this.closeModal);
    this.moviesListRef.addEventListener('click', this.drawSelectedFilm);
  }
}

const newModal = new ModalFilmCard();
newModal.addEventListeners();
// export default ModalFilmCard;
