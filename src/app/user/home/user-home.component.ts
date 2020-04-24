import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {LoggerService} from '../../_services/logger.service';
import {LoggerClass} from '../../_helpers';


@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent extends LoggerClass implements OnInit {
  navbarOpen = false;


  constructor(private authService: AuthService, logger: LoggerService) {
    super('UserHomeComponent', logger);
  }

  ngOnInit(): void {
  }

  get isUtente() {
    return this.authService.isUtente;
  }

}
