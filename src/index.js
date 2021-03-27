import './sass/main.scss';
import apiServise from './js/apiServise';

(apiServise('all', 1).then(({ data: { results } }) => console.log(results)));