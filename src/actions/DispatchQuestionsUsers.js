import { GetUsersQuestion } from "../utils/Local_Api";
import { GetQuestions } from "../actions/questions";
import { GetUsers } from "../actions/users";

export function GetData() {
  return (dispatch) => {
    return GetUsersQuestion().then(({ users, questions }) => {
      dispatch(GetQuestions(questions));
      dispatch(GetUsers(users));
    });
  };
}
