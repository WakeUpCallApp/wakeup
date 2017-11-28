import {
  LoginPage,
  QuestionSetsPage,
  PracticeSessionPage,
  DetailsSessionPage,
} from '../pages';
import { users } from '../data/users';
import { logout } from '../tasks/logout';

describe('Practice Session page', () => {
  const loginPage = new LoginPage();
  const questionSetsPage = new QuestionSetsPage();
  const practiceSessionPage = new PracticeSessionPage();
  const detailsSessionPage = new DetailsSessionPage();
  const myAnswer = 'test answer';

  beforeAll(async () => await loginPage.doLogin(users.test));
  afterAll(async () => logout());

  it('should be able to start a practice session for a question set', () => {
    questionSetsPage.startPracticeSession(1);
    expect(practiceSessionPage.isOpen()).toBe(true);
  });

  it('should be able to write an answer to a question', async () => {
    let questionNo = practiceSessionPage.getQuestionNo();
    expect(questionNo).toBe('1');
    await practiceSessionPage.saveAnswer(myAnswer);
    expect(practiceSessionPage.getQuestionNo()).toBe('2');
  });

  it('should be able to end the practice session', async () => {
    await practiceSessionPage.endPracticeSession();
    expect(detailsSessionPage.isOpen()).toBe(true);
  });
});
