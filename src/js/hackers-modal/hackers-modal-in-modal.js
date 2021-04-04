import team from './team';
import hackerCard from '../../templates/hacker-card.hbs';

const refs = {
    list: document.querySelector('.hackers-list'),
    backdrop: document.querySelector('.hacker-modal-backdrop'),
    closeModalBtn: document.querySelector('[data-action="hacker-cls-btn"]'),
}

function openCardModal(event) {
    const target = event.target;
    if(!target.classList.contains('hackers-img')) return;
    refs.backdrop.classList.remove('hide-hacker');
    console.log(target);
}

function closeCardModal() {
    refs.backdrop.classList.add('hide-hacker');
}

refs.list.addEventListener('click', openCardModal)
refs.closeModalBtn.addEventListener('click', closeCardModal)