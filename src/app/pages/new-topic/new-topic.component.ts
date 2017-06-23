import { Component, OnInit } from "@angular/core";
import { ITopic } from "../../common/models/topic.model";
import { Store } from "@ngrx/store";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/topic.actions";

@Component({
  selector: "wakeup-new-topic",
  templateUrl: "./new-topic.component.html",
  styleUrls: ["./new-topic.component.scss"]
})
export class NewTopicComponent implements OnInit {
  topic: ITopic = {
    name: "",
    description: "",
    isDefault: false
  };
  isCreating = false;
  constructor(private store: Store<reducers.State>) {}

  ngOnInit() {}

  createTopic() {
    this.store.dispatch(new actions.CreateAction(this.topic));
  }
}
