import {Component, OnDestroy, OnInit} from '@angular/core';
import {VacationRequest} from '../../_models';
import {AlertService, AuthService, LoggerService, RequestService} from '../../_services';
import {LoggerClass} from '../../_helpers';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends LoggerClass implements OnInit, OnDestroy {
  rows: Array<VacationRequest> = [];
  // dtOptions: DataTables.Settings = {};
  // dtTrigger = new Subject();

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    logger: LoggerService
  ) {
    super('TableComponent', logger);
  }

  ngOnInit(): void {

    /*this.dtOptions = {
      stateSave: true,
      searching: false,
      processing: true,
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: false
    };*/
    this.aggiorna();

  }

  /**
   * Aggiorna le richieste per gli utenti
   * @param callback funzione callback per l'iniizializzazione della tablella
   */
  private aggiorna(callback?) {
    this.loggerDebug('Aggiornamento elenco richieste ...');
    this.requestService.getUserRequests(this.authService.currentUserCF).subscribe(
      resp => {
        this.rows = resp.sort((a, b) => b.dataModifica.localeCompare(a.dataModifica));
        // this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // this.dtTrigger.unsubscribe();
  }

  /**
   * Imposta richieste filtrate
   * @param list richieste
   */
  onFilter(list: Array<VacationRequest>) {
    this.loggerDebug('Inserimento richieste filtrate');
    this.rows = list;
  }


  onDeleteFilter() {
    this.aggiorna();
  }

}
