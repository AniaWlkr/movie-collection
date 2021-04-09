import settings from '../settings/firebase-settings';
const { BASE_URL, API_KEY } = settings;
import AuthNotifications from '../notifications/notifications';
const newNotification = new AuthNotifications();
import newFireBase from '../api-service/fireBaseService';
import refs from '../refs/refs';
//---------------------------------Додатковий функціонал
const filterBox = document.querySelector('.filter-container');
const libraryRef = document.querySelector(
  '.navigation-link[data-state="library"]',
);
import { renderAndPaginationPopularMovies } from '../insert_popular_films';
//---------------------------------

const refs1 = {
  controls: document.querySelector('[data-controls]'),
  panes: document.querySelector('[data-panes]'),
};
let userID = null;

const authOpenButtonRef = document.querySelector('.auth-open-modal-button');
const modalAuthRef = document.querySelector('.modal-auth');
const modalAuthBackdropeRef = document.querySelector('.modal-auth-backdrope');
// registration refs
const signUpFormRef = document.querySelector('.sign-up-form');
const signUpMailRef = document.querySelector('.sign-up-form .email');
const signUpPwdRef = document.querySelector('.sign-up-form .password');
const signUpPwdRepeatRef = document.querySelector(
  '.sign-up-form .password-repeat',
);
// sign-in refs
const signInFormRef = document.querySelector('.sign-in-form');
const signInMailRef = document.querySelector('.sign-in-form .email');
const signInPwdRef = document.querySelector('.sign-in-form .password');
const signInTabRef = document.querySelector('.sign-in-tab');

refs1.controls.addEventListener('click', event => {
  event.preventDefault();
  const controlItem = event.target;
  if (controlItem.nodeName !== 'A') return;

  const currentActiveControlsItem = refs1.controls.querySelector(
    '.controls__item--active',
  );
  controlTabToggle(controlItem);
});

function controlTabToggle(controlItem) {
  const currentActiveControlsItem = refs1.controls.querySelector(
    '.controls__item--active',
  );

  if (currentActiveControlsItem) {
    currentActiveControlsItem.classList.remove('controls__item--active');
    currentActiveControlsItem.classList.add('controls__item--inactive');
    const paneId = getPaneId(currentActiveControlsItem);
    const pane = getPaneById(paneId);
    pane.classList.toggle('pane--active');
  }

  controlItem.classList.remove('controls__item--inactive');
  controlItem.classList.add('controls__item--active');

  const paneId = getPaneId(controlItem);

  const currentActivePane = refs1.panes.querySelector('.pane--active');
  if (currentActivePane) {
    currentActivePane.classList.remove('pane--active');
  }

  const pane = getPaneById(paneId);
  pane.classList.add('pane--active');
}

function getPaneId(control) {
  return control.getAttribute('href').slice(1);
}

function getPaneById(id) {
  return refs1.panes.querySelector(`#${id}`);
}

// voiti
const requestSignIn = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return fetch(`${BASE_URL}accounts:signInWithPassword?key=${API_KEY}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  }).then(response => response.json());
};

// registration
const requestSignUp = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return fetch(`${BASE_URL}accounts:signUp?key=${API_KEY}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  }).then(response => response.json());
  // .then(answer => console.log(answer));//ошибка реєстрації
};

const registerUser = event => {
  event.preventDefault();

  if (signUpFormRef.password.value !== signUpFormRef.repeatPassword.value) {
    addInvalidClass(signUpPwdRef);
    addInvalidClass(signUpPwdRepeatRef);
    newNotification.differentPasswords();
    setTimeout(() => {
      signUpFormRef.reset();
      removeInvalidClass(signUpPwdRef);
      removeInvalidClass(signUpPwdRepeatRef);
    }, 2500);
    return;
  }

  const email = signUpMailRef.value;
  const password = JSON.stringify(signUpPwdRef.value);

  requestSignUp(email, password).then(answer => {
    // console.log(answer);
    if (!answer.error) {
      newNotification.rigistrateUser();
      signUpFormRef.reset();
      controlTabToggle(signInTabRef);
      setTimeout(newNotification.preposeToSignIn, 4000);
    }
    if (answer.error && answer.error.message === 'INVALID_EMAIL') {
      addInvalidClass(signUpMailRef);
      newNotification.wrongEmail();
      setTimeout(() => {
        removeInvalidClass(signUpMailRef);
      }, 2000);
    }
    if (answer.error && answer.error.message === 'EMAIL_EXISTS') {
      addInvalidClass(signUpMailRef);
      newNotification.emailExists();
      setTimeout(() => {
        removeInvalidClass(signUpMailRef);
      }, 2000);
    }
    if (
      answer.error &&
      answer.error.message ===
        'WEAK_PASSWORD : Password should be at least 6 characters'
    ) {
      addInvalidClass(signUpPwdRef);
      addInvalidClass(signUpPwdRepeatRef);
      newNotification.weakPassword();
      setTimeout(() => {
        signUpFormRef.reset();
        removeInvalidClass(signUpPwdRef);
        removeInvalidClass(signUpPwdRepeatRef);
      }, 2500);
    }
  });
};

