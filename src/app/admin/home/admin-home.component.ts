import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoggerClass, OP_NONE} from '../../_helpers';
import {AlertService, AuthService, LoggerService, UserService} from '../../_services';
import {TableComponent} from '../table/table.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent extends LoggerClass implements OnInit {

  @ViewChild(TableComponent) table;
  operation = OP_NONE;
  navbarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    logger: LoggerService
  ) {
    super('AdminHomeComponent', logger);
  }

  ngOnInit() {
    this.operation = OP_NONE;
  }

  get getUserCF() {
    return this.authService.currentUserCF;
  }

}
