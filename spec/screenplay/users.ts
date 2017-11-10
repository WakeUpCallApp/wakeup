import { protractor } from 'protractor';
import { Actor, BrowseTheWeb, Cast } from 'serenity-js/protractor';
export class Users implements Cast {
    actor(name: string): Actor {
        return Actor.named(name).whoCan(BrowseTheWeb.using(protractor.browser));
    }
}