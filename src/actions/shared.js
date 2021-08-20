import { getInitialData } from "../utils/Local_Api";
import { receiveQuestions } from "../actions/questions";
import { receiveUsers } from "../actions/users";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
    });
  };
}
