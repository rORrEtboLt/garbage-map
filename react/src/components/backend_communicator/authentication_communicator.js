import BackendCommunicator from ".";
import { authenticationUrls } from "./backend_urls";
import { method } from "./backend_constants";

export class AuthenticationCommunicator {
  constructor() {
    this.backendCommunicator = new BackendCommunicator();
  }

  create = (userInfo) => {
    return this.backendCommunicator.fetch(authenticationUrls.CREATE, {
      method: method.POST,
      body: JSON.stringify(userInfo),
    });
  };

  authenticate = (userInfo) => {
    return this.backendCommunicator.fetch(authenticationUrls.AUTHENTICATE, {
      method: method.POST,
      body: JSON.stringify(userInfo),
    });
  };
}
