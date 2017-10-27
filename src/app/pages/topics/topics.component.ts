import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TopicStoreService, Topic } from '@app/common';
import appConstants from '@app/common/app-constants';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = `topics ${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  topics$: Observable<Topic[]>;
  searchTerm$: Observable<string>;
  filteredList$: Observable<Topic[]>;
  search: string;
  isLoading$;
  constructor(private topicStoreService: TopicStoreService, private router: Router) {
    this.isLoading$ = this.topicStoreService.isLoading$;
    this.topics$ = this.topicStoreService.sortedTopics$;
    this.searchTerm$ = this.topicStoreService.searchTerm$;
    this.filteredList$ = Observable.combineLatest(
      this.topics$,
      this.searchTerm$,
      (topics, searchTerm) => {
        return searchTerm
          ? topics.filter(
            topic =>
              topic.name
                .toLocaleLowerCase()
                .indexOf(searchTerm.toLocaleLowerCase()) !== -1
          )
          : topics;
      }
    );
  }

  ngOnInit() {
    this.topicStoreService.getAll();
  }

  ngOnDestroy() {
    this.doSearch(undefined);
  }

  doSearch(val) {
    this.topicStoreService.doSearch(val);
  }

  goToQuotes(e, topicId: number) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.router.navigate([appConstants.routes.QUOTES, topicId]);
  }
}
