import { groupBy, chain, toPairs, zipObject } from "lodash";

export default class Helper {
  groupAnswersByDate(answers) {
    return chain(this.sortAnswersByDate(answers))
      .groupBy("groupDay")
      .toPairs()
      .map(currentItem => {
        return zipObject(["date", "answers"], currentItem);
      })
      .value();
  }

  sortAnswersByDate(answers) {
    return answers.sort((answer1, answer2) => {
      const date1 = answer1.date;
      const date2 = answer2.date;
      if (date1 < date2) {
        return 1;
      } else if (date1 > date2) {
        return -1;
      }
      return 0;
    });
  }

  groupQuestionsByQuestionSet(questions) {
    return chain(questions.sort())
      .groupBy("questionSet")
      .toPairs()
      .map(currentItem => {
        return zipObject(["questionSet", "questions"], currentItem);
      })
      .value();
  }
}
