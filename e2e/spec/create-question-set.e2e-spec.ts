import {
  LoginPage,
  NewQuestionSetPage,
  QuestionSetDetailsPage,
} from '../pages';
import { users } from '../data/users';
import { logout } from '../tasks/logout';
import { goto } from '../tasks/go-to';

describe('Create Question Set page', () => {
  const loginPage = new LoginPage();
  const newQuestionSetPage = new NewQuestionSetPage();
  const questionSetDetailsPage = new QuestionSetDetailsPage();

  const qs = {
    name: 'qs',
    description: 'desc',
  };

  beforeAll(async () => {
    await loginPage.doLogin(users.test);
    goto('new question set');
  });

  afterAll(async () => logout());

  it('should create a question set successfully', async () => {
    await newQuestionSetPage.createQuestionSet(qs.name, qs.description);
    expect(questionSetDetailsPage.isOpen()).toBe(true);
    expect(questionSetDetailsPage.getName()).toBe(qs.name);
    expect(questionSetDetailsPage.getDescription()).toBe(qs.description);
  });
});
