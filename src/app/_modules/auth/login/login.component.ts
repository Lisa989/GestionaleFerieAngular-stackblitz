import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthService, LoggerService} from '../../../_services';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import {LoggerClass} from '../../../_helpers';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends LoggerClass implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  faUser = faUser;
  faKey = faKey;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    logger: LoggerService
  ) {
    super('LoginComponent', logger);
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.loggerInfo(`Senzione '${this.authService.currentSectionValue}' in corso`);
      this.router.navigate(['/' + this.authService.currentSectionValue]);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    // const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    const reason = this.route.snapshot.queryParams.reason;
    if (reason) {
      if (reason === 'notlogged') {
        this.logger.error('LoginComponent', 'Username o password errate');
        this.alertService.error('Username o password errate');
      }
      if (reason === 'unauthorized') {
        console.log('Utente non autorizzato');
        this.logger.error('LoginComponent', 'Utente non autorizzato');
        this.alertService.error('Utente non autorizzato');
      }
    }
    this.initForm();
  }

  initForm() {
    this.submitted = false;
    this.loading = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      section: 'user'
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get section() {
    return this.loginForm.get('section');
  }


  onSubmit() {
    this.loggerDebug(`Tentativo di autenticazione {username: ${this.email.value}, password: ${this.password.value}`);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loggerError(`Form invalida`, this.loginForm.value);
      return;
    }

    this.loading = true;

    this.authService.login(this.email.value, this.password.value, this.section.value).subscribe(
      _ => {
        switch (this.section.value) {
          case 'user':
            this.router.navigate(['/user']).then(() => {
              return;
            });
            break;
          case 'responsible':
            this.router.navigate(['/responsible']).then(() => {
              return;
            });
            break;
          case 'admin':
            this.router.navigate(['/admin']).then(() => {
              return;
            });
            break;
        }
      },
      _ => this.loading = false
    );
  }

}
