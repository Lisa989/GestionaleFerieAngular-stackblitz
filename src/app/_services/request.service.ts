import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {LoggerService} from './logger.service';
import {ConfigRoute, ErrorHendlerClass, HEADERS, SERVER_URL} from '../_helpers';
import {StateType, VacationRequest} from '../_models';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends ErrorHendlerClass {

  constructor(private http: HttpClient, alertService: AlertService, logger: LoggerService) {
    super('RequestService', logger, alertService);
  }

  /**
   * Richiedi la lista delle richieste dell'utente
   * @param codFiscale codice fiscale utente
   * @returns Observable<VacationRequest[]>
   */
  getUserRequests(codFiscale: string): Observable<any> {
    const url = ConfigRoute.getUserRequests(codFiscale); // GET: api/users/{uid}/requests
    this.loggerDebug(`getUserRequests: GET ${SERVER_URL}/${url}`);

    return this.http.get<any>(`${SERVER_URL}/${url}`, {headers: HEADERS}).pipe(
      map(data => {
        this.loggerInfo(`getUserRequest succeeded`, `GET /${url}`);
        if (!data.data) {
          return [];
        }
        return data.data;
      }),
      catchError(this.handleError<any>(`getUserRequests`))
    );
  }

  /**
   * Aggiorna una richiesta
   * @param codFiscale codice fiscale utente
   * @param req richiesta aggiornata
   * @returns Observable<VacationRequest>
   */
  updateRequest(codFiscale: string, req: VacationRequest): Observable<any> {
    const url = ConfigRoute.updeteRequest(codFiscale, req.id); //  PUT: api/users/{uid}/requests/{id}
    this.loggerDebug(`updateRequest: PUT ${SERVER_URL}/${url}`);

    return this.http.put<VacationRequest>(`${SERVER_URL}/${url}`, req, {headers: HEADERS}).pipe(
      tap(_ => {
        this.loggerInfo(`updateRequest succeeded`, `PUT /${url}`);
        this.alertService.success('Richiesta ferie modificata con successo');
      }),
      catchError(this.handleError<any>(`updateRequest`))
    );

  }


  /**
   * Crea una nuova richiesta
   * @param uid codice fiscale utente
   * @param inizio data inizio ferie
   * @param fine data fine ferie
   * @returns Observable<VacationRequest>
   */
  createRequest(uid: string, inizio: string, fine: string): Observable<any> {
    const url = ConfigRoute.createRequest(uid); // POST: api/users/{uid}/requests
    this.loggerDebug(`createRequest: GET ${SERVER_URL}/${url}`);

    const body = new VacationRequest({dataInizio: inizio, dataFine: fine, richiedente: uid});

    return this.http.post<any>(`${SERVER_URL}/${url}`, body, {headers: HEADERS}).pipe(
      tap(_ => {
        this.loggerInfo(`createRequest succeeded`, `POST /${url}`);
        this.alertService.success('Richiesta ferie creata con successo');
      }),
      catchError(this.handleError<any>(`createRequest`))
    );
  }

  /**
   * Sottometti una richiesta all'approvazione
   * @param codFiscale codice fiscale utente
   * @param idRichiesta id richiesta da sottoscrivere
   * @returns Observable<any>
   */
  // TBV probabilmete è meglio una put
  subscribeRequest(codFiscale: string, idRichiesta: string): Observable<any> {
    const url = ConfigRoute.subscribeRequest(codFiscale, idRichiesta); // GET: api/users/{uid}/requests/{id}/subscribe
    this.loggerDebug(`subscribeRequest: GET ${SERVER_URL}/${url}`);

    return this.http.get<any>(`${SERVER_URL}/${url}`, {headers: HEADERS}).pipe(
      tap(_ => {
        this.loggerInfo(`subscribeRequest succeeded`, `GET /${url}`);
        this.alertService.success('Richiesta ferie sottoscritta con successo');
      }),
      catchError(this.handleError<any>(`subscribeRequest`))
    );
  }

  /**
   * Filtra le richieste di un utente
   * @param uid codice fiscale utente
   * @param filtro informazioni filtro
   * @returns Observable<VacationRequest[]>
   */
  // tslint:disable-next-line:max-line-length
  filterRequestsUtente(uid: string, filtro: any): Observable<any> {
    const url = ConfigRoute.filterUserRequests(uid); // POST: api/users/{uid}/requests/filter
    this.loggerDebug(`filterRequestsUtente: POST ${SERVER_URL}/${url}`);

    filtro.richiedente = uid;
    const body = new VacationRequest(filtro);

    return this.http.post<any>(`${SERVER_URL}/${url}`, body, {headers: HEADERS}).pipe(
      map(data => {
        this.loggerInfo(`filterRequestsUtente succeeded`, `POST /${url}`);
        if (!data.data) {
          return [];
        }
        return data.data;
      }),
      catchError(this.handleError<any>(`filterRequestsUtente`))
    );
  }


  /**
   * Filtra tutte le richieste
   * @param uid codice fiscale utente
   * @param filtro informazioni filtro
   * @returns Observable<VacationRequest[]>
   */
  filterRequests(uid: string, filtro: any): Observable<any> {
    const url = ConfigRoute.filterRequests(); // POST: api/requests/filter/?uid=CF
    this.loggerDebug(`filterRequests: POST ${SERVER_URL}/${url}?uid=${uid}`);

    const param = new HttpParams().set('uid', uid);
    const body = new VacationRequest(filtro);

    return this.http.post<any>(`${SERVER_URL}/${url}`, body, {headers: HEADERS, params: param}).pipe(
      map(data => {
        this.loggerInfo(`filterRequests succeeded`, `POST /${url}`);
        if (!data.data) {
          return [];
        }
        return data.data;
      }),
      catchError(this.handleError<any>(`filterRequests`))
    );
  }

  /**
   * Recupera tutte le richieste
   * @param codFiscale codice fiscale operatore
   * @returns Observable<VacationRequest[]>
   */
  getRequests(codFiscale: string): Observable<any> {
    const url = ConfigRoute.getAllRequests(); // GET: api/requests/?uid=CF
    this.loggerDebug(`getRequests: GET ${SERVER_URL}/${url}?uid=${codFiscale}`);

    const param = new HttpParams().set('uid', codFiscale);

    return this.http.get<any>(`${SERVER_URL}/${url}`, {headers: HEADERS, params: param}).pipe(
      map(data => {
        this.loggerInfo(`getRequests succeeded`, `GET /${url}`);
        if (!data.data) {
          return [];
        }
        return data.data;
      }),
      catchError(this.handleError<any>(`getRequests`))
    );
  }

  /**
   *
   * @param uid codice fiscale operatore
   * @param idRichiesta id richiesta
   * @returns Observable<VacationRequest>
   */
  deleteRequest(uid: string, idRichiesta: string): Observable<any> {
    const url = ConfigRoute.deleteRequest(idRichiesta); // DELETE: api/requests/{id}/?uid=CF
    this.loggerDebug(`deleteRequest: DELETE ${SERVER_URL}/${url}?uid=${uid}`);

    const param = new HttpParams().set('uid', uid);

    return this.http.delete<any>(`${SERVER_URL}/${url}`, {headers: HEADERS, params: param}).pipe(
      tap(_ => {
        this.loggerInfo(`deleteRequest succeeded`, `DELETE /${url}`);
        this.alertService.success('Richiesta ferie cancellata con successo');
      }),
      catchError(this.handleError<any>(`deleteRequest`))
    );

  }

  /**
   * Valida la richiesta
   * @param uid uid
   * @param idRichiesta id richiesta
   * @param state accettata/rifiutata
   * @param motive motivo del rifiuto
   */
  validationRequest(uid: string, idRichiesta: string, state: StateType, motive: string): Observable<any> {
    const url = ConfigRoute.validateRequest(idRichiesta); // PUT: api/requests/{id}/?uid=CF
    this.loggerDebug(`validationRequest: PUT ${SERVER_URL}/${url}?uid=${uid}?uid=${uid}`);

    const param = new HttpParams().set('uid', uid);
    const body = new VacationRequest({id: idRichiesta, motivo: motive, stato: state, responsabile: uid});

    return this.http.put(`${SERVER_URL}/${url}`, body, {headers: HEADERS, params: param}).pipe(
      tap(_ => {
        this.loggerInfo(`validationRequest succeeded`, `PUT /${url}`);
        this.alertService.success('Validazio richiesta ferie completata con successo');
      }),
      catchError(this.handleError<any>(`validationRequest`))
    );
  }

  /**
   * Richiedi la specifica richiesta dell'utente
   * @param uid codice fiscale utente
   * @param id id richiesta
   * @returns Observable<VacationRequest[]>
   */
  getUserRequest(uid: string, id: string): Observable<VacationRequest> { // FIX è possibile eseguire la stessa operazione con la filter
    const url = ConfigRoute.getSelectUserRequest(uid, id); // GET: api/users/{uid}/requests/{id}
    this.loggerDebug(`getUserRequest: GET ${SERVER_URL}/${url}`);

    return this.http.get<VacationRequest>(`${SERVER_URL}/${url}`, {headers: HEADERS}).pipe(
      map(data => {
        this.loggerInfo(`getUserRequest succeeded`, `GET /${url}`);
        return data;
      }),
      catchError(this.handleError<any>(`getUserRequests`))
    );
  }


  /**
   * Richiedi la specifca richiesta
   * @param uid codice fiscale utente
   * @param id id richiesta
   * @returns Observable<VacationRequest[]>
   */
  getRequest(uid: string, id: string): Observable<any> { // FIX è possibile eseguire la stessa operazione con la filter
    const url = ConfigRoute.getSelectRequest(id); // GET: api/requests/{id}/?uid=CF
    this.loggerDebug(`getRequest: GET ${SERVER_URL}/${url}?uid=${uid}`);

    const param = new HttpParams().set('uid', uid);

    return this.http.get<any>(`${SERVER_URL}/${url}`, {headers: HEADERS, params: param}).pipe(
      map(data => {
        this.loggerInfo(`getRequest succeeded`, `GET /${url}`);
        return data;
      }),
      catchError(this.handleError<any>(`getRequests`))
    );
  }
}
