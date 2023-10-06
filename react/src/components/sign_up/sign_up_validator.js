import FormValidator from '../form_validator';

export const SignUpValidator = new FormValidator([
  {
    field: 'email',
    method: 'isEmail',
    validWhen: true,
    message: "Please provide a valid email address."
  },
  {
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: "Please provide your email address."
  },
  {
    field: 'username',
    method: 'isEmpty',
    validWhen: false,
    message: "Please provide your username."
  },
  {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: "Please provide your password."
  },
  {
    field: 'passwordAgain',
    method: 'isEmpty',
    validWhen: false,
    message: "Please provide your password again."
  }
]);
