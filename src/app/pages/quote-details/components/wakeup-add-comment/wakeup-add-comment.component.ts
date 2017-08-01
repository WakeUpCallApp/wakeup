import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CreateComment} from "../../../../common/models/quote.model";

@Component({
  selector: "wakeup-add-comment",
  templateUrl: "./wakeup-add-comment.component.html",
  styleUrls: ["./wakeup-add-comment.component.scss"]
})
export class WakeupAddCommentComponent implements OnInit {
  @Input() commentObject: CreateComment;
  @Output() create = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.create.emit(this.commentObject);
  }
}
