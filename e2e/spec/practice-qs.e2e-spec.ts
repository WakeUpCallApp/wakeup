import { LoginPage, QuestionSetsPage, PracticeSessionPage } from "../pages";
import { users } from "../data/users";
import { logout } from "../tasks/logout";

describe("Practice Session page", () => {
  const loginPage = new LoginPage();
  const questionSetsPage = new QuestionSetsPage();
  const practiceSessionPage = new PracticeSessionPage();

  beforeAll(() => {
    return loginPage.doLogin(users.test);
  });
  afterAll(() => {
    return practiceSessionPage.endPracticeSession().then(() => {
      logout();
    });
  });

  it("it should be able to start a practice session for a question set", () => {
    questionSetsPage.startPracticeSession(1);
    expect(practiceSessionPage.isOpen()).toBe(true);
  });
  it("it should be able to write an answer to a question", () => {
    let questionNo = practiceSessionPage.getQuestionNo();
    expect(questionNo).toBe("1");
    const myAnswer = "test answer";
    practiceSessionPage.saveAnswer(myAnswer).then(() => {
      expect(practiceSessionPage.getQuestionNo()).toBe("2");
    });
  });
});
