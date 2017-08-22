import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ApplicationRef,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import "@ngrx/core/add/operator/select";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/topic.actions";
import * as questionSetActions from "../../common/actions/question-set.actions";
import { Topic } from "../../common/models/topic.model";
import { DialogService } from "../../common/services/dialog.service";
@Component({
  selector: "wakeup-topic-details",
  templateUrl: "./topic-details.component.html",
  styleUrls: ["./topic-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  currentTopic: Topic;
  questionSets$;
  actionsSubscription: Subscription;
  topicSubscription: Subscription;
  updateObject;
  isLoading$;
  @ViewChild("nameInput") nameElRef: ElementRef;
  @ViewChild("descriptionInput") descriptionElRef: ElementRef;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private appref: ApplicationRef,
    private dialogService: DialogService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(reducers.getLoadingTopicState);
    this.store.dispatch(new questionSetActions.LoadAction());
    this.questionSets$ = this.store.select(reducers.getQuestionSetsSortedState);
    this.actionsSubscription = this.route.params
      .select<string>("id")
      .map(id => new actions.GetCurrentTopicAction(+id))
      .subscribe(this.store);

    this.topicSubscription = this.store
      .select(reducers.getCurrentTopicState)
      .subscribe(currentTopic => {
        this.currentTopic = Object.assign({}, currentTopic);
        this.updateObject = Object.assign({}, currentTopic);
        this.titleService.setTitle(`${this.currentTopic.name} details`);
        this.cdref.detectChanges();
      });
  }

  ngAfterViewInit() {
    if (!this.nameElRef && !this.descriptionElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.nameElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe(keyboardEvent => {
          this.updateTopic();
        });
      Observable.fromEvent(this.descriptionElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe(keyboardEvent => {
          this.updateTopic();
        });
    });
  }
  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }

  updateTopic() {
    this.store.dispatch(new actions.UpdateAction(this.updateObject));
  }

  associateQuestionSets(questionSetIds) {
    this.updateObject.questionSetIds = questionSetIds;
    this.updateTopic();
  }

  onDeleteTopic() {
    this.dialogService.openDialog(
      "Are you sure you want to delete this topic?",
      this.deleteTopic.bind(this)
    );
  }
  private deleteTopic() {
    this.store.dispatch(new actions.DeleteAction(this.currentTopic.id));
  }
}
