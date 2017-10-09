import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/question-set.actions";
import * as answerActions from '../../common/actions/answer.actions';
import { QuestionSet } from "../../common/models/question-set.model";

@Component({
  selector: "wakeup-session-details",
  templateUrl: "./session-details.component.html",
  styleUrls: ["./session-details.component.scss"]
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  sessionData$: Observable<any>;
  currentQuestionSetName: string;
  questionSetId;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.store.dispatch(new answerActions.OpenIndexedDbAction());

    this.sessionData$ = this.store.select(reducers.getSessionDetailsState);
    this.actionsSubscription = Observable.combineLatest(
      this.route.params.filter(params => !!params["questionSetId"]),
      this.route.params.filter(params => !!params["questionSetName"]),
      this.store.select(reducers.getIndexedDBState),
      (idParams, nameParams, isDbOpen) => {
        this.currentQuestionSetName = nameParams["questionSetName"];
        this.questionSetId = idParams["questionSetId"];
        this.titleService.setTitle(`SessionDetails ${name}`);
        if (isDbOpen) {
          return new actions.GetSessionDetailsAction(+this.questionSetId);
        }
        return {type:'NOT_READY'};
      }
    ).subscribe(this.store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
