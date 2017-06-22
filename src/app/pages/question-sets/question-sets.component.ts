import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { QuestionSet } from "../../common/models/question-set.model";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/question-set.actions";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "wakeup-question-sets",
  templateUrl: "./question-sets.component.html",
  styleUrls: ["./question-sets.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionSetsComponent implements OnInit {
  questionSets$: Observable<QuestionSet[]>;
  searchTerm$: Observable<string>;
  filter$: Observable<number>;
  filteredList$: Observable<QuestionSet[]>;
  isLoading$: Observable<boolean>;
  selectedFilter = this.all;
  search;

  constructor(private store: Store<reducers.State>) {
    this.questionSets$ = store.select(reducers.getQuestionSetsSortedState);
    this.searchTerm$ = store.select(reducers.getQuestionSetSearchTerm);
    this.filter$ = store.select(reducers.getQuestionSetFilter);
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
    this.isLoading$ = store.select(reducers.getLoadingQuestionSetState);
  }

  get all() {
    return actions.Filter.ALL;
  }

  get mostPlayed() {
    return actions.Filter.MOST_PLAYED;
  }

  ngOnInit() {
    this.store.dispatch(new actions.LoadAction());
  }

  doSearch(val) {
    this.store.dispatch(new actions.SearchAction(val));
  }

  doFilter() {
    this.store.dispatch(new actions.FilterAction(this.selectedFilter));
  }
}
