import modalCardTemplate from '../templates/modal-film-card.hbs';
import MoviesApiService from '../js/api-service/apiService';

const modalRef = document.querySelector('.modal');
const modalBackdropeRef = document.querySelector('.modal-backdrope');
const modalContentRef = document.querySelector('.modal-content');
const modalCloseButtonRef = document.querySelector('.modal-close-button');
const testModalButton = document.querySelector('.test-modal-button');
const movieItemRef = document.querySelector('.movie-item');

const newApi = new MoviesApiService();

// const testFetch = () => {
//   fetch(
//     'https://api.themoviedb.org/3/movie/550?api_key=82ebb55e4d1a1877b6dae0db2ea1f68e',
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       return modalContentRef.insertAdjacentHTML(
//         'afterbegin',
//         modalCardTemplate(data),
//       );
//     });
// };

// testFetch();
newApi.getResponseAll().then(function (answer) {
  console.log(answer);
});
// const a = newApi.getResponseInfo();
// console.log(a.then(console.log));

const openModal = event => {
  modalRef.classList.add('is-open');
  window.addEventListener('keyup', modalCloseByEsc);
};

const closeModal = event => {
  modalRef.classList.remove('is-open');
  // modalRef.innerHTML = ""
};

const modalCloseByEsc = event => {
  if (event.code !== 'Escape') return;
  modalRef.classList.remove('is-open');
  window.removeEventListener('keyup', modalCloseByEsc);
};

const drawSelectedFilm = event => {
  console.dir(event);
};

testModalButton.addEventListener('click', openModal);
modalCloseButtonRef.addEventListener('click', closeModal);
modalBackdropeRef.addEventListener('click', closeModal);
// movieItemRef.addEventListener('click', drawSelectedFilm);
