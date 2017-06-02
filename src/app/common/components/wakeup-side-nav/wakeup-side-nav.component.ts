import { Component,
 OnInit,
  OnChanges,
   Input,
   SimpleChanges,
   ViewChild,
   EventEmitter
} from '@angular/core';
import { Router} from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'wakeup-side-nav',
  templateUrl: './wakeup-side-nav.component.html',
  styleUrls: ['./wakeup-side-nav.component.scss']
})
export class WakeupSideNavComponent implements OnInit {
@Input() isOpen: boolean;
@ViewChild('sidenav') sidenav: MdSidenav;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
	  if (changes['isOpen'] && !changes['isOpen'].isFirstChange) {
		  this.openSidenav();
     }
  }

  openSidenav() {
	  this.sidenav.toggle();
  }

}
