import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../login/login_functions";

const PrivateRoute = (props) => (
  <Route
    path={props.privateRoute.path}
    exact={props.privateRoute.exact}
    children={
      getToken() ? <props.privateRoute.main /> : <Redirect to={"/login"} />
    }
  />
);

export default PrivateRoute;
