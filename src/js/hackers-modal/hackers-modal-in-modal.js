import team from './team';
import hackerCard from '../../templates/hacker-card.hbs';

const refs = {
    list: document.querySelector('.hackers-list'),
    backdrop: document.querySelector('.hacker-modal-backdrop'),
    modal: document.querySelector('.hacker-modal-in-modal'),
    closeModalBtn: document.querySelector('[data-action="hacker-cls-btn"]'),
    card: '',
}

function openCardModal(event) {
    const target = event.target;

    if(!target.classList.contains('hackers-img')) return;
    refs.backdrop.classList.remove('hide-hacker');

    const developer = team.find(dev => dev.id === Number(target.dataset.id));
    renderHackerCard(developer);
    // console.log(refs.card);
    refs.card = document.querySelector('.hacker-modal-card');
    // console.log(refs.card);
}

function closeCardModal() {
    refs.backdrop.classList.add('hide-hacker');
    cleanModal()
}

function renderHackerCard(developer) {
    return refs.modal.insertAdjacentHTML('beforeend', hackerCard(developer));
}

function cleanModal() {
    refs.modal.removeChild(refs.card)
}

refs.list.addEventListener('click', openCardModal)
refs.closeModalBtn.addEventListener('click', closeCardModal)