const buttonUpRef = document.querySelector('.button-up');

const goUp = () => {
  window.scrollTo({
    top: 0,
    right: 0,
    behavior: 'smooth',
  });
};

const watchScroll = () => {
  const scroll = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scroll < coords) {
    buttonUpRef.classList.add('visually-hidden');
  }
  if (scroll > coords) {
    buttonUpRef.classList.remove('visually-hidden');
  }
};

buttonUpRef.addEventListener('click', goUp);
window.addEventListener('scroll', watchScroll);
