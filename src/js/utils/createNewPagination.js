//create new Pagination
import defOptions from '../pagination/paginationOptions';
const { options } = defOptions;
import Pagination from 'tui-pagination';
const pagWrapper = document.querySelector('.pagination-wrapper');
export default function createNewPaginator() {
  pagWrapper.innerHTML = '';
  pagWrapper.innerHTML =
    '<div id="pagination-box" class="tui-pagination"></div>';
  const pagBox = document.querySelector('#pagination-box');
  const PaginationPlugin = new Pagination(pagBox, options);
  return { pagBox, PaginationPlugin };
}
