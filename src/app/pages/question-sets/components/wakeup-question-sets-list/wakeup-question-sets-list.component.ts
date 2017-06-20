import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "wakeup-question-sets-list",
  templateUrl: "./wakeup-question-sets-list.component.html",
  styleUrls: ["./wakeup-question-sets-list.component.scss"]
})
export class WakeupQuestionSetsListComponent implements OnInit {
  @Input() questionSets;
  constructor() {}

  ngOnInit() {}

  startQuestionSet(e, questionSet) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}
