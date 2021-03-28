import './sass/main.scss';
import apiServise from './js/apiServise';
import movieCard from './templates/movie-card.hbs';

(apiServise('all', 1).then(({ data: { results } }) => console.log(results)));