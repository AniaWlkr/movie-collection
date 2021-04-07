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
    refs.backdrop.addEventListener('click', onBackdrop);

    const developer = team.find(dev => dev.id === Number(target.dataset.id));
    renderHackerCard(developer);
    
    refs.card = document.querySelector('.hacker-modal-card');
}

function closeCardModal() {
    refs.backdrop.classList.add('hide-hacker');
    cleanModal();
}

function onBackdrop(event) {
    if(event.target === event.currentTarget) {
        refs.backdrop.classList.add('hide-hacker');
        refs.backdrop.removeEventListener('click', onBackdrop);
        cleanModal();
    }
    
}

function renderHackerCard(developer) {
    return refs.modal.insertAdjacentHTML('beforeend', hackerCard(developer));
}

function cleanModal() {
    refs.card.remove()
    // refs.modal.removeChild(refs.card)
}

refs.list.addEventListener('click', openCardModal);
refs.closeModalBtn.addEventListener('click', closeCardModal);

export default closeCardModal;