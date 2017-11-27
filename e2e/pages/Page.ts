import { browser, ExpectedConditions, ElementFinder } from 'protractor';

class Page {
  route: string;

  constructor(route) {
    this.route = route;
  }

  waitForElement(element: ElementFinder) {
    browser.wait(ExpectedConditions.elementToBeClickable(element), 5000);
  }

  open() {
    browser.get(this.route);
  }

  isOpen() {
    return browser.getCurrentUrl()
      .then(url => url.indexOf(this.route) > -1);
  }
}

export { Page };
