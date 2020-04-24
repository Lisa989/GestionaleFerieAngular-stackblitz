import {Component, OnInit} from '@angular/core';
import {AuthService, LoggerService, UserService} from '../../_services';
import {User} from '../../_models';
import {LoggerClass} from '../../_helpers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends LoggerClass implements OnInit {
  profilo: User;

  constructor(private userService: UserService, private authService: AuthService, logger: LoggerService) {
    super('ProfileComponent', logger);
  }

  ngOnInit(): void {
    this.userService.getUser(this.authService.currentUserCF).subscribe((user: User) => this.profilo = user);
  }

}
