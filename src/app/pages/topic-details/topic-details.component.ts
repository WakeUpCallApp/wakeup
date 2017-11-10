import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostBinding,
  NgZone,
  ChangeDetectorRef,
  ApplicationRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { tap, filter, map, takeUntil, debounceTime } from 'rxjs/operators';
import appConstants from '@app/common/app-constants';
import {
  TopicStoreService,
  QuestionSetStoreService,
  Topic,
  DialogService
} from '@app/common';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  currentTopic: Topic;
  questionSets$;
  updateObject = <Topic>{ name: '', description: '' };
  isLoading$;
  private componentDestroyed = new Subject();
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
    this.isLoading$ = this.topicStoreService.isLoading$;
    this.questionSetStoreService.getAll();
    this.questionSets$ = this.questionSetStoreService.questionsSets$;

    this.route.params
      .pipe(
      map(params => params),
      tap(params => this.topicStoreService.get(params.id)),
      takeUntil(this.componentDestroyed))
      .subscribe();

    this.topicStoreService.currentTopic$
      .pipe(
      filter(currentTopic => !!currentTopic),
      takeUntil(this.componentDestroyed))
      .subscribe(currentTopic => {
        this.currentTopic = <Topic>currentTopic;
        this.titleService.setTitle(`${this.currentTopic.name} details`);
        this.updateObject = Object.assign({}, currentTopic);
      });
  }

  ngAfterViewInit() {
    if (!this.nameElRef && !this.descriptionElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      [this.nameElRef, this.descriptionElRef].forEach(field => {
        Observable.fromEvent(field.nativeElement, 'keyup')
          .pipe(
          debounceTime(1000),
          takeUntil(this.componentDestroyed)
          )
          .subscribe((keyboardEvent: any) => {
            if (keyboardEvent.keyCode === appConstants.keyCodes.TAB) {
              return;
            }
            this.updateTopic();
            this.cdref.detectChanges();
          });
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
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
