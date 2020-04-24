import {Component, OnInit} from '@angular/core';
import {LoggerClass} from '../../_helpers';
import {AlertService, AuthService, LoggerService, RequestService} from '../../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StateType, VacationRequest} from '../../_models';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends LoggerClass implements OnInit {
  request$: Observable<VacationRequest>;

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    logger: LoggerService
  ) {
    super('RequestComponent', logger);
  }

  motivo: string;

  ngOnInit(): void {
    this.request$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.requestService.getRequest(this.authService.currentUserCF, params.get('id')))
    );
  }

  /*Accept request*/
  onAccept(reqId: string) {
    this.loggerDebug('Acetta la richiesta ferie');
    this.requestService.validationRequest(this.authService.currentUserCF, reqId, StateType.APPROVATA, null).subscribe();
    this.onClose();
  }


  /*Reject request, open modal*/
  onReject(contest, reqId: string) {
    this.loggerDebug('Rifiuta la richiesta ferie');
    // apri la modal per richiedere il motivo
    this.modalService.open(contest, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        const closeResult = `Closed with: ${result}`;
        this.loggerDebug('Chiudi modal', closeResult);
        this.onSendReject(reqId);
      }
    );
  }

  onDelete(request) {
    this.loggerDebug('Cancella la richiesta', request);
  }

  onClose() {
    this.loggerDebug('Chiudi dettaglio');
    this.router.navigate(['/responsible/richieste']);
  }

  onSendReject(reqId: string) {
    this.requestService.validationRequest(this.authService.currentUserCF, reqId, StateType.RIFIUTATA, this.motivo).subscribe();
    this.onClose();
  }


}
