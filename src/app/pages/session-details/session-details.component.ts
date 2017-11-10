import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import {
  QuestionSetStoreService,
  AnswerStoreService,
  QuestionSet
} from '@app/common';
import appConstants from '@app/common/app-constants';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = `sessionDetails ${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  actionsSubscription: Subscription;
  sessionData$: Observable<any>;
  currentQuestionSetName: string;
  questionSetId;
  constructor(
    private questionSetStoreService: QuestionSetStoreService,
    private answerStoreService: AnswerStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.answerStoreService.openIndexedDb();

    this.sessionData$ = this.questionSetStoreService.sessionDetails$;
    this.actionsSubscription = Observable.combineLatest(
      this.route.params,
      this.answerStoreService.isIndexedDbOpen$).pipe(
      map(([params, isDbOpen]) => {
        this.currentQuestionSetName = params.questionSetName;
        this.questionSetId = +params.questionSetId;
        this.titleService.setTitle(`SessionDetails ${name}`);
        return isDbOpen;
      }),
      tap(isDbOpen => isDbOpen &&
        this.questionSetStoreService.getSessionDetails(this.questionSetId))
      ).subscribe();
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
