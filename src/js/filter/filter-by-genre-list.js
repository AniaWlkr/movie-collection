import refs from '../refs/refs';

refs.filterByGenreButton.addEventListener('click', hendleGenresListOpening);
refs.filterSortByButton.addEventListener('click', hendleSortBYListOpening);

function hendleGenresListOpening() {
  if (refs.genresListBase.classList.contains('is-hidden')) {
    refs.genresListBase.classList.remove('is-hidden');
  } else {
    closeGenresList();
  }
}
function closeGenresList() {
  refs.genresListBase.classList.add('is-hidden');
}

function hendleSortBYListOpening() {
  if (refs.sortByListBase.classList.contains('is-hidden')) {
    refs.sortByListBase.classList.remove('is-hidden');
  } else {
    closeSortByList();
  }
}
function closeSortByList() {
  refs.sortByListBase.classList.add('is-hidden');
}
