import { Observable } from 'rxjs/Observable';
import { AppConfirmDialogComponent } from '../../_shared/components/app-confirm-dialog/app-confirm-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) { }

  public openDialog(message, callback) {
    this.confirm('Confirmation Required', message).subscribe(result => {
      if (result) {
        callback();
      }
    });
  }

  private confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<AppConfirmDialogComponent>;
    const config = {
      data: {
        title,
        message
      }
    };
    dialogRef = this.dialog.open(AppConfirmDialogComponent, config);
    return dialogRef.afterClosed();
  }
}
