import { Page } from "./Page";
import { element, by, ElementFinder } from "protractor";

class LoginPage extends Page {
  username: ElementFinder = element(by.css('[name="email"]'));
  password: ElementFinder = element(by.css('[name="password"]'));
  submitBtn: ElementFinder = element(by.css(".loginButton"));

  constructor() {
    super("/login/wakeupcallapp");
  }

  doLogin(user) {
    this.open();
    this.username.sendKeys(user.username);
    this.password.sendKeys(user.password);
    this.submitBtn.click();
  }
}

export { LoginPage };
