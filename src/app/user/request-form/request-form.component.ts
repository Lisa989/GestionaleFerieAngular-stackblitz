import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {AlertService, LoggerService, RequestService} from '../../_services';
import {LoggerClass, OP_CREATE, OP_UPDATE} from '../../_helpers';
import {VacationRequest} from '../../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent extends LoggerClass implements OnInit {

  richiesta: VacationRequest;
  operazione;
  title: string;
  reqForm: FormGroup;
  init = false;

  constructor(
    private authService: AuthService,
    private requestService: RequestService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    logger: LoggerService
  ) {
    super('RequestFormComponent', logger);

  }

  ngOnInit() {
    const idReq: Observable<any> = this.route.params.pipe(map(p => p.id));
    idReq.subscribe(id => {
      if (id === '') {
        this.title = 'Crea una nuova richiesta ferie';
        this.operazione = OP_CREATE;
        this.richiesta = new VacationRequest();
        this.creaFormNew();
        this.init = true;
      } else {
        this.loggerDebug('Trova la richiesta', id);
        this.title = 'Modifica la richiesta ferie';
        this.operazione = OP_UPDATE;
        this.requestService.getUserRequest(this.authService.currentUserCF, id).subscribe(
          req => {
            this.richiesta = req;
            this.creaFormUpdate();
            this.init = true;
          },
          error => {
            this.loggerError('Si è verificato un errore durante il recupero della richiesta', error);
            this.onClose();
          }
        );
      }
    });
  }

  creaFormNew() {
    this.loggerDebug('Crea form per nuovo');
    this.reqForm = this.formBuilder.group({
      inizio: ['', Validators.required],
      fine: ['', Validators.required],
    }, {validators: dateValidator});
  }

  creaFormUpdate() {
    this.loggerDebug('Crea form per update', this.richiesta);
    this.reqForm = this.formBuilder.group({
      inizio: [this.richiesta.dataInizio, Validators.required],
      fine: [this.richiesta.dataFine, Validators.required],
    }, {validators: dateValidator});
  }

  get inizio() {
    return this.reqForm.get('inizio');
  }

  get fine() {
    return this.reqForm.get('fine');
  }

  onUpdate() {
    this.loggerDebug('Aggiorna richiesta');
    this.richiesta.dataInizio = this.inizio.value;
    this.richiesta.dataFine = this.fine.value;

    this.requestService.updateRequest(this.authService.currentUserCF, this.richiesta).subscribe();
    this.onClose();
  }

  onCreate() {
    this.loggerDebug('Creazione richiesta');

    this.requestService.createRequest(this.authService.currentUserCF, this.inizio.value, this.fine.value).subscribe();
    this.onClose();
  }

  onSubmit() {
    this.loggerDebug('Click submit', this.reqForm.value);

    if (this.reqForm.invalid) {
      this.loggerError('Form non valida', this.reqForm.errors);
      return;
    }

    if (this.operazione === OP_CREATE) {
      this.onCreate();
    }
    if (this.operazione === OP_UPDATE) {
      this.onUpdate();
    }
  }

  onClose() {
    this.router.navigate(['/user/richieste']);
  }
}

/** Data inizio non può essere maggionre di data fine */
export const dateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const inizio = control.get('inizio');
  const fine = control.get('fine');
  return inizio.value && fine.value && new Date(inizio.value) > new Date(fine.value) ? {errorePeriodo: true} : null;
};

