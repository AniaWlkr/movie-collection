import './sass/main.scss';
import './modal_film_card/modal-film-card';
import './modal_film_card/go-up';
import apiServise from './js/apiServise';

(apiServise('all', 1).then(({ data: { results } }) => console.log(results)));

