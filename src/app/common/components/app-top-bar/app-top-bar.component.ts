import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.scss']
})
export class AppTopBarComponent {
  @Input() isOpen = true;
  @Input() loggedUser: User;
  @Output() onOpenMenu = new EventEmitter();
  @Output() logout = new EventEmitter();
  menu;
  currentUser;
  constructor() { }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
    this.onOpenMenu.emit(this.isOpen);
  }

  logoutUser() {
    this.logout.emit();
  }

}
