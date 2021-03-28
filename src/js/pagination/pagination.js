import Pagination from 'tui-pagination';

export default class PaginationPlugin {
  constructor() {
    this.selector = document.querySelector('.pagination-wrapper');
    this.boxSelector = '';
    this.markup = '<div id="pagination-box" class="tui-pagination"></div>';
    this.activePage = 1;
    this.options = {
      totalItems: 500,
      itemsPerPage: 20,
      visiblePages: 6,

      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage:
          '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
  }
  createBox() {
    this.selector.innerHTML = '';
    this.selector.insertAdjacentHTML('beforeend', this.markup);
    this.boxSelector = this.selector.querySelector('#pagination-box');
  }
  updateTotalResult(newValue) {
    return (this.options.totalItems = newValue);
  }

  initPlugin() {
    this.createBox();
    const instance = new Pagination(this.boxSelector, this.options);
    return instance;
  }
}
