import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/ComineReducers.js";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

const Log = (store) => (nxt) => (act) => {
  console.group(act.type);
  console.log("Action:", act);
  const result = nxt(act);
  console.log("New State: ", store.getState());
  console.groupEnd();
  return result;
};

const store = createStore(rootReducer, applyMiddleware(thunk, Log));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default applyMiddleware(thunk, Log);
