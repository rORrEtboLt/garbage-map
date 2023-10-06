import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { NAVIGATION } from "./navigation_constants";
import menuItems from "./menu_items";
import primateMenuItems from "./private_menu_items";
import { isLoggedIn } from "../login/login_functions";

const Navigation = () => {
  return (
    <div>
      <Menu pointing secondary size={"massive"} as={"div"} vertical>
        <Menu.Item
          exact
          as={NavLink}
          to="/"
          name={NAVIGATION.APP_NAME}
          active={false}
        />
        <Menu.Menu className="bottom aligned">
          {!isLoggedIn()
            ? menuItems.map((menuItem, index) => (
                <Menu.Item
                  key={index}
                  exact
                  name={menuItem.name}
                  as={NavLink}
                  to={menuItem.route}
                />
              ))
            : ""}
          {isLoggedIn()
            ? primateMenuItems.map((primateMenuItem, index) => (
                <Menu.Item
                  key={index}
                  exact
                  name={primateMenuItem.name}
                  as={NavLink}
                  to={primateMenuItem.route}
                />
              ))
            : ""}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Navigation;
