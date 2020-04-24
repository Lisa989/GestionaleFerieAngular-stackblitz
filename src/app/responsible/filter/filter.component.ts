import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StatesList, StateType, VacationRequestFilter} from '../../_models';
import {AlertService, AuthService, LoggerService, RequestService} from '../../_services';
import {LoggerClass, testNotNullOrUndefined} from '../../_helpers';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends LoggerClass implements OnInit {

  constructor(
    private requestService: RequestService,
    private alertService: AlertService,
    private authService: AuthService,
    logger: LoggerService
  ) {
    super('FilterComponent', logger);
  }

  @Output() cancellaEvt = new EventEmitter<any>();
  @Output() filtraEvt = new EventEmitter<any>();
  filtro: VacationRequestFilter;
  stateType = StateType;

  ngOnInit(): void {
    this.filtro = new VacationRequestFilter();
    this.filtro.stato = StateType.NONE;
  }

  /**
   * Esegui l'operazione di filtro
   */
  onFilter() {
    this.loggerDebug('Filtra richieste');

    const filtro = {
      dataInizio: testNotNullOrUndefined(this.filtro.dataInizio),
      dataFine: testNotNullOrUndefined(this.filtro.dataFine),
      richiedente: testNotNullOrUndefined(this.filtro.richiedente),
      responsabile: testNotNullOrUndefined(this.filtro.responsabile),
      stato: testNotNullOrUndefined(this.filtro.stato.state)
    };

    this.requestService.filterRequests(this.authService.currentUserCF, filtro).subscribe(data => this.filtraEvt.emit(data));
  }


  /**
   * Cancella le impostazioni del filtro impostate
   */
  cancellaFiltro() {
    this.loggerDebug( 'Cancella filtro');
    this.filtro = new VacationRequestFilter();
    this.cancellaEvt.emit();
  }

}
