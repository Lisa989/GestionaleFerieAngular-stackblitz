import {AlertType} from './alert-type.enum';

export class Alert {
  id: string;
  type: AlertType;
  message: string;
  autoClose = true;
  keepAfterRouteChange = false;
  fade: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}
