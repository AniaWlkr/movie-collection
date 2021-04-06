import refs from '../refs/refs';

refs.filterByGenreButton.addEventListener('click', hendleListOpening);

function hendleListOpening() {
  if (refs.genresList.classList.contains('is-hidden')) {
    refs.genresList.classList.remove('is-hidden');
  } else {
    closeList();
  }
}

function closeList() {
  refs.genresList.classList.add('is-hidden');
}
