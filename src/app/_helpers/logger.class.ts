import {LoggerService} from '../_services';

export abstract class LoggerClass {
  name: string;
  logger: LoggerService;

  protected constructor(name: string, logger: LoggerService) {
    this.name = name;
    this.logger = logger;
  }

  loggerDebug(msg: string, ...params: any) {
    this.logger.debug(this.name, msg, params);
  }

  loggerInfo(msg: string, ...params: any) {
    this.logger.info(this.name, msg, params);
  }

  loggerError(msg: string, ...params: any) {
    this.logger.error(this.name, msg, params);
  }

  loggerWarn(msg: string, ...params: any) {
    this.logger.warn(this.name, msg, params);
  }

  loggerFatal(msg: string, ...params: any) {
    this.logger.fatal(this.name, msg, params);
  }
}
