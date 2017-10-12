import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-associate-question-set',
  templateUrl: './app-associate-question-set.component.html',
  styleUrls: ['./app-associate-question-set.component.scss']
})
export class AppAssociateQuestionSetComponent implements OnInit, OnChanges {
  @Input() questionSets;
  @Input() selectedQuestionSets;
  @Output() update = new EventEmitter();
  availableQuestionSets = [];
  selected = [];
  searchText = '';
  questionSetCtrl: FormControl = new FormControl();
  filteredQuestionSets;
  auto;
  constructor() {}

  filterQuestionSets(text: string) {
    const query: string = (text || '').toLowerCase().trim();
    const displayQuestionSets = this.questionSets.filter(
      questionSet =>
        !this.selected.find(selected => selected === questionSet.name)
    );
    return query
      ? displayQuestionSets.filter(
          questionSet =>
            questionSet.name.toLowerCase().trim().search(query) !== -1
        )
      : displayQuestionSets;
  }

  ngOnInit() {
    this.questionSetCtrl.valueChanges.subscribe(value => {
      if (value) {
        this.handleUpdate();
      }
    });
  }

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
    this.handleUpdate();
  }

  handleUpdate() {
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
