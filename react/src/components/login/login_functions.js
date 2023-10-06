import { LOGIN_CONSTANTS } from "./login_constants";
import decode from 'jwt-decode';

const saveToken = (token) => {
  localStorage.setItem(LOGIN_CONSTANTS.TOKEN_NAME, token);
};

const getToken = () => {
  return localStorage.getItem(LOGIN_CONSTANTS.TOKEN_NAME);
};

const removeToken = () => {
  localStorage.removeItem(LOGIN_CONSTANTS.TOKEN_NAME);
};

const isLoggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired. N
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}

export { saveToken, getToken, removeToken, isLoggedIn, isTokenExpired};
