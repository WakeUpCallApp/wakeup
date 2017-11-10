import { serenity } from 'serenity-js';
import { Users } from '../../spec/screenplay/users';
describe('Practicing a question set', () => {
    const stage = serenity.callToStageFor(new Users());
    before(() => stage.theActorCalled('Alina').attemptsTo());
    it('answers a question', () => stage.theActorInTheSpotlight().attemptsTo());
    after(() => stage.theActorInTheSpotlight().attemptsTo());
});