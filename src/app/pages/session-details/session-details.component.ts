import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { QuestionSetStoreService, AnswerStoreService } from '../../common/store';
import { QuestionSet } from "../../common/models/question-set.model";

@Component({
  selector: "wakeup-session-details",
  templateUrl: "./session-details.component.html",
  styleUrls: ["./session-details.component.scss"],
  host: { 'class': 'sessionDetails pageContent' }
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
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
      this.route.params.filter(params => !!params["questionSetId"]),
      this.route.params.filter(params => !!params["questionSetName"]),
      this.answerStoreService.isIndexedDbOpen$,
      (idParams, nameParams, isDbOpen) => {
        this.currentQuestionSetName = nameParams["questionSetName"];
        this.questionSetId = idParams["questionSetId"];
        this.titleService.setTitle(`SessionDetails ${name}`);
        if (isDbOpen) {
          this.questionSetStoreService.getSessionDetails(parseInt(this.questionSetId));
        }
      }
    ).subscribe();
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
