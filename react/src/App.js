import React from "react";
import "semantic-ui-less/semantic.less";
import { HashRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Navigation from "./components/navigation";
import AppBody from "./components/app_body";
import "./app.css";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  return (
    <HashRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="ui grid">
          <div className="three wide column">
            <Navigation />
          </div>
          <div className="thirteen wide column">
            <AppBody />
          </div>
        </div>
      </AlertProvider>
    </HashRouter>
  );
}

export default App;
