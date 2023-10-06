import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../routes";
import privateRoutes from "../routes/private_routes";
import PrivateRoute from "../private_route";

const RoutedBody = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        // Render more <Route>s with the same paths as
        // above, but different components this time.
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={<route.main />}
        />
      ))}

      {/* Render Private routes here */}
      {privateRoutes.map((privateRoute, index) => (
        // Render private routes using private route component
        <PrivateRoute key={index} privateRoute={privateRoute} index={index} />
      ))}
    </Switch>
  );
};

export default RoutedBody;
