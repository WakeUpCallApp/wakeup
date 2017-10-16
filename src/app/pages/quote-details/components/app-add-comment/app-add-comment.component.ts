import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ICreateComment } from '../../../../common/models';

@Component({
  selector: 'app-add-comment',
  templateUrl: './app-add-comment.component.html',
  styleUrls: ['./app-add-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppAddCommentComponent implements OnInit {
  @Input() commentObject: ICreateComment;
  @Output() create = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  handleClick() {
    this.create.emit(this.commentObject);
  }
}
