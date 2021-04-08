import refs from '../refs/refs';

refs.filterByGenreButton.addEventListener('click', handleGenresListOpening);
refs.filterSortByButton.addEventListener('click', handleSortBYListOpening);

function handleGenresListOpening() {
  if (refs.genresListBase.classList.contains('is-hidden')) {
    refs.genresListBase.classList.remove('is-hidden');
  } else {
    closeGenresList();
  }
}
function closeGenresList() {
  refs.genresListBase.classList.add('is-hidden');
}

function handleSortBYListOpening() {
  if (refs.sortByListBase.classList.contains('is-hidden')) {
    refs.sortByListBase.classList.remove('is-hidden');
  } else {
    closeSortByList();
  }
}
function closeSortByList() {
  refs.sortByListBase.classList.add('is-hidden');
}
