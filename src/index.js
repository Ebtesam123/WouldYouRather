import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

const Log = (store) => (nxt) => (act) => {
  console.log("Action:", act);
  return nxt(act);
};

const store = createStore(rootReducer, applyMiddleware(thunk, Log));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default applyMiddleware(thunk, Log);
