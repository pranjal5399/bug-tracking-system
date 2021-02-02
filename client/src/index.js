import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// axios.defaults.baseURL = "https://react-bug-tracker.herokuapp.com/api/";
axios.defaults.baseURL = "http://localhost:8080/api/";

//axios.defaults.headers.common["x-auth-token"] = token;
// let token = localStorage.getItem("auth-token");
// if (token === null) {
//   localStorage.setItem("auth-token", "");
//   token = "";
// }
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
