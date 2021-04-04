// import * as PNotify from '@pnotify/core';
import AuthNotifications from '../notifications/notifications';

const newNotification = new AuthNotifications();
const authenticationEmailRef = document.querySelector('.authentication-email');
const authenticationPasswordRef = document.querySelector(
  '.authentication-password',
);
const authenticationFormSignUpRef = document.querySelector('.sign-up'); // registration
const authenticationFormSignInRef = document.querySelector('.sign-in'); // voiti
const authenticationFormRef = document.querySelector('.authentication-form');

const modalAuthRef = document.querySelector('.modal-auth');
const modalAuthBackdropeRef = document.querySelector('.modal-auth-backdrope');
const modalAuthContentRef = document.querySelector('.modal-auth-content');
const modalAuthCloseRef = document.querySelector('.modal-auth-close-button');
const authOpenButtonRef = document.querySelector('.auth-open-modal-button');

// voiti
const requestSignIn = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB60t6UrbfMCgI7czaAVFUumbYPsz4Lbec',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    },
  ).then(response => response.json());
  // .then(answer => console.log(answer));
};

// registration
const requestSignUp = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB60t6UrbfMCgI7czaAVFUumbYPsz4Lbec',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    },
  ).then(response => response.json());
};

const registrateUser = event => {
  event.preventDefault();

  const email = authenticationEmailRef.value;
  const password = JSON.stringify(authenticationPasswordRef.value);

  requestSignUp(email, password).then(answer => {
    console.log(answer);
    if (!answer.error) {
      removeInvalidClass();
      addValidClass();
      newNotification.rigistrateUser();
      authenticationFormRef.reset();
      setTimeout(newNotification.preposeToSignIn, 4000);
    }
    if (answer.error && answer.error.message === 'INVALID_EMAIL') {
      addInvalidClass();
      newNotification.wrongEmail();
      setTimeout(removeInvalidClass, 2000);
    }
    if (answer.error && answer.error.message === 'EMAIL_EXISTS') {
      addInvalidClass();
      newNotification.emailExists();
      setTimeout(removeInvalidClass, 2000);
    }
    if (
      answer.error &&
      answer.error.message ===
        'WEAK_PASSWORD : Password should be at least 6 characters'
    ) {
      addInvalidClass();
      newNotification.weakPassword();
      setTimeout(removeInvalidClass, 2000);
    }
  });
};

const signInUser = event => {
  event.preventDefault();

  const email = authenticationEmailRef.value;
  const password = JSON.stringify(authenticationPasswordRef.value);
  requestSignIn(email, password).then(answer => {
    console.log(answer);
    if (answer.registered) {
      removeInvalidClass();
      addValidClass();
      newNotification.enterUser();
      setTimeout(closeAuthModal, 2000);
    }
    if (answer.error && answer.error.message === 'INVALID_PASSWORD') {
      addInvalidClass();
      newNotification.wrongPassword();
      setTimeout(removeInvalidClass, 2000);
    }

    if (answer.error && answer.error.message === 'EMAIL_NOT_FOUND') {
      addInvalidClass();
      newNotification.wrongLogin();
      setTimeout(removeInvalidClass, 2000);
    }
  });
};

const addValidClass = () => {
  authenticationFormRef.classList.add('valid');
};

const removeValidClass = () => {
  authenticationFormRef.reset();
  authenticationFormRef.classList.remove('valid');
};

const addInvalidClass = () => {
  authenticationFormRef.classList.add('invalid');
};

const removeInvalidClass = () => {
  authenticationFormRef.reset();
  authenticationFormRef.classList.remove('invalid');
};

const openAuthModal = event => {
  removeValidClass();
  removeInvalidClass();
  modalAuthRef.classList.add('is-open');
  window.addEventListener('keyup', modalAuthCloseByEsc);
};

const closeAuthModal = event => {
  modalAuthRef.classList.remove('is-open');
  window.removeEventListener('keyup', modalAuthCloseByEsc);
};

const modalAuthCloseByEsc = event => {
  if (event.code !== 'Escape') return;
  closeAuthModal();
};

authenticationFormSignUpRef.addEventListener('click', registrateUser);
authenticationFormSignInRef.addEventListener('click', signInUser);

modalAuthBackdropeRef.addEventListener('click', closeAuthModal);
modalAuthCloseRef.addEventListener('click', closeAuthModal);
authOpenButtonRef.addEventListener('click', openAuthModal);
