import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wakeup-comment-list',
  templateUrl: './wakeup-comment-list.component.html',
  styleUrls: ['./wakeup-comment-list.component.scss']
})
export class WakeupCommentListComponent implements OnInit {
  @Input() comments;
  @Output() delete = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onDelete(comment) {
    this.delete.emit(comment);
  }
}