const signInUser = event => {
  event.preventDefault();

  const email = signInMailRef.value;
  const password = JSON.stringify(signInPwdRef.value);
  //зареєстрований користувач на тестову БД
  /*const email = 'hasker1@gmail.com';
  let password = JSON.stringify('123456Qq');*/

  requestSignIn(email, password).then(answer => {
    if (answer.registered) {
      newNotification.enterUser();
      localStorage.setItem('token', answer.idToken);
      newFireBase.userId = answer.localId;
      setTimeout(closeAuthModal, 400);
      setTimeout(() => {
        // filterBox.classList.remove('visually-hidden');
        libraryRef.classList.remove('visually-hidden');
        authOpenButtonRef.textContent = 'SIGN-OUT';
        localStorage.setItem('page', 1); //-перехід на першу сторінку
        renderAndPaginationPopularMovies();
      }, 550); //change icon 'Log-In' & unblock Library
      //Зайшли в акаунт
    }
    if (answer.error && answer.error.message === 'INVALID_PASSWORD') {
      addInvalidClass(signInPwdRef);
      newNotification.wrongPassword();
      setTimeout(() => {
        removeInvalidClass(signInPwdRef);
      }, 2500);
    }
    if (answer.error && answer.error.message === 'EMAIL_NOT_FOUND') {
      addInvalidClass(signInMailRef);
      newNotification.wrongLogin();
      setTimeout(() => {
        removeInvalidClass(signInMailRef);
      }, 2500);
    }
  });
};

const addInvalidClass = elem => {
  elem.classList.add('invalid');
};

const removeInvalidClass = elem => {
  elem.classList.remove('invalid');
};

const openAuthModal = event => {
  if (authOpenButtonRef.textContent === 'SIGN-OUT') {
    authOpenButtonRef.textContent = 'SIGN-IN';
    newFireBase.signOut();
    signInFormRef.reset();
    //чистим таби і перехід на home
    refs.moviesRef.innerHTML = '';
    refs.header.classList.add('header');
    refs.header.classList.remove('header-library');
    refs.searchForm.classList.remove('is-hidden');
    refs.tabs.classList.add('is-hidden');
    const navListRef = document.querySelector('.navigation-list');
    navListRef.firstElementChild.firstElementChild.classList.add('current');
    navListRef.lastElementChild.lastElementChild.classList.remove('current');
    localStorage.setItem('page', 1); //-перехід на першу сторінку
    renderAndPaginationPopularMovies();
    return;
  } //виходим з користувача
  modalAuthRef.classList.add('is-open');
  document.body.classList.add('no-scroll');
  window.addEventListener('keyup', modalAuthCloseByEsc);
};

const closeAuthModal = event => {
  modalAuthRef.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  window.removeEventListener('keyup', modalAuthCloseByEsc);
  signUpFormRef.reset();
  signInFormRef.reset();
};

const closeAuthModalOnOverlay = event => {
  if (event.target === event.currentTarget) {
    closeAuthModal();
  }
};

const modalAuthCloseByEsc = event => {
  if (event.code !== 'Escape') return;
  closeAuthModal();
};

signUpFormRef.addEventListener('submit', registerUser);
signInFormRef.addEventListener('submit', signInUser);

modalAuthBackdropeRef.addEventListener('click', closeAuthModalOnOverlay);
authOpenButtonRef.addEventListener('click', openAuthModal);

export default userID;
