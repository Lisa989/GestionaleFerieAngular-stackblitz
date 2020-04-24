import {LoggerClass} from './logger.class';
import {Observable, of} from 'rxjs';
import {AlertService, LoggerService} from '../_services';

export class ErrorHendlerClass extends LoggerClass {

  nome: string;

  constructor(name: string, logger: LoggerService, protected alertService: AlertService) {
    super(name, logger);
    this.nome = name;
  }

  /*protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.loggerError('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.loggerError(
        `Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }*/

  /**
   * Handler Error
   * @param operation operazione
   * @param result risultato
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.loggerError(`${operation}  failed:`, error.error);
      this.alertService.error(`${operation}  failed: ${error.message.message}`, this.nome);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
