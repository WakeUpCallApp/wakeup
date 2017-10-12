import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ApplicationRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TopicStoreService, QuestionSetStoreService } from '../../common/store';
import { Topic } from '../../common/models/topic.model';
import { DialogService } from '../../common/services/dialog.service';
@Component({
  selector: 'wakeup-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  host: { 'class': 'pageContent' }
})
export class TopicDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  currentTopic: Topic;
  questionSets$;
  actionsSubscription: Subscription;
  topicSubscription: Subscription;
  updateObject = <Topic>{ name: '', description: '' };
  isLoading$;
  @ViewChild('nameInput') nameElRef: ElementRef;
  @ViewChild('descriptionInput') descriptionElRef: ElementRef;
  constructor(
    private topicStoreService: TopicStoreService,
    private questionSetStoreService: QuestionSetStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private appref: ApplicationRef,
    private dialogService: DialogService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .filter(params => !!params['id'])
      .map(idParams => this.topicStoreService.get(idParams['id']))
      .subscribe();

    this.topicSubscription = this.topicStoreService.currentTopic$
      .filter(currentTopic => !!currentTopic)
      .subscribe(currentTopic => {
        this.currentTopic = <Topic>currentTopic;
        this.titleService.setTitle(`${this.currentTopic.name} details`);
        this.updateObject = Object.assign({}, currentTopic);
      });

    this.isLoading$ = this.topicStoreService.isLoading$;
    this.questionSetStoreService.getAll();
    this.questionSets$ = this.questionSetStoreService.questionsSets$;

  }

  ngAfterViewInit() {
    if (!this.nameElRef && !this.descriptionElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.nameElRef.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateTopic();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.descriptionElRef.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateTopic();
          this.cdref.detectChanges();
        });
    });
  }
  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }

  updateTopic() {
    this.topicStoreService.update(this.updateObject);
  }

  associateQuestionSets(questionSetIds) {
    this.updateObject.questionSetIds = questionSetIds;
    this.updateTopic();
  }

  onDeleteTopic() {
    this.dialogService.openDialog(
      'Are you sure you want to delete this topic?',
      this.deleteTopic.bind(this)
    );
  }
  private deleteTopic() {
    this.topicStoreService.delete(this.currentTopic);
  }
}
