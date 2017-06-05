import { Injectable } from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { QuestionSetService } from '../services';
import { QuestionSet } from '../models/question-set.model';

@Injectable()
export class QuestionSetDetailsResolver implements Resolve<QuestionSet> {
    constructor(private router: Router,
        private questionSetService: QuestionSetService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this.questionSetService.get(route.params.id);
    }
}