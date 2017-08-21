import { Observable } from "rxjs/Rx";
import { WakeupConfirmDialogComponent } from "../components/wakeup-confirm-dialog/wakeup-confirm-dialog.component";
import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class DialogService {
  constructor(private dialog: MdDialog) {}

  public openDialog(message, callback) {
    this.confirm("Confirmation Required", message).subscribe(result => {
      if (result) {
        callback();
      }
    });
  }

  private confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<WakeupConfirmDialogComponent>;

    dialogRef = this.dialog.open(WakeupConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
