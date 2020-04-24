import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../_services/logger.service';
import {LoggerClass} from '../../_helpers';

@Component({
  selector: 'app-home',
  templateUrl: './responsible-home.component.html',
  styleUrls: ['./responsible-home.component.css']
})
export class ResponsibleHomeComponent extends LoggerClass implements OnInit {
  navbarOpen = false;

  constructor(logger: LoggerService) {
    super('ResponsibleHomeComponent', logger);
  }

  ngOnInit(): void {
  }

}
