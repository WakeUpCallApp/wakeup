import * as questionSet from "./question-set/question-set.reducer";
import * as quote from "./quote/quote.reducer";
import * as topic from "./topic/topic.reducer";
import * as question from "./question/question.reducer";
import * as answer from "./answer/answer.reducer";

export interface AppState {
  questionSet: questionSet.State;
  quote: quote.State;
  topic: topic.State;
  question: question.State;
  answer: answer.State;
}

export const reducers = {
  questionSet: questionSet.reducer,
  quote: quote.reducer,
  topic: topic.reducer,
  question: question.reducer,
  answer: answer.reducer
};