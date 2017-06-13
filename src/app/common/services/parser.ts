import { QuestionSet, IQuestionSet, QuestionSetApi } from '../models/question-set.model';
import { Question, IQuestion, QuestionApi } from '../models/question.model';

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

    static questionSetFromApi(questionSetApi: QuestionSetApi): QuestionSet {
        return new QuestionSet(questionSetApi._id,
            questionSetApi.name,
            questionSetApi.description,
            questionSetApi.user,
            questionSetApi.practiceTimes,
            questionSetApi.questions,
            questionSetApi.isDefault);
    }
}