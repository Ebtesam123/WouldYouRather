import { combineReducers } from "redux";
import LoggedUser from "../reducers/LoggedUser";
import questions from "../reducers/questions";
import users from "../reducers/users";

const combine = combineReducers({
  LoggedUser,
  questions,
  users,
});
export default combine;
