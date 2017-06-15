import { QuestionSet, IQuestionSet, QuestionSetApi } from '../models/question-set.model';
import { Question, IQuestion, QuestionApi } from '../models/question.model';
import { Quote, QuoteApi } from '../models/quote.model';

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

    static questionToApi(question: Question) : QuestionApi {
        return {
            _id: question.id,
            text: question.text,
            date: question.date.toString(),
            questionSet: question.questionSetId,
            answers: question.answerIds
        }
    }

    static questionSetFromApi(questionSetApi: QuestionSetApi): QuestionSet {
        return new QuestionSet(questionSetApi._id,
            questionSetApi.name,
            questionSetApi.description,
            questionSetApi.user,
            questionSetApi.practiceTimes,
            questionSetApi.questions,
            questionSetApi.isDefault);
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
}