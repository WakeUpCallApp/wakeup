import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Topic } from '../../common/models/topic.model';
import { TopicStoreService } from '../../common/store';

import AppConstants from '../../common/app-constants';

@Component({
  selector: 'wakeup-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'topics pageContent' }
})
export class TopicsComponent implements OnInit {
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
    this.router.navigate([AppConstants.routes.QUOTES, topicId]);
  }
}
