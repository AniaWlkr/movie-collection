const authenticationEmailRef = document.querySelector('.authentication-email');
const authenticationPasswordRef = document.querySelector(
  '.authentication-password',
);
const authenticationFormSignUpRef = document.querySelector('.sign-up'); // registration
const authenticationFormSignInRef = document.querySelector('.sign-in'); // voiti

// voiti
const requestSignIn = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaD14Fy0lYil3onN9h16tfWhnpCdPu6S0',
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
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaD14Fy0lYil3onN9h16tfWhnpCdPu6S0',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(answer => {
      console.log(answer);
    });
};

// requestSignUp('olol@gmail.com', '123456'); exist
// requestSignIn('lena@gmail.com', '123456'); not found

const registrateUser = event => {
  event.preventDefault();

  const email = authenticationEmailRef.value;
  const password = JSON.stringify(authenticationPasswordRef.value);
  requestSignUp(email, password);
  console.log(`email: ${email}, password: ${password}`);
  console.log('zaregan!');
};

const signInUser = event => {
  event.preventDefault();

  const email = authenticationEmailRef.value;
  const password = JSON.stringify(authenticationPasswordRef.value);
  requestSignIn(email, password);
  console.log(`email: ${email}, password: ${password}`);
  console.log('voshli!');
};

authenticationFormSignUpRef.addEventListener('click', registrateUser);
authenticationFormSignInRef.addEventListener('click', signInUser);
