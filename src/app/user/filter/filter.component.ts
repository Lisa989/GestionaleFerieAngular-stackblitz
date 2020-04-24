import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlertService, AuthService, LoggerService, RequestService} from '../../_services';
import {RoleType, StatesList, StateType, VacationRequestFilter} from '../../_models';
import {LoggerClass, testNotNullOrUndefined} from '../../_helpers';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends LoggerClass implements OnInit {

  @Output() cancellaEvt = new EventEmitter<any>();
  @Output() filtraEvt = new EventEmitter<any>();
  filtro: VacationRequestFilter;
  stateType = StateType;

  constructor(
    private requestService: RequestService,
    private alertService: AlertService,
    private authService: AuthService,
    logger: LoggerService
  ) {
    super('FilterComponent', logger);
  }

  ngOnInit(): void {
    this.filtro = new VacationRequestFilter();
    this.filtro.stato = StateType.NONE;
  }

  /**
   * Esegui l'operazione di filtro
   */
  onFilter() {
    const filter = {
      dataInizio: testNotNullOrUndefined(this.filtro.dataInizio),
      dataFine: testNotNullOrUndefined(this.filtro.dataFine),
      responsabile: testNotNullOrUndefined(this.filtro.responsabile),
      stato: testNotNullOrUndefined(this.filtro.stato)
    };

    this.loggerDebug('Filtra richieste', filter);

    this.requestService.filterRequestsUtente(this.authService.currentUserCF, filter).subscribe(data => this.filtraEvt.emit(data));
  }

  /**
   * Cancella le impostazioni del filtro impostate
   */
  cancellaFiltro() {
    this.loggerDebug('Cancella filtro');
    this.filtro = new VacationRequestFilter();
    this.cancellaEvt.emit();
  }

}
