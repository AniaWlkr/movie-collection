import refs from '../refs/refs';

refs.filterByGenreButton.addEventListener('focusin', handleGenresListOpening);
refs.filterSortByButton.addEventListener('focusin', handleSortBYListOpening);
refs.sortByFilter.addEventListener('mouseenter', handleSortBYListOpening);
refs.sortByFilter.addEventListener('mouseleave', closeSortByList);
refs.genresFilter.addEventListener('mouseenter', handleGenresListOpening);
refs.genresFilter.addEventListener('mouseleave', closeGenresList);
refs.resetButton.addEventListener('focusin', event => {
  if (!refs.genresListBase.classList.contains('is-hidden')) closeGenresList();
  if (!refs.sortByListBase.classList.contains('is-hidden')) closeSortByList();
});

function handleGenresListOpening() {
  refs.genresListBase.classList.remove('is-hidden');
}
function closeGenresList() {
  refs.genresListBase.classList.add('is-hidden');
}

function handleSortBYListOpening() {
  refs.sortByListBase.classList.remove('is-hidden');
}
function closeSortByList() {
  refs.sortByListBase.classList.add('is-hidden');
}
