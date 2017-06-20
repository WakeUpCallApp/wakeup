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
  filteredList$: Observable<QuestionSet[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<reducers.State>) {
    this.questionSets$ = store.select(reducers.getQuestionSetsSortedState);
    this.searchTerm$ = store.select(reducers.getQuestionSetSearchTerm);
    this.filteredList$ = Observable.combineLatest(
      this.questionSets$,
      this.searchTerm$,
      (questionSets, searchTerm) => {
        return searchTerm
          ? questionSets.filter(
              questionSet =>
                questionSet.name
                  .toLocaleLowerCase()
                  .indexOf(searchTerm.toLocaleLowerCase()) !== -1
            )
          : questionSets;
      }
    );
    this.isLoading$ = store.select(reducers.getLoadingQuestionSetState);
  }

  ngOnInit() {
    this.store.dispatch(new actions.LoadAction());
  }

  doSearch(val) {
    // dispatch the input's value to the store
    this.store.dispatch(new actions.SearchAction(val));
  }
}
