import settings from '../settings/firebase-settings';
const { BASE_URL, API_KEY } = settings;
import AuthNotifications from '../notifications/notifications';
const newNotification = new AuthNotifications();
import newFireBase from '../api-service/fireBaseService';
//---------------------------------Додатковий функціонал
const filterBox = document.querySelector('.filter-container');
const libraryRef = document.querySelector(
  '.navigation-link[data-state="library"]',
);
import { renderAndPaginationPopularMovies } from '../insert_popular_films';
//---------------------------------

const refs = {
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

refs.controls.addEventListener('click', event => {
  event.preventDefault();
  const controlItem = event.target;
  if (controlItem.nodeName !== 'A') return;

  const currentActiveControlsItem = refs.controls.querySelector(
    '.controls__item--active',
  );

  if (currentActiveControlsItem) {
    currentActiveControlsItem.classList.remove('controls__item--active');
    const paneId = getPaneId(currentActiveControlsItem);
    const pane = getPaneById(paneId);
    pane.classList.toggle('pane--active');
  }

  controlItem.classList.add('controls__item--active');

  const paneId = getPaneId(controlItem);

  const currentActivePane = refs.panes.querySelector('.pane--active');
  if (currentActivePane) {
    currentActivePane.classList.remove('pane--active');
  }

  const pane = getPaneById(paneId);
  pane.classList.add('pane--active');
});

function getPaneId(control) {
  return control.getAttribute('href').slice(1);
}

function getPaneById(id) {
  return refs.panes.querySelector(`#${id}`);
}

// voiti
const requestSignIn = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return fetch(
    `${BASE_URL}accounts:signInWithPassword?key=${API_KEY}`, // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB60t6UrbfMCgI7czaAVFUumbYPsz4Lbec',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    },
  ).then(response => response.json());
};

// registration
const requestSignUp = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return fetch(
    `${BASE_URL}accounts:signUp?key=${API_KEY}`, //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB60t6UrbfMCgI7czaAVFUumbYPsz4Lbec',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    },
  ).then(response => response.json());
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
      // authenticationFormRef.reset();
      signUpFormRef.reset();
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
      newFireBase.userID = answer.localId;
      setTimeout(closeAuthModal, 1000); //change icon 'Log-In' & unblock Library
      //Зайшли в акаунт
      filterBox.classList.remove('visually-hidden');
      libraryRef.classList.remove('visually-hidden');
      authOpenButtonRef.textContent = 'SIGN-OUT';
      signInFormRef.reset();
      localStorage.setItem('page', 1); //-перехід на першу сторінку
      renderAndPaginationPopularMovies();
    }
    if (answer.error && answer.error.message === 'INVALID_PASSWORD') {
      addInvalidClass(signInPwdRef);
      newNotification.wrongPassword();
      setTimeout(() => {
        signInFormRef.reset();
        removeInvalidClass(signInPwdRef);
      }, 2500);
    }
    if (answer.error && answer.error.message === 'EMAIL_NOT_FOUND') {
      addInvalidClass(signInMailRef);
      newNotification.wrongLogin();
      setTimeout(() => {
        signInFormRef.reset();
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
    return;
  } //виходим з користувача
  modalAuthRef.classList.add('is-open');
  window.addEventListener('keyup', modalAuthCloseByEsc);
};

const closeAuthModal = event => {
  modalAuthRef.classList.remove('is-open');
  window.removeEventListener('keyup', modalAuthCloseByEsc);
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
