import { saveQuestionAnswer } from "../utils/Local_Api";
import { addAnswerToQuestion } from "../actions/questions";

import {
  GET_USERS,
  ADD_ANSWER_TO_USER,
  QUESTION_ADDITION_TO_USER,
} from "./actionTypes";

export function GetUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

function addAnswerToUser(LoggedUser, Question_ID, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    LoggedUser,
    Question_ID,
    answer,
  };
}

export function handleSaveQuestionAnswer(LoggedUser, Question_ID, answer) {
  return (dispatch) => {
    dispatch(addAnswerToUser(LoggedUser, Question_ID, answer));
    dispatch(addAnswerToQuestion(LoggedUser, Question_ID, answer));

    return saveQuestionAnswer(LoggedUser, Question_ID, answer);
  };
}

export function addQuestionToUser({ id, author }) {
  //console.log("Question added to user in actions");
  return {
    type: QUESTION_ADDITION_TO_USER,
    id,
    author,
  };
}
