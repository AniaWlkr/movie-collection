// import firebase from 'firebase/auth';
// import 'firebase/firestore';
import firebase from 'firebase/app';

const authenticationEmailRef = document.querySelector('.authentication-email');
const authenticationPasswordRef = document.querySelector(
  '.authentication-password',
);
const authenticationFormNameRef = document.querySelector(
  '.authentication-name',
);
const authenticationFormSubmitRef = document.querySelector(
  '.authentication-form-submit',
);

const checkUser = event => {
  event.preventDefault();
  const name = event.path[1][0].value;
  const email = event.path[1][1].value;
  const password = event.path[1][2].value;
  console.log(email, password);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log(userCredential);
      // Signed in
      // var user = userCredential.user;
      // ...
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};

authenticationFormSubmitRef.addEventListener('click', checkUser);
