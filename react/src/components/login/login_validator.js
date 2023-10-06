import FormValidator from '../form_validator';

export const LoginValidator = new FormValidator([
  {
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: "Please provide your email address or username."
  },
  {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: "Please provide your password."
  }
]);
