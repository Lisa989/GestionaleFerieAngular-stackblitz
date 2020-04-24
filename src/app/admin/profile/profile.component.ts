import {Component, OnInit} from '@angular/core';
import {RoleType, User} from '../../_models';
import {AlertService, AuthService, LoggerService, UserService} from '../../_services';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LoggerClass} from '../../_helpers';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends LoggerClass implements OnInit {

  profilo$: Observable<User>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    logger: LoggerService,
  ) {
    super('ProfileComponent', logger);
  }

  ngOnInit(): void {
    this.profilo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getSelectUser(this.authService.currentUserCF, params.get('id')))
    );
  }


  /*Cancella utente*/
  clickDelete(utente: User) {
    this.loggerDebug('Cancella utente');

    // impedisci di cancellare l'amministratore
    if (utente.ruolo.includes(RoleType.ADMIN)) {
      this.loggerError('Permesso negato: impossibile cancellare l\'utente ADMIN');
      this.alertService.error('Permesso negato: impossibile cancellare l\'utente ADMIN');
      return;
    }

    // cancella utente
    this.userService.deleteUser(this.authService.currentUserCF, utente.id).subscribe(
      () => {
        this.loggerInfo('L\'utente è stato eliminato con successo');
        this.alertService.success('Eliminazione utente avvenuta con successo');
        this.router.navigate(['/admin/users']).then(() => {
          return;
        });
      },
      error => {
        this.loggerError(`Si è verificato un errore durante la cancellazione dell'utente`, error);
        this.alertService.error('Si è verificato un errore durante la cancellazione! ' + error.error.message);
      }
    );

  }

  isMe(cf) {
    return this.authService.currentUserCF !== cf;
  }

}
