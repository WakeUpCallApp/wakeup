import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QuestionSet } from '../../common/models/question-set.model';
import { Observable } from 'rxjs/Observable';
import { QuestionSetStoreService } from '../../common/store';

@Component({
  selector: 'wakeup-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'pageContent' }
})
export class QuestionSetsComponent implements OnInit {
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

    this.filteredList$ = Observable.combineLatest(
      this.questionSets$,
      this.searchTerm$,
      this.filter$,
      (questionSets, searchTerm, filter) => {
        const filteredQuestionSets = filter === this.mostPlayed
          ? questionSets.filter(questionSet => questionSet.practiceTimes > 0)
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
    this.isLoading$ = this.questionSetStoreService.isLoading$;
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
