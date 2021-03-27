const buttonUpRef = document.querySelector('.button-up');

const goUp = () => {
  window.scrollTo({
    top: 0,
    right: 0,
    behavior: 'smooth',
  });
};

buttonUpRef.addEventListener('click', goUp);
