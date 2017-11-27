import { LoginPage, QuestionSetsPage } from "../pages";
import { users } from "../data/users";

describe("Login page", () => {
  const loginPage = new LoginPage();
  const questionSetsPage = new QuestionSetsPage();

  it("should login a user and redirect to the question sets page", () => {
    loginPage.doLogin(users.test);
    expect(questionSetsPage.isOpen()).toBe(true);
  });
});
