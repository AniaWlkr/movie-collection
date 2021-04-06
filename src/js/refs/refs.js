export default {
  //API
  BASE_URL: 'https://api.themoviedb.org/',
  API_KEY: 'be8c1fddab60d3ca36450ce7d48f58dd',
  //insert-popular-films
  searchForm: document.querySelector('#search-form'),
  moviesRef: document.querySelector('.movies-list'),
  pagBox: document.querySelector('#pagination-box'),
  errorRef: document.querySelector('.search-error'),

  //theme
  checkbox: document.querySelector('#checkbox'),
  sunIcon: document.querySelector('#sun'),
  moonIcon: document.querySelector('#moon'),
  footer: document.querySelector('.footer'),
  modalContent: document.querySelector('.modal-content'),
  hackersModal: document.querySelector('.hackers-modal'),

  //modal-trailer
  openTrailerBtn: document.querySelector('.modal-content'),
  modalTrailer: document.querySelector('.modal-trailer'),
  modalOverlayTrailer: document.querySelector('.modal-trailer-overlay'),
  hackerModalDeveloper: document.querySelector('.hacker-modal-in-modal'),

  //filter
  genreSelector: document.querySelector('.filter-by-genre'),
  genresList: document.querySelector('.select-content'),
  filterByGenreButton: document.querySelector('.by-genre'),
};
