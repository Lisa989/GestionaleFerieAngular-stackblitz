import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../_services';
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logo-user',
  templateUrl: './logo-user.component.html',
  styleUrls: ['./logo-user.component.css']
})
export class LogoUserComponent implements OnInit {
  faUser = faUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    config: NgbPopoverConfig
  ) {
    // customize default values of popovers used by this component tree
    config.placement = 'bottom';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserName() {
    return this.authService.currentUserNome;
  }

  getUserCognome() {
    return this.authService.currentUserCognome;
  }

  getUserRole() {
    return this.authService.currentUserRuolo;
  }

}
