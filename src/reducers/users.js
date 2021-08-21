import {
  GET_USERS,
  ADD_ANSWER_TO_USER,
  QUESTION_ADDITION_TO_USER,
} from "../actions/actionTypes";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_TO_USER:
      const { LoggedUser, Question_ID, answer } = action;

      return {
        ...state,
        [LoggedUser]: {
          ...state[LoggedUser],
          answers: {
            ...state[LoggedUser].answers,
            [Question_ID]: answer,
          },
        },
      };
    case QUESTION_ADDITION_TO_USER:
      const { id, author } = action;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id),
        },
      };
    default:
      return state;
  }
}
