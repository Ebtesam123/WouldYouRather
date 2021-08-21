import { saveQuestion } from "../utils/Local_Api";
import { addQuestionToUser } from "../actions/users";
import {
  GET_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_QUESTION,
} from "./actionTypes";

export function GetQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function addAnswerToQuestion(LoggedUser, Question_ID, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    LoggedUser,
    Question_ID,
    answer,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}
