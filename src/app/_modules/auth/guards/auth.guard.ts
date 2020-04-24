import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AlertService, AuthService, LoggerService} from '../../../_services';
import {RoleType} from '../../../_models';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private logger: LoggerService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    const currentSection = this.authenticationService.currentSectionValue;
    if (currentUser) {
      if (!(currentSection === 'admin' && currentUser.ruolo.includes(RoleType.ADMIN)) &&
        !(currentSection === 'responsible' && currentUser.ruolo.includes(RoleType.RESPONSABILE)) &&
        !(currentSection === 'user' && currentUser.ruolo.includes(RoleType.UTENTE))
      ) {
        // non ha i permessi per accedere alla sezione scelta
        this.authenticationService.logout();
        const param = {queryParams: {reason: 'unauthorized'}};
        this.router.navigate(['/login'], param).then(() => location.reload());
        return false;
      } else {
        // autorizzato, ritorna true
        this.logger.info('AuthGuard', 'Authorized. Login succeded');
        return true;
      }
    }

    // non loggato o non autorizzato. Reindirizzamento alla pagina login con l'url di ritorno
    const params = {queryParams: {reason: 'notlogged'}};
    this.router.navigate(['/login'], params).then(() => location.reload());
    return false;
  }
}
