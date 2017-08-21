import { Subject } from "rxjs/Subject";

export class NotificationService {
  public subj_notification: Subject<any> = new Subject();

  private notify(message, className) {
    this.subj_notification.next({
      message: message,
      config: { extraClass: className }
    });
  }

  public notifyError(message) {
    return this.notify(message, "error-toast");
  }

  public notifySuccess(message) {
    return this.notify(message, "success-toast");
  }
}
