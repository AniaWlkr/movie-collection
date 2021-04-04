import axios from 'axios';
import refs from '../refs/refs';

const select = document.querySelector('#genres');

/* const selectItems = select.querySelector('option'); */

select.addEventListener('change', filterMovies);

function filterMovies() {
  const selected = select.options[select.selectedIndex];
  const selectedGenre = selected.text;
  let id;
  if (selected !== select.options[0]) {
    id = selected.dataset.id;
    console.log(getMoviesByGenre(id));
  } else return;
}

function getMoviesByGenre(id) {
  return axios.get(
    `${refs.BASE_URL}3/discover/movie?api_key=${refs.API_KEY}&language=en-US&with_genres=${id}`,
  );
}
