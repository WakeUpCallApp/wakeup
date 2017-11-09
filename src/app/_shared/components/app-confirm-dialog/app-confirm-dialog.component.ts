import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './app-confirm-dialog.component.html',
  styleUrls: ['./app-confirm-dialog.component.scss']
})
export class AppConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AppConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}
