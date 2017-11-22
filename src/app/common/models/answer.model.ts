/* tslint:disable: member-ordering */
import { DatePipe } from "@angular/common";

export interface IAnswerApi {
  _id?: number;
  text: string;
  questionId: number;
  date;
  userId;
  local?: boolean;
}

export class Answer {
  groupDay;
  constructor(
    public id: number,
    public questionid: number,
    public text: string,
    public createDate: Date,
    public userId
  ) {
    this.groupDay = new DatePipe("en").transform(
      createDate,
      "EEEE, dd MMM yyyy"
    );
  }

  static fromApi(answer): Answer {
    return new Answer(
      answer._id,
      answer.question || (answer as any).questionId,
      answer.text,
      new Date(answer.date),
      answer.userId
    );
  }

  static toApi(answer: Answer) {
    return {
      _id: answer.id,
      local: true,
      questionId: answer.questionid,
      text: answer.text,
      date: answer.createDate.getTime(),
      userId: answer.userId
    };
  }
}
