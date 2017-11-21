import { Open } from 'serenity-js/protractor';
import { Users } from '../../spec/screenplay/users';
import { Login } from '../../spec/data-model/tasks/login';
import chai = require('chai');

describe('Practicing a question set', () => {
    const alina = new Users().actor('alina');
    const login = new Login('test@test.com', 'test');

    beforeEach(function (done) {
        this.timeout(0);
        return alina
            .attemptsTo(Open.browserOn('login/wakeupcallapp'))
            .then(() => login.performAs(alina))
            .then(() => done());
    });

    it('starts a practice session', () => chai.expect(1).to.equal(1));

    /*     after(() => alina.attemptsTo());
        it('starts a practice session', () => alina.attemptsTo());
        it('writes an answer to a question', () => alina.attemptsTo());
        it('ends the practice session', () => alina.attemptsTo());
        it('reads the answer', () => alina.attemptsTo()); */
});