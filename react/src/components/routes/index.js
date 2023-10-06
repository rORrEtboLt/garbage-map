import React from "react";
import SignUp from "../sign_up";
import Login from "../login"

const routes = [
  {
    path: "/",
    exact: true,
    menuName: () => {
      return "home";
    },
    main: () => <h2>Home</h2>,
  },
  {
    path: "/sign-up",
    menuName: () => {
      return "sign-up";
    },
    main: () => <SignUp />,
  },
  {
    path: "/login",
    menuName: () => {
      return "login";
    },
    main: () => <Login />,
  }
];

export default routes;
