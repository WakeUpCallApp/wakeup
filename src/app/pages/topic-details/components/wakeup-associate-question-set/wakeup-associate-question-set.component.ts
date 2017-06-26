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
  questionSetCtrl: FormControl = new FormControl();
  filteredQuestionSets;
  constructor() {}

  filterQuestionSets(text: string) {
    const query: string = (text || "").toLowerCase().trim();
    const displayQuestionSets = this.questionSets.filter(
      questionSet =>
        !this.selected.find(selected => selected === questionSet.name)
    );
    return query
      ? displayQuestionSets.filter(
          questionSet => questionSet.name.toLowerCase().trim().search(query) !== -1
        )
      : displayQuestionSets;
  }

  ngOnInit() {}

  ngOnChanges(change) {
    if (this.selectedQuestionSets && this.questionSets) {
      this.availableQuestionSets = this.questionSets.filter(
        questionSet =>
          !this.selectedQuestionSets.find(
            selected => selected.name === questionSet.name
          )
      );
      this.selected = this.selectedQuestionSets.map(selected => selected.name);
      this.filteredQuestionSets = this.questionSetCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterQuestionSets(name));
    }
  }

  addQuestionSet(item) {
    this.selected.push(item);
    this.resetAutocomplete();
    this.questionSetCtrl.updateValueAndValidity();
  }

  resetAutocomplete() {
    this.questionSetCtrl.reset();
  }

  removeQuestionSet(qs) {
    this.selected = this.selected.filter(questionSet => questionSet !== qs);
    this.questionSetCtrl.updateValueAndValidity();
  }

  handleClick() {
    this.update.emit(
      this.questionSets
        .filter(questionSet =>
          this.selected.find(selected => selected === questionSet.name)
        )
        .map(questionSet => questionSet.id)
    );
    this.resetAutocomplete();
  }
}
