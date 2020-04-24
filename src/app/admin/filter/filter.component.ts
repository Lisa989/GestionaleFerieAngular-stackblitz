import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RoleType, UserFilter} from '../../_models';
import {AuthService, LoggerService, UserService} from '../../_services';
import {LoggerClass} from '../../_helpers';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends LoggerClass implements OnInit {

  filtro: UserFilter;
  @Output() cancellaEvt = new EventEmitter<any>();
  @Output() filtraEvt = new EventEmitter<any>();
  private marked: boolean;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    logger: LoggerService
  ) {
    super('FilterComponent', logger);
  }

  private initFilter() {
    this.filtro = new UserFilter();
    this.filtro.codiceFiscale = '';
    this.filtro.nome = '';
    this.filtro.cognome = '';
    this.filtro.ruoloAdmin = false;
    this.filtro.ruoloResponsabile = false;
    this.filtro.ruoloUtente = false;
  }

  ngOnInit(): void {
    this.initFilter();
  }

  filtraUtenti() {
    this.loggerDebug('filtraUtenti', this.filtro);

    const filtro = {
      codiceFiscale: this.filtro.codiceFiscale,
      nome: this.filtro.nome,
      cognome: this.filtro.cognome,
      ruolo: this.getRole
    };

    this.userService.filterUsers(this.authService.currentUserCF, filtro).subscribe(data => this.filtraEvt.emit(data));
  }

  cancellaFiltro() {
    this.loggerDebug('cancellaFiltro');
    this.filtro = new UserFilter();
    this.initFilter();
    this.cancellaEvt.emit();
  }


  private get getRole() {
    const ruoli = new Array<RoleType>();
    if (this.filtro.ruoloAdmin) {
      ruoli.push(RoleType.ADMIN);
    }
    if (this.filtro.ruoloResponsabile) {
      ruoli.push(RoleType.RESPONSABILE);
    }
    if (this.filtro.ruoloUtente) {
      ruoli.push(RoleType.UTENTE);
    }
    return ruoli;
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }

}
