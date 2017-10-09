import { Observable } from "rxjs/Rx";
import { WakeupConfirmDialogComponent } from "../../_shared/components/wakeup-confirm-dialog/wakeup-confirm-dialog.component";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(message, callback) {
    this.confirm("Confirmation Required", message).subscribe(result => {
      if (result) {
        callback();
      }
    });
  }

  private confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<WakeupConfirmDialogComponent>;

    dialogRef = this.dialog.open(WakeupConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
