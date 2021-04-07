import team from './team';
import hackerCard from '../../templates/hacker-card.hbs';

let developerId = 0;
const refs = {
  list: document.querySelector('.hackers-list'),
  backdrop: document.querySelector('.hacker-modal-backdrop'),
  modal: document.querySelector('.hacker-modal-in-modal'),
  closeModalBtn: document.querySelector('[data-action="hacker-cls-btn"]'),
  wrapper: document.querySelector('.hacker-modal-card-wrapper'),
  card: '',
};

function openCardModal(event) {
  const target = event.target;

  if (!target.classList.contains('hackers-img')) return;
  refs.backdrop.classList.remove('hide-hacker');
  refs.backdrop.addEventListener('click', onBackdrop);
  window.addEventListener('keydown', onPressArrowRight);
  window.addEventListener('keydown', onPressArrowLeft);

  const developer = team.find(dev => dev.id === Number(target.dataset.id));
  renderHackerCard(developer);

  refs.card = document.querySelector('.hacker-modal-card');

  developerId = Number(refs.card.dataset.id);
}

function closeCardModal() {
  refs.backdrop.classList.add('hide-hacker');
  window.removeEventListener('keydown', onPressArrowLeft);
  window.removeEventListener('keydown', onPressArrowRight);
  cleanModal();
}

function onBackdrop(event) {
  if (event.target === event.currentTarget) {
    refs.backdrop.classList.add('hide-hacker');
    refs.backdrop.removeEventListener('click', onBackdrop);
    window.removeEventListener('keydown', onPressArrowLeft);
    window.removeEventListener('keydown', onPressArrowRight);
    cleanModal();
  }
}

function renderHackerCard(developer) {
  return refs.wrapper.insertAdjacentHTML('beforeend', hackerCard(developer));
}

function cleanModal() {
  refs.wrapper.innerHTML = '';
  // refs.card.remove()
  // refs.modal.removeChild(refs.card)
}

function onPressArrowLeft(event) {
  if (event.code === 'ArrowLeft') {
    developerId = developerId - 1;
    if (developerId < 1) {
      developerId = 9;
    }
    cleanModal();
    const prevDeveloper = team.find(dev => dev.id === developerId);
    renderHackerCard(prevDeveloper);
  }
}

function onPressArrowRight(event) {
  if (event.code === 'ArrowRight') {
    developerId = developerId + 1;
    if (developerId > 9) {
      developerId = 1;
    }
    // let currentId = +refs.card.dataset.id;
    cleanModal();
    const nextDeveloper = team.find(dev => dev.id === developerId);
    renderHackerCard(nextDeveloper);
  }
}

refs.list.addEventListener('click', openCardModal);
refs.closeModalBtn.addEventListener('click', closeCardModal);

export default closeCardModal;
