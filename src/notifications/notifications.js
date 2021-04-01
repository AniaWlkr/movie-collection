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
      delay: 5000,
    });
  }

  rigistrateUser() {
    PNotify.info({
      title: 'SUCCESS',
      text: 'You are registered!',
      icon: false,
      sticker: false,
      delay: 5000,
    });
  }

  //malo simvolov
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
}
