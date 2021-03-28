import './sass/main.scss';
// import './modal_film_card/modal-film-card';
import './modal_film_card/go-up';
import './js/switch-page';
import movieCard from './templates/movie-card.hbs';
import modalCardTemplate from './templates/modal-film-card.hbs';
import MoviesApiService from './js/api-service/apiService';
import PaginationPlugin from './js/pagination/pagination';

const PagPlugin = new PaginationPlugin();
const moviesApiService = new MoviesApiService();
// moviesApiService
//   .getResponseAll()
//   .then(({ data }) => {
//       const { results, total_results } = data;
//       console.log(results);
//     PagPlugin.updateTotalResult(total_results);
//     PagPlugin.initPlugin().on('afterMove', ({ page }) => {
//       moviesApiService
//         .goToPagePopular(page)
//         .then(({ data: { results, page } }) => {
//           console.log(results);
//           console.log(page);
//         });
//     });
//   });
 
// const searchForm = document.querySelector('#search-form');
// const moviesRef = document.querySelector('.movies-list');
// searchForm.addEventListener('submit', onSearch);

// function onSearch(event) {
//     event.preventDefault();
//     moviesApiService.query = event.currentTarget.elements.query.value;
//     appendMovieMarkup(moviesApiService.query, MoviesApiService);
    
// };

// function appendMovieMarkup(query) {
//     moviesApiService.getResponseWord().then(({ data: { results } }) => {
//         moviesRef.insertAdjacentHTML('beforeend', results.map(query => movieCard(query)))
//     });
// };


// Ниже приведена разметка которую сделал сегодня! 
// Чтобы запустить надо закоментить всё что выше до const moviesApiService = new MoviesApiService();
// И раскоментировать {{!-- {{#each this}} --}} в шаблоне movie-card.hbs

const refs = {
  modal: document.querySelector('.modal'),
  searchForm: document.querySelector('#search-form'),
  modalContent: document.querySelector('.modal-content'),
  modalBackdrope: document.querySelector('.modal-backdrope'),
  moviesGalleryList: document.querySelector('.movies-list'),
  modalCloseButton: document.querySelector('.modal-close-button')
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
    const markup = movieCard(correctData);
    return refs.moviesGalleryList.innerHTML = markup;
    // return refs.moviesGalleryList.insertAdjacentHTML('beforeend', markup); - Альтернативный вариант
  });
};

const openModal = (event) => {

  if (event.target === event.currentTarget) return;

  refs.modal.classList.add('is-open');

  const currentCardId = event.target.id;

  moviesApiService.getResponseInfo(currentCardId).then(({ data }) => {
    refs.modalContent.insertAdjacentHTML('afterbegin', modalCardTemplate(data));
  });

  window.addEventListener('keyup', modalCloseByEsc);
  refs.modalBackdrope.addEventListener('click', closeModal);
  refs.modalCloseButton.addEventListener('click', closeModal);

}

refs.searchForm.addEventListener('input', onSearch);
refs.moviesGalleryList.addEventListener('click', openModal);