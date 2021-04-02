//---Рендер карточок на сторінці(можна передавати ще селектор і виносити в компоненти або утиліти)
import movieCard from '../../templates/movie-card.hbs';
const moviesRef = document.querySelector('.movies-list');
function renderCard(arr) {
  moviesRef.innerHTML = '';
  moviesRef.insertAdjacentHTML(
    'beforeend',
    arr.map(query => movieCard(query)).join(''),
  );
}
export default renderCard;
