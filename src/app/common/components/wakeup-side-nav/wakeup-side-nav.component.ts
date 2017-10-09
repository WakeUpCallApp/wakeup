import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'wakeup-side-nav',
  templateUrl: './wakeup-side-nav.component.html',
  styleUrls: ['./wakeup-side-nav.component.scss']
})
export class WakeupSideNavComponent implements OnInit, OnChanges {
  @Input() isOpen;
  @Output() onClose = new EventEmitter();
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && !changes['isOpen'].isFirstChange) {
      this.toggleSidenav();
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.onClose.emit();
  }

}
