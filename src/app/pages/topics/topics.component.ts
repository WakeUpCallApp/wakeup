import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Topic } from '../../common/models/topic.model';
import * as reducers from '../../common/reducers';
import * as actions from '../../common/actions/topic.actions';
import { Observable } from 'rxjs/Observable';
import AppConstants from '../../common/app-constants';

@Component({
  selector: 'wakeup-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent implements OnInit {
  topics$: Observable<Topic[]>;
  searchTerm$: Observable<string>;
  filteredList$: Observable<Topic[]>;
  search: string;
  isLoading$;
  constructor(private store: Store<reducers.State>, private router: Router) {
    this.isLoading$ = store.select(reducers.getLoadingTopicState);
    this.topics$ = store.select(reducers.getTopicsSortedState);
    this.searchTerm$ = store.select(reducers.getTopicSearchTerm);
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
    this.store.dispatch(new actions.LoadAction());
  }

  doSearch(val) {
    this.store.dispatch(new actions.SearchAction(val));
  }

  goToQuotes(e, topicId: number) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.router.navigate([AppConstants.routes.QUOTES, topicId]);
  }
}
