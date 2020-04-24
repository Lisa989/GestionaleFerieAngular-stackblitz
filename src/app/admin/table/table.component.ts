import {Component, OnInit} from '@angular/core';
import {RoleType, User} from '../../_models';
import {AlertService, AuthService, LoggerService, UserService} from '../../_services';
import {LoggerClass} from '../../_helpers';

@Component({
  selector: 'app-users-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends LoggerClass implements OnInit {

  rows: Array<User>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    logger: LoggerService
  ) {
    super('TableComponent', logger);
  }

  ngOnInit() {
    this.updateTable();

  }

  /**
   * Get list of users
   */
  updateTable() {
    this.loggerDebug('Aggiornamento lista utenti ...');
    this.userService.getAllUsers(this.authService.currentUserCF).subscribe(
      resp => {
        this.rows = resp.sort((a, b) => b.dataModifica.localeCompare(a.dataModifica));
        this.loggerDebug('Lista utenti recuperata');
      }
    );
  }

  /**
   * Impostazione filtro utenti
   * @param utenti filtrati
   */
  onFilter(utenti: any) {
    // this.users = utenti.sort((a, b) => b.dataModifica.localeCompare(a.dataModifica));
    this.rows =  utenti.sort((a, b) => b.dataModifica.localeCompare(a.dataModifica));
    this.loggerDebug('Lista utenti filtrata');
  }

  /**
   * Cancellazione filtro utenti
   */
  onDeleteFilter() {
    this.loggerDebug('Cancella filtro');
    this.updateTable();
  }

  /*Cancella utente*/
  onDelete(utente: User) {
    this.loggerDebug('Cancella utente');

    // impedisci di cancellare l'amministratore
    if (utente.ruolo.includes(RoleType.ADMIN)) {
      this.loggerError('Permesso negato: impossibile cancellare l\'utente ADMIN');
      this.alertService.error('Permesso negato: impossibile cancellare l\'utente ADMIN');
      return;
    }

    // cancella utente
    this.userService.deleteUser(this.authService.currentUserCF, utente.id).subscribe(_ => this.updateTable());
  }
}
