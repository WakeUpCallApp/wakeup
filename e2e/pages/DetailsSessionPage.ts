import { Page } from './Page';
import { ElementFinder, $ } from 'protractor';

export class DetailsSessionPage extends Page {
  constructor() {
    super(`/sessionDetails`);
  }

}
