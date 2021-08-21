import {
  GET_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_QUESTION,
} from "../actions/actionTypes";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_ANSWER_TO_QUESTION:
      const { LoggedUser, Question_ID, answer } = action;

      return {
        ...state,
        [Question_ID]: {
          ...state[Question_ID],
          [answer]: {
            ...state[Question_ID][answer],
            votes: state[Question_ID][answer].votes.concat(LoggedUser),
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
