import { BackendConstants } from './backend_constants';
import { isLoggedIn, getToken } from '../login/login_functions'

class BackendCommunicator {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/api' ;
  }

  // common fetch function accross the app.
  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    let headers = new Headers();
    // Get Locale Language if not present by defaut english is returned
    let locale = JSON.parse(localStorage.getItem(BackendConstants.LOCALE));

    headers = {
      'Content-type': BackendConstants.CONTENT_TYPE,
      'Accept-language': locale
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (isLoggedIn()) {
      headers[BackendConstants.AUTHORIZATION_STRING] =
        BackendConstants.BEARER_STRING + getToken();
    }

    return fetch(`${this.domain + url}`, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => {
        return Promise.resolve(response.json());
      });
  };

  // Check Status
  _checkStatus = response => {
    // TODO: commented code to be corrected server handling to be made.
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText); // TODO: Implement 404 !!
      error.response = response;
      return error;
    }
  };
}

export default BackendCommunicator;
