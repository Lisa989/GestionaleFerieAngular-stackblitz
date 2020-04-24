import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

import {ConfigRoute, ErrorHendlerClass, HEADERS, SERVER_URL} from '../_helpers';
import {LoggerService} from './logger.service';
import {RoleType, User} from '../_models';
import {AlertService} from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ErrorHendlerClass {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentSection: string;

  constructor(
    private http: HttpClient,
    alertService: AlertService,
    logger: LoggerService
  ) {
    super('AuthService', logger, alertService); // incorpora la funzione per lagestione degli errori ed i log

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    if (this.currentUserSubject.value) {
      this.currentSection = JSON.parse(localStorage.getItem('currentSection'));
    }
  }


  login(email, password, section): Observable<User> {
    const url = ConfigRoute.authenticate();
    this.loggerDebug(`login: POST ${SERVER_URL}/${url}`, {headers: HEADERS});

    return this.http.post<any>(`${SERVER_URL}/${url}`, JSON.stringify({email, password}), {headers: HEADERS}).pipe(
      map(user => {
        this.loggerInfo(`login succeed`, `POST ${SERVER_URL}/${url}`);

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('currentSection', JSON.stringify(section));
        this.currentUserSubject.next(user);
        this.currentSection = section;

        return user;
      }),
      catchError(this.handleError<any>(`login`))
    );
  }


  logout() {
    // remove user from local storage and set current user to null
    this.loggerInfo(`${this.currentUserCF} ha effettualto il logout`);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentSection');
    this.currentSection = '';
    this.currentUserSubject.next(null);
    // this.alertService.success('Logout effettuato con successo');
  }

  get currentSectionValue(): string {
    return this.currentSection;
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get currentUserCF(): string {
    return this.currentUserValue.codiceFiscale;
  }

  get currentUserNome(): string {
    return this.currentUserValue.nome;
  }

  get currentUserCognome(): string {
    return this.currentUserValue.cognome;
  }

  get currentUserRuolo(): string {
    return this.currentUserValue.ruolo.toString();
  }

  get isAdmin(): boolean {
    return this.currentUserValue.ruolo.includes(RoleType.ADMIN);
  }

  get isResponsabile(): boolean {
    return this.currentUserValue.ruolo.includes(RoleType.RESPONSABILE);
  }

  get isUtente(): boolean {
    return this.currentUserValue.ruolo.includes(RoleType.UTENTE);
  }
}
