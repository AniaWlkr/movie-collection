import * as PNotify from '@pnotify/core';

export default class AuthNotifications {
  userExist() {
    PNotify.info({
      title: 'SUCH USER EXISTS',
      text: 'Try to enter different login or password.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  wrongPassword() {
    PNotify.info({
      title: 'WRONG PASSWORD',
      text: 'Try to enter different password.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  differentPasswords() {
    PNotify.info({
      title: 'DIFFERENT PASSWORDS',
      text: 'Passwords should coincide.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  wrongLogin() {
    PNotify.info({
      title: 'WRONG LOGIN',
      text: 'Try to enter different login.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  wrongUser() {
    PNotify.info({
      title: 'WRONG LOGIN OR PASSWORD',
      text: 'Try to enter different login or password.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  enterUser() {
    PNotify.info({
      title: 'SUCCESS',
      text: 'Welcome to Filmoteka!',
      icon: false,
      sticker: false,
      delay: 3000,
    });
  }

  rigistrateUser() {
    PNotify.info({
      title: 'SUCCESS',
      text: 'You are registered!',
      icon: false,
      sticker: false,
      delay: 2000,
    });
  }

  preposeToSignIn() {
    PNotify.info({
      title: 'LOG IN!',
      title: 'And now you can log into your account!',
      icon: false,
      sticker: false,
      delay: 3000,
    });
  }

  wrongEmail() {
    PNotify.info({
      title: 'INVALID EMAIL',
      text: 'Try to enter correct email.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  emailExists() {
    PNotify.info({
      title: 'SUCH EMAIL EXISTS',
      text: 'Try to enter correct email.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  weakPassword() {
    PNotify.info({
      title: 'WEAK_PASSWORD',
      text: 'Password should be at least 6 characters.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }
  errorObject() {
    PNotify.error({
      title: 'ERROR',
      text: 'There is no such object in the database, try the next movie.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }
  emptyField() {
    PNotify.error({
      title: 'SOME DATA IS MISSING',
      text: 'Please fill in all the fields.',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }
}
