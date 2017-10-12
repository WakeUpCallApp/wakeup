import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './app-confirm-dialog.component.html',
  styleUrls: ['./app-confirm-dialog.component.scss']
})
export class AppConfirmDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;

  constructor(public dialogRef: MatDialogRef<AppConfirmDialogComponent>) { }

  ngOnInit() { }
}
