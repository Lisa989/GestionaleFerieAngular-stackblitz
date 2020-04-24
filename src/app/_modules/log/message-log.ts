import {GetLogLevel, LogLevel} from './log-level.enum';

export class MessageLog {
  level: LogLevel;
  msg: string;
  date: Date;
  path: string;
  params: any;


  constructor(init?: Partial<MessageLog>) {
    Object.assign(this, init);
    this.date = new Date();
    if (this.params) {
      this.params = this.params[0];
    } else {
      this.params = null;
    }

  }

  private formatParams(): any {
    let ret: string = this.params.join(',');
    // Is there at least one object in the array?
    if (this.params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of this.params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }

  get paramsList() {
    return this.params;
  }

  get message() {
    return `${this.date.toLocaleString()} ${GetLogLevel(this.level)} [${this.path}] ${this.msg}`;
  }

}
