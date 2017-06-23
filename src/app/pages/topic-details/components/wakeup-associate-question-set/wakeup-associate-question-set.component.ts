import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";

@Component({
  selector: "wakeup-associate-question-set",
  templateUrl: "./wakeup-associate-question-set.component.html",
  styleUrls: ["./wakeup-associate-question-set.component.scss"]
})
export class WakeupAssociateQuestionSetComponent implements OnInit {
  @Input() questionSets;
  @Input() selectedQuestionSets;
  @Output() update = new EventEmitter();
  availableQuestionSets = [];
  selected = [];

  searchText = "";
  constructor() {}

  filterQuestionSets(text: string) {
    const query: string = (text || "").toLowerCase();
    return this.availableQuestionSets
      .filter(
        questionSet =>
          !this.selected.find(selected => selected === questionSet.name)
      )
      .filter(
        questionSet => questionSet.name.toLowerCase().search(query) !== -1
      );
  }

  ngOnInit() {}

  ngOnChanges(change) {
    if (
      this.selectedQuestionSets &&
      this.questionSets
    ) {
      this.availableQuestionSets = this.questionSets
      .filter(questionSet =>!this.selectedQuestionSets.find(selected => selected.name === questionSet.name));
      this.selected = this.selectedQuestionSets.map(selected => selected.name);
    }
  }

  addQuestionSet(item) {
    this.selected.push(item);
    this.searchText = "";
  }

  removeQuestionSet(qs) {
    this.selected = this.selected.filter(
      questionSet => questionSet !== qs
    );
  }

  handleClick() {
    this.update.emit(
      this.questionSets
        .filter(questionSet =>
          this.selected.find(selected => selected === questionSet.name)
        )
        .map(questionSet => questionSet.id)
    );
  }
}
