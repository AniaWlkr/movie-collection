// const { template } = require('handlebars');

import modalCardTemplate from '../templates/modal_film_card.hbs';

const modalRef = document.querySelector('.modal');
const modalBackdropeRef = document.querySelector('.modal-backdrope');
const modalContentRef = document.querySelector('.modal-content');
const modalCloseButtonRef = document.querySelector('.modal-close-button');
const testModalButton = document.querySelector('.test-modal-button');

const testFetch = () => {
  fetch(
    'https://api.themoviedb.org/3/movie/550?api_key=82ebb55e4d1a1877b6dae0db2ea1f68e',
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return modalContentRef.insertAdjacentHTML(
        'afterbegin',
        modalCardTemplate(data),
      );
    });
};

testFetch();

const openModal = event => {
  modalRef.classList.add('is-open');
};

const closeModal = event => {
  modalRef.classList.remove('is-open');
  // modalRef.innerHTML = ""
};

const modalCloseByEsc = event => {
  if (event.code !== 'Escape') return;
  modalRef.classList.remove('is-open');
};

testModalButton.addEventListener('click', openModal);
modalCloseButtonRef.addEventListener('click', closeModal);
window.addEventListener('keyup', modalCloseByEsc);
modalBackdropeRef.addEventListener('click', closeModal);
