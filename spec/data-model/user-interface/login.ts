import { by } from 'protractor';
import { Target } from 'serenity-js/lib/screenplay-protractor';

export class LoginForm {
    static Username_Field = Target.the('input').located(by.css('[name="email"]'));
    static Password_Field = Target.the('input').located(by.css('[name="password"]'));
    static Submit_Button = Target.the('button').located(by.css('.loginButton'));
}