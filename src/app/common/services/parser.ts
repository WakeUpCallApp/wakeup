import * as moment from "moment";
import { QuestionSet, QuestionSetApi } from "../models/question-set.model";
import { Question, IQuestion, QuestionApi } from "../models/question.model";
import { Quote, QuoteApi } from "../models/quote.model";
import { Topic, TopicApi } from "../models/topic.model";
import { Answer, AnswerApi } from "../models/answer.model";

export default class Parser {
  static questionFromApi(questionApi: QuestionApi): Question {
    return new Question(
      questionApi._id,
      questionApi.text,
      new Date(questionApi.date),
      questionApi.answers,
      questionApi.quote
    );
  }

  static questionSummary(question) {
    return {
      id: question.id,
      questionSet: question.questionSet,
      text: question.text
    };
  }

  static questionToApi(question: Question): QuestionApi {
    const questionSet =
      question.questionSet instanceof Object
        ? (question.questionSet as QuestionSet).id
        : question.questionSet;
    return {
      _id: question.id,
      text: question.text,
      date: question.date.toString(),
      answers: question.answers,
      quote: question.quote,
      questionSet: questionSet as number
    };
  }

  static questionSetFromApi(questionSetApi: QuestionSetApi): QuestionSet {
    return new QuestionSet(
      questionSetApi._id,
      questionSetApi.name,
      questionSetApi.description,
      questionSetApi.user,
      questionSetApi.practiceTimes,
      questionSetApi.questions,
      questionSetApi.isDefault
    );
  }

  static questionSetToApi(questionSet: QuestionSet): QuestionSetApi {
    return {
      _id: questionSet.id,
      name: questionSet.name,
      description: questionSet.description,
      user: questionSet.user,
      practiceTimes: questionSet.practiceTimes,
      questions: questionSet.questions,
      isDefault: questionSet.isDefault
    };
  }

  static quoteFromApi(quoteApi: QuoteApi): Quote {
    const questions = quoteApi.questions
      ? quoteApi.questions.map(questionApi =>
          Parser.questionFromApi(questionApi)
        )
      : [];
    return new Quote(
      quoteApi._id,
      quoteApi.text,
      quoteApi.source,
      new Date(quoteApi.date),
      quoteApi.author,
      quoteApi.topic as number,
      questions,
      quoteApi.commentList
    );
  }

  static quoteToApi(quote: Quote): QuoteApi {
    return {
      _id: quote.id,
      text: quote.text,
      source: quote.source,
      date: moment(quote.date).isValid() ? quote.date.toISOString() : undefined,
      author: quote.author,
      topic: (quote.topic as Topic).id,
      questions: (quote.questions as Question[]).map(question => question.id),
      commentList: quote.commentList
    };
  }

  static topicFromApi(topicApi: TopicApi): Topic {
    return new Topic(
      topicApi._id,
      topicApi.title,
      topicApi.description,
      topicApi.user,
      new Date(topicApi.createDate),
      topicApi.questionSetList,
      topicApi.isDefault,
      topicApi.quoteList as number[]
    );
  }

  static topicToApi(topic: Topic): TopicApi {
    return {
      _id: topic.id,
      title: topic.name,
      description: topic.description,
      user: topic.user,
      createDate: topic.createDate.toString(),
      questionSetList: topic.questionSetIds,
      quoteList: (topic.quotes as Quote[]).map(quote => quote.id),
      isDefault: topic.isDefault
    };
  }

  static answerFromApi(answer: AnswerApi): Answer {
    return new Answer(
      answer._id,
      answer.question,
      answer.text,
      new Date(answer.date)
    );
  }

  static answerToApi(answer: Answer): AnswerApi {
    return {
      _id: answer.id,
      question: answer.questionid,
      text: answer.text,
      date: answer.createDate.getTime()
    };
  }
}
