import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Topic } from "../../common/models/topic.model";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/topic.actions";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "wakeup-topics",
  templateUrl: "./topics.component.html",
  styleUrls: ["./topics.component.scss"]
})
export class TopicsComponent implements OnInit {
  topics$: Observable<Topic[]>;
  searchTerm$: Observable<string>;
  filteredList$: Observable<Topic[]>;
  constructor(private store: Store<reducers.State>) {
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
}
