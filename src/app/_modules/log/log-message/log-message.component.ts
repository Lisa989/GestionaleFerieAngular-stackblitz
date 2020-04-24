import {Component, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {LoggerService} from '../../../_services/logger.service';
import {GetLogLevel, LogLevel} from '../log-level.enum';


@Component({
  selector: 'app-log-message',
  templateUrl: './log-message.component.html',
  styleUrls: ['./log-message.component.css']
})
export class LogMessageComponent implements OnInit {
  faTrash = faTrash;

  constructor(private logger: LoggerService) {
  }

  ngOnInit(): void {
  }

  get messages() {
    return this.logger.messages;
  }

  clear() {
    this.logger.clearMsg();
  }

  get debug() {
    return this.logger.logLevel <= LogLevel.Debug;
  }

  getLevel(l: LogLevel) {
    return GetLogLevel(l);
  }
}
