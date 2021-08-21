import { SET_AUTHORIZED_USER } from "../actions/actionTypes";

export default function LoggedUser(state = null, action) {
  if (action.type === SET_AUTHORIZED_USER) {
    return action.id;
  }
  return state;
}
