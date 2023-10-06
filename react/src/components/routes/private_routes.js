import React from "react";
import Accounts from "../accounts"

const privateRoutes = [
  {
    path: "/accounts",
    menuName: () => {
      return "Accounts";
    },
    main: () => <Accounts />,
  }
];

export default privateRoutes;
