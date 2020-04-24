import {Component, OnInit} from '@angular/core';
import {VacationRequest} from '../../_models';
import {AlertService, AuthService, LoggerService, RequestService} from '../../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoggerClass} from '../../_helpers';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends LoggerClass implements OnInit {

  request$: Observable<VacationRequest>;
  id: string;

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

  ngOnInit(): void {
    this.request$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.requestService.getUserRequest(this.authService.currentUserCF, params.get('id')))
    );
  }

  onClose() {
    this.loggerDebug('Chiudi dettaglio');
    this.router.navigate(['/user/richieste']);
    // this.closeEvt.emit(true);
  }

  /**
   * Sottomette una rechiesta all'approvazione
   */
  onSubscribeReq(req: VacationRequest) {
    this.loggerDebug('Sottoscrivi richiesta');
    const reqId = req ? req.id : null;
    this.requestService.subscribeRequest(this.authService.currentUserCF, reqId).subscribe();
    this.onClose();
  }

}
