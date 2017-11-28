import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit {
  @Input() search;
  @Output() doSearch = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onSearch(value) {
    this.doSearch.emit(value);
  }
}
