import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {AuthService, LoggerService, UserService} from '../../_services';
import {LoggerClass} from '../../_helpers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends LoggerClass implements OnInit {
  profilo: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    logger: LoggerService
  ) {
    // Crea le funzioni loggerDebug, loggerInfo, loggerError
    super('ProfileComponent', logger);
  }


  ngOnInit() {
    this.userService.getUser(this.authService.currentUserCF).subscribe((user: User) => this.profilo = user);
  }


}
