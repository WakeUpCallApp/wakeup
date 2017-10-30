import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuestionSet, QuestionSetStoreService } from '@app/common';
import appConstants from '@app/common/app-constants';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionSetsComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = appConstants.ui.PAGE_CONTAINER_CLASS;
  questionSets$: Observable<QuestionSet[]>;
  searchTerm$: Observable<string>;
  filter$: Observable<number>;
  filteredList$: Observable<QuestionSet[]>;
  isLoading$: Observable<boolean>;
  selectedFilter = this.all;
  search;

  constructor(private questionSetStoreService: QuestionSetStoreService) {
    this.questionSets$ = this.questionSetStoreService.sortedQuestionSets$;
    this.searchTerm$ = this.questionSetStoreService.searchTerm$;
    this.filter$ = this.questionSetStoreService.filter$;
    this.isLoading$ = this.questionSetStoreService.isLoading$;

    this.filteredList$ = Observable.combineLatest(
      this.questionSets$,
      this.searchTerm$,
      this.filter$,
      this.questionSetStoreService.mostPlayedQuestionSets$,
      (questionSets, searchTerm, filter, mostPlayedQuestionSets) => {
        const filteredQuestionSets = filter === this.mostPlayed
          ? mostPlayedQuestionSets
          : questionSets;

        return searchTerm
          ? filteredQuestionSets.filter(
            questionSet =>
              questionSet.name
                .toLocaleLowerCase()
                .indexOf(searchTerm.toLocaleLowerCase()) !== -1
          )
          : filteredQuestionSets;
      }
    );

  }

  get all() {
    return this.questionSetStoreService.getAllFilter();
  }

  get mostPlayed() {
    return this.questionSetStoreService.getMostPlayedFilter();
  }

  ngOnInit() {
    this.questionSetStoreService.getAll();
  }

  ngOnDestroy() {
    this.questionSetStoreService.resetSearchAndFilter();
  }

  doSearch(val) {
    this.questionSetStoreService.doSearch(val);
  }

  doFilter() {
    this.questionSetStoreService.doFilter(this.selectedFilter);
  }
}
