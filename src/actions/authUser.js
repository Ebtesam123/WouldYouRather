import { SET_AUTHORIZED_USER } from "./actionTypes";

export function setAuthUser(id) {
  return {
    type: SET_AUTHORIZED_USER,
    id,
  };
}
