import './sass/main.scss';
import apiServise from './js/apiServise';
import pagination from './js/pagination/pagination';

apiServise('all', 1).then(({ data: { results } }) => console.log(results));
