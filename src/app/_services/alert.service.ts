import {Injectable} from '@angular/core';
import {Alert} from '../_modules/alert/alert';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {AlertType} from '../_modules/alert/alert-type.enum';
import {ToastrService} from 'ngx-toastr';
import {TYPE_APERT} from '../_helpers';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  constructor(private toastr: ToastrService) {
  }

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    if (TYPE_APERT) {
      this.alert(new Alert({...options, type: AlertType.Success, message}));
    } else {
      this.toastr.success(message);
    }
  }

  error(message: string, options?: any) {
    if (TYPE_APERT) {
      this.alert(new Alert({...options, type: AlertType.Error, message}));
    } else {
      this.toastr.error(message);
    }
  }

  info(message: string, options?: any) {
    if (TYPE_APERT) {
      this.alert(new Alert({...options, type: AlertType.Info, message}));
    } else {
      this.toastr.info(message);
    }
  }

  warn(message: string, options?: any) {
    if (TYPE_APERT) {
      this.alert(new Alert({...options, type: AlertType.Warning, message}));
    } else {
      this.toastr.warning(message);
    }
  }

  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({id}));
  }
}
