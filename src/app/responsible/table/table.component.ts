import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VacationRequest} from '../../_models';
import {AlertService, AuthService, LoggerService, RequestService} from '../../_services';
import {LoggerClass} from '../../_helpers';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends LoggerClass implements OnInit {

  @Output() detailEvt = new EventEmitter<any>();

  rows: Array<VacationRequest> = [];

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private alertService: AlertService,
    logger: LoggerService
  ) {
    super('TableComponent', logger);
  }

  ngOnInit(): void {
    this.updateTable();
  }


  /**
   * Aggiorna le richieste per i responsabili
   * @param callback funzione callback per l'iniizializzazione della tablella
   */
  updateTable(callback?) {
    this.loggerDebug('aggiornamento richieste ...');
    this.requestService.getRequests(this.authService.currentUserCF).subscribe(
      resp => {
        this.rows = resp.sort((a, b) => b.dataModifica.localeCompare(a.dataModifica));
      }
    );
  }


  /**
   * Richiedi dettaglio richiesta
   * @param req richiesta selezionata
   */
  onDetail(req) {
    this.loggerDebug('Richiesto dettaglio', req);
    this.detailEvt.emit(req);
  }

  /**
   * Imposta richieste filtrate
   * @param list richieste
   */
  onFilter(list: Array<VacationRequest>) {
    this.loggerDebug('Imposta lista filtrata');
    this.rows = list;
  }

  /**
   * Cancella la richiesta selezionata
   * @param req richiesta selezionata
   */
  onDeleteSelect(req) {
    this.loggerDebug(`Cancella richiesta selezionata`);
    this.requestService.deleteRequest(this.authService.currentUserCF, req.id).subscribe(_ => this.updateTable());

  }

}
