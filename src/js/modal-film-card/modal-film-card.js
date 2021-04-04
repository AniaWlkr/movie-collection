import modalCardTemplate from '../../templates/modal-film-card.hbs';
import { newApi } from '../api-service/apiService';
import newStorage from '../local-storage/local-storage';
import spinner from '../spinner';
import noImage from '../../images/movies-card/noimage.jpg';
import { onCloseTrailer } from '../modal-trailer'; 
import { updateWatched, updateQueue } from '../firebase';

const requestError = document.querySelector('.request-error');
const boxModalTrailer = document.querySelector('.modal-trailer-overlay'); //ссылка на бокс

class ModalFilmCard {
  constructor() {
    this.modalRef = document.querySelector('.modal');
    this.modalBackdropeRef = document.querySelector('.modal-backdrope');
    this.modalContentRef = document.querySelector('.modal-content');
    this.moviesListRef = document.querySelector('.movies-list');
    this.openTrailerBtn = document.querySelector('.modal-content'),

    this.drawSelectedFilm = this.drawSelectedFilm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.storageHandler = this.storageHandler.bind(this);
    this.modalCloseByEsc = this.modalCloseByEsc.bind(this);
    this.createObjForStoring = this.createObjForStoring.bind(this);
    this.cardInToObj = {};
  }
  openModal() {
    this.modalRef.classList.add('is-open');
    window.addEventListener('keyup', this.modalCloseByEsc);
  }
  closeModal() {
    this.modalRef.classList.remove('is-open');
    this.modalContentRef.innerHTML = '';
    window.removeEventListener('keyup', this.modalCloseByEsc);
  }

  modalCloseByEsc(event) {
    if (event.code !== 'Escape') return;
        //--------------------------------------закриття трейлера
    console.log(boxModalTrailer);
    if (boxModalTrailer.classList.contains('show-trailer')) {
      onCloseTrailer();
    }
    else {
      this.closeModal();
    }
  }

  storageHandler(event) {
    const activeItem = event.target;

    if (activeItem === event.currentTarget) return;

    if (activeItem.dataset.active === 'watched') {
      // updateWatched(this.cardInToObj);
      newStorage.addToWatched();
      activeItem.disabled = true; //обработка кнопки (смена текста)
    }

    if (activeItem.dataset.active === 'queue') {
      // updateQueue(this.cardInToObj);
      newStorage.addToQueue();
      activeItem.disabled = true; //обработка кнопки (смена текста)
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
  
  async getData(id) {
    try {
      const resolve = await newApi.getResponseInfo(id);
      return resolve;
    }
    catch (error) {
      return 'error';
    }
  }

  async drawSelectedFilm(event) {
    if (!event.target === 'IMG') {
      return;
    }
    spinner.showSpinner();

    const targetId = event.target.dataset.sourse;
    const contentRef = this.modalContentRef;
    
    newStorage.addMovieId = targetId;
    
    this.modalContentRef.innerHTML = '';
    
    const answer = await this.getData(targetId);

    if (answer === 'error') { 
      spinner.hideSpinner();
      requestError.classList.remove('visually-hidden');
      console.log(requestError);
      setTimeout(() => {
        requestError.classList.add('visually-hidden')
      }, 2700);
      return;
    }
    
    if (!answer.data.poster_path) {
      answer.data.poster_path = `${noImage}`;
    } else {
      answer.data.poster_path =
      'https://image.tmdb.org/t/p/w500' + answer.data.poster_path;
    }
    console.log(answer.data);
    
    const openModalInPromice = this.openModal();
    const closeModalInPromice = this.closeModal;
    const storageHandler = this.storageHandler;
    
    const newObj = this.createObjForStoring;
    newObj(answer.data);
      
    spinner.hideSpinner();

    contentRef.insertAdjacentHTML(
      'afterbegin',
      modalCardTemplate(answer.data),
    )
      
    openModalInPromice;
    const modalCloseButtonRef = document.querySelector('.modal-close-button');
    const modalButtonsDivRef = document.querySelector('.modal-button-div');
    modalCloseButtonRef.addEventListener('click', closeModalInPromice);
    modalButtonsDivRef.addEventListener('click',storageHandler);
  }
  addEventListeners() {
    this.modalBackdropeRef.addEventListener('click', this.closeModal);
    this.moviesListRef.addEventListener('click', this.drawSelectedFilm);
  }
}
const newModal = new ModalFilmCard();
newModal.addEventListeners();
// export default ModalFilmCard;
