import { protractor } from 'protractor';
import { Enter, PerformsTasks, Click, Task, Open } from 'serenity-js/protractor';

import { LoginForm } from '../user-interface/login';

export class Login implements Task {
    constructor(private name: string,
        private password: string) {
    }

    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Enter.theValue(this.name).into(LoginForm.Username_Field),
            Enter.theValue(this.password).into(LoginForm.Password_Field),
            Click.on(LoginForm.Submit_Button)
        );
    }
}
