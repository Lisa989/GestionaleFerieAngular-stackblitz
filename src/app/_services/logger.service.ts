import {Injectable} from '@angular/core';
import {LogLevel} from '../_modules/log/log-level.enum';
import {MessageLog} from '../_modules/log/message-log';
import {LOG_LEVEL} from '../_helpers';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  // FIX ME prova a vedere le alert per i parametri opzionali, cosi vede solo un parametro
  // FIX ME lo store non funziona
  public logLevel: LogLevel = LogLevel.All;
  private storeName = 'MessageLog';
  private messageLogsList: MessageLog[] = null;
  private store = false;

  constructor() {
    this.logLevel = LOG_LEVEL;
    if (this.store) {
      this.messageLogsList = JSON.parse(localStorage.getItem(this.storeName));
    }
    if (!this.messageLogsList) {
      this.messageLogsList = [];
    }
  }


  private makeLog(level: LogLevel, path: string, msg: string, params: any) {
    if (this.logLevel <= level) {
      const log = new MessageLog({level, path, msg, params});
      this.messageLogsList.push(log);

      if (log.params) {
        switch (level) {
          case LogLevel.Error || LogLevel.Fatal:
            console.error(log.message, log.paramsList);
            break;
          case LogLevel.Warn:
            console.warn(log.message, log.paramsList);
            break;
          default:
            console.log(log.message, log.paramsList);
            break;
        }
      } else {
        switch (level) {
          case LogLevel.Error || LogLevel.Fatal:
            console.error(log.message);
            break;
          case LogLevel.Warn:
            console.warn(log.message);
            break;
          default:
            console.log(log.message);
        }

      }

    }
  }


  debug(path: string, msg: string, params?: any) {
    this.makeLog(LogLevel.Debug, path, msg, params);
  }

  info(path: string, msg: string, params?: any) {
    this.makeLog(LogLevel.Info, path, msg, params);
  }

  error(path: string, msg: string, params?: any) {
    this.makeLog(LogLevel.Error, path, msg, params);
  }

  warn(path: string, msg: string, params?: any) {
    this.makeLog(LogLevel.Warn, path, msg, params);
  }

  fatal(path: string, msg: string, params?: any) {
    this.makeLog(LogLevel.Fatal, path, msg, params);
  }


  private storeMsg(msg: MessageLog) {
    this.messageLogsList.push(msg);
    localStorage.setItem(this.storeName, JSON.stringify(msg));
  }

  clearMsg() {
    localStorage.removeItem(this.storeName);
    this.messageLogsList = [];
  }

  get messages() {
    return this.messageLogsList;
  }
}
