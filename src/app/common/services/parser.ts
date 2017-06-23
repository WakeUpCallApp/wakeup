import { QuestionSet, QuestionSetApi } from "../models/question-set.model";
import { Question, IQuestion, QuestionApi } from "../models/question.model";
import { Quote, QuoteApi } from "../models/quote.model";
import { Topic, TopicApi } from "../models/topic.model";

export default class Parser {
  static questionFromApi(questionApi: QuestionApi): Question {
    return new Question(
      questionApi._id,
      questionApi.text,
      new Date(questionApi.date),
      questionApi.questionSet,
      questionApi.answers
    );
  }

  static questionToApi(question: Question): QuestionApi {
    return {
      _id: question.id,
      text: question.text,
      date: question.date.toString(),
      questionSet: question.questionSetId,
      answers: question.answerIds
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

  static quoteFromApi(quoteApi: QuoteApi): Quote {
    return new Quote(
      quoteApi._id,
      quoteApi.text,
      quoteApi.source,
      new Date(quoteApi.date),
      quoteApi.author,
      quoteApi.topic,
      quoteApi.questions,
      quoteApi.commentList
    );
  }

  static topicFromApi(topicApi: TopicApi): Topic {
    return new Topic(
      topicApi._id,
      topicApi.title,
      topicApi.description,
      topicApi.user,
      new Date(topicApi.createDate),
      topicApi.questionSetList,
      topicApi.quoteList,
      topicApi.isDefault
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
      quoteList: topic.quoteIds,
      isDefault: topic.isDefault
    };
  }
}
