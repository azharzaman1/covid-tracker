import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { StateProvider } from "./Files/StateProvider";
import reducer, { initialState } from "./Files/reducer";
import * as serviceWorker from "./serviceWorker";

let RootDirectory = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  RootDirectory
);

serviceWorker.register();
