import { Page } from "./Page";
import { $ , ElementFinder } from "protractor";

export class LoginPage extends Page {
  username: ElementFinder = $('[name="email"]');
  password: ElementFinder = $('[name="password"]');
  submitBtn: ElementFinder = $(".loginButton");

  constructor() {
    super("/login/wakeupcallapp");
  }

  doLogin(user) {
    this.open();
    this.username.sendKeys(user.username);
    this.password.sendKeys(user.password);
    return this.submitBtn.click();
  }
}
