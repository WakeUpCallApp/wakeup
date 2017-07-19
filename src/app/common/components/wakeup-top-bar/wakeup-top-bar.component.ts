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

import { User } from '../../models/User.model';

@Component({
  selector: 'wakeup-top-bar',
  templateUrl: './wakeup-top-bar.component.html',
  styleUrls: ['./wakeup-top-bar.component.scss']
})
export class WakeupTopBarComponent implements OnInit {
  @Input() isOpen: boolean = true;
  @Input() loggedUser: User;
  @Output() onOpenMenu = new EventEmitter();
  @Output() logout = new EventEmitter();

  currentUser;
  constructor() { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
    this.onOpenMenu.emit(this.isOpen);
  }

  logoutUser() {
    this.logout.emit();
  }

}
