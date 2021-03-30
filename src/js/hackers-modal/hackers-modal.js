const refs = {
    openModalLink: document.querySelector('.developers-link'),
    closeModalBtn: document.querySelector('[data-action="hackers-cls-btn"]'),
    backdrop: document.querySelector('[data-hackers-backdrop]')
}


refs.openModalLink.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal(event) {
    event.preventDefault();
    refs.backdrop.classList.toggle('hide-hackers');
}