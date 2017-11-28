import { element, by } from 'protractor';

export function goto(where) {
  switch (where) {
    case 'new question set': {
      return element(by.css('a[routerlink="/newQuestionSet"]')).click();
    }
    case 'new topic': {
      return element(by.css('a[routerlink="/newTopic"]')).click();
    }
    case 'topics': {
      return element(by.css('a[routerlink="/topics"]')).click();
    }
  }
}
