const AUTHENTICATION = {
  EMAIL: "email",
  PASSWORD: "password",
  PASSWORD_AGAIN: "passwordAgain",
  EMAIL_DOES_NOT_EXIST: "e-mail address does not exist.",
  INVALID_EMAIL_FORMAT: "Invalid e-mail address format.",
  PASSWORD_IS_MANDATORY: "Password is mandatory.",
  PASSWORD_AGAIN_IS_MANDATORY: "Please enter the password again.",
  INVALID_PASSWORD_FORMAT: "Invalid password format.",
  PASSWORD_LENGTH: 8,
  MINIMUM_LENGTH:
    "Password should be of minimum " + this.PASSWORD_LENGTH + "characters.",
  INCLUDE_NUMBER: "Password should include Number [0-9]",
  INCLUDE_LOWER_CASE: "Password should include lower case character [a-z]",
  INCLUDE_UPPER_CASE: "Password should include upper case character [A-Z]",
  INCLUDE_SPECIAL_CHARACTER:
    "Password should include a special case character.",
  COULD_BE_STRING_OR_NUMBER:
    "Password could be only be characters, numbers, special characters",
  USERNAME_DOES_NOT_EXIST: "Username does not exist.",
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 25,
  INVALID_USERNAME_FORMAT:
    "Should be a string of " +
    this.USERNAME_MIN_LENGTH +
    " - " +
    this.USERNAME_MAX_LENGTH,
  EMAIL_OR_USERNAME_DOES_NOT_EXIST: "Please enter your email or username.",
  SALT_ROUNDS: 10,
  SECRET: "secretMAmba",
  EXPIRES_IN: "1m",
};

const SALT = {
  _: "SuperDuperSecretShining",
};

module.exports = { AUTHENTICATION, SALT };
