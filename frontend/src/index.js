import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faEllipsisV,
  faPlus,
  faSpinner,
  faSearch,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import { store } from "./store";
import { loadSession } from "./features/account/accountActions";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

library.add(faEdit);
library.add(faEllipsisV);
library.add(faPlus);
library.add(faSearch);
library.add(faSpinner);
library.add(faTrash);

store.dispatch(loadSession());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
