import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {LoggerService} from './logger.service';
import {User} from '../_models';
import {ConfigRoute, ErrorHendlerClass, HEADERS, SERVER_URL} from '../_helpers';
import {AlertService} from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends ErrorHendlerClass {

  constructor(
    private http: HttpClient,
    alertService: AlertService,
    logger: LoggerService) {
    super('UserService', logger, alertService);
  }

  /** Prendi il profilo dell'utente
   * @param cf: string codice fiscale utente
   * @returns Observable<User>
   */
  getUser(cf: string): Observable<User> {
    const url = ConfigRoute.getProfile(cf); // GET: api/users/{uid}
    this.loggerDebug(`getUser: GET ${SERVER_URL}/${url}`);

    return this.http.get<User>(`${SERVER_URL}/${url}`, {headers: HEADERS}).pipe(
      map(data => {
        this.loggerInfo(`getUser succeeded`, `GET /${url}`);
        return data;
      }),
      catchError(this.handleError<any>(`getUser`))
    );
  }


  /** Prendi tutti gli utenti
   * @param uid: string codice fiscale operatore
   * @returns  Observable<User[]>
   */
  getAllUsers(uid: string): Observable<User[]> {
    const url = ConfigRoute.getAllUsers(); // GET: api/users/?uid=CF
    this.loggerDebug(`getAllUsers: GET ${SERVER_URL}/${url}?uid=${uid}`);

    const param = new HttpParams().set('uid', uid);

    return this.http.get<any>(`${SERVER_URL}/${url}`, {headers: HEADERS, params: param}).pipe(
      map(data => {
        this.loggerInfo(`getAllUser succeeded`, `GET /${url}`);
        if (!data.data) {
          return [];
        }
        return data.data;
      }),
      catchError(this.handleError<any>(`getAllUser`))
    );
  }

  /**
   * Crea un nuovo utente
   * @param uid codice fiscale operatore
   * @param utente informazioni utente
   * @returns Observable<User>
   */
  createUser(uid: string, utente: any): Observable<any> {
    const url = ConfigRoute.createUser(); // POST: api/users/?uid=CF
    this.loggerDebug(`createUser: POST ${SERVER_URL}/${url}?uid=${uid}`);

    const param = new HttpParams().set('uid', uid);
    const body = new User(utente);

    return this.http.post<any>(`${SERVER_URL}/${url}`, body, {headers: HEADERS, params: param}).pipe(
      tap(() => {
        this.loggerInfo(`createUser succeeded`, `POST ${SERVER_URL}/${url}`);
        this.alertService.success('Utente creato con successo');
      }),
      catchError(this.handleError<any>(`createUser`))
    );
  }

  /**
   * Filtra la lista degli utenti
   * @param uid ...
   * @param filtro ...
   * @returns Observable<User[]>
   */
  filterUsers(uid: string, filtro: any): Observable<any> {
    const url = ConfigRoute.filterUsers();  // GET: api/users/filter/?uid=CF
    this.loggerDebug(`filterUsers: POST ${SERVER_URL}/${url}`);

    const param = new HttpParams().set('uid', uid);
    const body = new User(filtro);

    return this.http.post<any>(`${SERVER_URL}/${url}`, body, {headers: HEADERS, params: param}).pipe(
      map(data => {
        this.loggerInfo(`filterUsers succeded`, `POST /${url}`);
        if (!data.data) {
          return [];
        }
        return data.data;
      }),
      catchError(this.handleError<any>(`filterUsers`))
    );
  }

  /**
   * Cancellazione utente
   * @param uid codice fiscale operatore
   * @param userId id utente da cancellare
   * @returns  Observable<User>
   */
  deleteUser(uid: string, userId: string): Observable<any> {
    const url = ConfigRoute.deleteUser(userId); // DELETE: api/users/{id}/?uid=CF
    this.loggerDebug(`deleteUser: DELETE ${SERVER_URL}/${url}?id=${userId}`);

    const param = new HttpParams().set('uid', uid);

    return this.http.delete<any>(`${SERVER_URL}/${url}`, {headers: HEADERS, params: param}).pipe(
      tap(() => {
        this.loggerInfo(`deleteUser succeeded`, `DELETE /${url}`);
        this.alertService.success('Utente cancellato con successo');
      }),
      catchError(this.handleError<any>(`deleteUser`))
    );
  }

  /**
   * Aggiorna utente
   * @param uid codice fiscale operatore
   * @param update utente aggiornato
   * @returns Observable<User>
   */
  updateUser(uid: string, update: User): Observable<any> {
    const url = ConfigRoute.updateUser(update.id); // PUT: api/users/{id}/?uid=CF
    this.loggerDebug(`updateUser: PUT ${SERVER_URL}/${url}`);

    const param = new HttpParams().set('uid', uid);

    return this.http.put<any>(`${SERVER_URL}/${url}`, update, {headers: HEADERS, params: param}).pipe(
      tap(_ => {
        this.loggerInfo('updateUser succeeded', `PUT /${url}`);
        this.alertService.success('Utente modificato con successo');
      }),
      catchError(this.handleError<any>(`updateUser`))
    );
  }

  getSelectUser(uid: string, id: string) { // FIX può essere fatto con il filtro per id
    const url = ConfigRoute.getProfile(id); // GET: api/users/{uid}
    this.loggerDebug(`getUser: GET ${SERVER_URL}/${url}`);

    return this.http.get<User>(`${SERVER_URL}/${url}`, {headers: HEADERS}).pipe(
      map(data => {
        this.loggerInfo(`getUser succeeded`, `GET /${url}`);
        return data;
      }),
      catchError(this.handleError<any>(`getUser`))
    );
  }
}
