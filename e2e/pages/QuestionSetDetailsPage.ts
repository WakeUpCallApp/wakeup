import { Page } from './Page';
import { $, ElementFinder } from 'protractor';

export class QuestionSetDetailsPage extends Page {
  name = $('[name="name"]');
  description = $('[name="description"]');

  constructor() {
    super('/questionSetDetails');
  }
  async getName() {
    return await this.name.getAttribute('value');
  }

  async getDescription() {
    return await this.description.getAttribute('value');
  }
}
