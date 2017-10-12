import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICreateComment } from '../../../../common/models';

@Component({
  selector: 'app-add-comment',
  templateUrl: './app-add-comment.component.html',
  styleUrls: ['./app-add-comment.component.scss']
})
export class AppAddCommentComponent implements OnInit {
  @Input() commentObject: ICreateComment;
  @Output() create = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.create.emit(this.commentObject);
  }
}
