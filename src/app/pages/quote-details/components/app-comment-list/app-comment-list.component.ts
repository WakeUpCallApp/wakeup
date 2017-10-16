import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './app-comment-list.component.html',
  styleUrls: ['./app-comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCommentListComponent implements OnInit {
  @Input() comments;
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  onDelete(comment) {
    this.delete.emit(comment);
  }
}
