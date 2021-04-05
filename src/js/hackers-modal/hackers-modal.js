const refs = {
    openModalLink: document.querySelector('.developers-link'),
    closeModalBtn: document.querySelector('[data-action="hackers-cls-btn"]'),
    backdrop: document.querySelector('[data-hackers-backdrop]')
}

function toggleModal(event) {
    event.preventDefault();

    refs.backdrop.classList.toggle('hide-hackers');
    window.addEventListener('keydown', onESCPress);
    refs.backdrop.addEventListener('click', onBackdrop);
}

function onESCPress(event) {
    
    if(event.code === 'Escape') {
        
        refs.backdrop.classList.add('hide-hackers');
        window.removeEventListener('keydown', onESCPress);
    }
}

function onBackdrop(event) {

    if (event.target === event.currentTarget) {

        refs.backdrop.classList.add('hide-hackers');
        refs.backdrop.removeEventListener('click', onBackdrop);
        window.removeEventListener('keydown', onESCPress);
    }
}

refs.openModalLink.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

