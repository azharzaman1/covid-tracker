import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { StateProvider } from "./Files/StateProvider";
import reducer, { initialState } from "./Files/reducer";

let RootDirectory = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  RootDirectory
);

