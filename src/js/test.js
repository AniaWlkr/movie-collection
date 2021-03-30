import movieCard from '../templates/movie-card.hbs';
import modalCardTemplate from '../templates/modal-film-card.hbs';
import MoviesApiService from '../js/api-service/apiService';
import LocalStorageService from '../js/local-storage/local-storage';

const moviesApiService = new MoviesApiService();
const localStorageService = new LocalStorageService();

const refs = {
    modal: document.querySelector('.modal'),
    searchForm: document.querySelector('#search-form'),
    modalContent: document.querySelector('.modal-content'),
    modalBackdrope: document.querySelector('.modal-backdrope'),
    moviesGalleryList: document.querySelector('.movies-list'),
    modalCloseButton: document.querySelector('.modal-close-button'),
};

const closeModal = () => {
  refs.modal.classList.remove('is-open');
  refs.moviesGalleryList.removeEventListener('click', closeModal);
};

const modalCloseByEsc = (event) => {
  if (event.code !== 'Escape') return;
  refs.modal.classList.remove('is-open');
  refs.moviesGalleryList.removeEventListener('click', closeModal);
};

function onSearch(event) {
  moviesApiService.query = event.currentTarget.elements.query.value;
  moviesApiService.getResponseWord().then(({ data: { results } }) => {
    //Коррекция сделана для того чтобы обойти ошибку!!! (Денис)
    const correctData = results.filter(result => result.poster_path !== null);
    refs.moviesGalleryList.insertAdjacentHTML(
    'beforeend',
    correctData.map(query => movieCard(query)).join(''),
    );
  });
};

const openModal = (event) => {

  if (event.target.nodeName !== 'IMG') return;

  refs.modal.classList.add('is-open');

    const currentCardId = event.target.id;
    
    localStorageService.addMovieId = currentCardId;
    
    moviesApiService.getResponseInfo(currentCardId).then(({ data }) => {
    refs.modalContent.innerHTML = modalCardTemplate(data);

    refs.buttonsBox = document.querySelector('.modal-button-div');

    localStorageService.addLocalStorageListener(refs.buttonsBox);

    refs.modalCloseButton = document.querySelector('.modal-close-button')

    refs.modalCloseButton.addEventListener('click', closeModal);
  });

  window.addEventListener('keyup', modalCloseByEsc);
  refs.modalBackdrope.addEventListener('click', closeModal);
}

refs.searchForm.addEventListener('input', onSearch);
refs.moviesGalleryList.addEventListener('click', openModal);