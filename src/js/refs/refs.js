export default {
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
  hackerModalDeveloper: document.querySelector('.hacker-modal-in-modal'),

  //modal-trailer
  openTrailerBtn: document.querySelector('.modal-content'),
  modalTrailer: document.querySelector('.modal-trailer'),
  modalOverlayTrailer: document.querySelector('.modal-trailer-overlay'),

  //filter
  genreSelector: document.querySelector('.filter-by-genre'),
  sortBySelector: document.querySelector('.filter-sort-by'),
  genresListBase: document.querySelector('.base-layer-for-genres'),
  sortByListBase: document.querySelector('.base-layer-sort-by'),
  genresList: document.querySelector('.select-content'),
  filterSortByButton: document.querySelector('.filter-button.sort-by'),
  filterByGenreButton: document.querySelector('.filter-button.by-genre'),
  resetButton: document.querySelector('button.reset'),
  filterContainer: document.querySelector('.filter-container'),
};
