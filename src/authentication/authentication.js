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

const URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[AIzaSyDaD14Fy0lYil3onN9h16tfWhnpCdPu6S0]';

// curl 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]'
// -H 'Content-Type: application/json'
// --data - binary '{"token":"[CUSTOM_TOKEN]","returnSecureToken":true}'

// const test = () => {
//   return axios.POST(request);
// };

// const checkUser = event => {
//   event.preventDefault();
//   const name = event.path[1][0].value;
//   const email = event.path[1][1].value;
//   const password = event.path[1][2].value;
//   console.log(email, password);
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(userCredential => {
//       console.log(userCredential);

//     })
//     .catch(error => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//     });
// };

// authenticationFormSubmitRef.addEventListener('click', checkUser);
