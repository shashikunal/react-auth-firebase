import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.js";
import "./index.css";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

import App from "./App";
let RootWithAuth = withRouter(App);
ReactDOM.render(
  <Router>
    <RootWithAuth />
  </Router>,
  document.getElementById("root")
);
