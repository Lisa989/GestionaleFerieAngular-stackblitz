import {Component, OnInit} from '@angular/core';
import {LoggerClass, OP_CREATE, OP_NONE, OP_UPDATE} from '../../_helpers';
import {RoleType, User} from '../../_models';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthService, LoggerService, UserService} from '../../_services';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent extends LoggerClass implements OnInit {

  title = '';
  userForm: FormGroup;
  profilo: User = null;
  operation = OP_NONE;
  init = false;
  ruoliType = [RoleType.UTENTE, RoleType.RESPONSABILE]; // RoleType.ADMIN

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    logger: LoggerService,
  ) {
    super('ProfileFormComponent', logger);
  }

  ngOnInit() {
    const idUt: Observable<any> = this.route.params.pipe(map(p => p.id));
    idUt.subscribe(id => {
      if (id === '') {
        this.initCreate();
      } else {
        this.userService.getUser(id).subscribe(
          user => this.initUpdate(user),
          _ => this.clickClose()
        );
      }
    });
  }


  clickClose() {
    this.loggerDebug('Chiudi la finestra');
    // this.chiudiEvt.emit(null);
    this.router.navigate(['/admin/users']).finally();
  }

  initCreate() {
    this.operation = OP_CREATE;
    this.title = 'Crea un nuovo utente';

    this.userForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      codiceFiscale: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      telefono: [''],
      ruolo: new FormArray([])
    });
    this.ruoliType.forEach(() => {
      const control = new FormControl(false); // (i === 0) if first item set to true, else false
      (this.userForm.controls.ruolo as FormArray).push(control);
    });

    this.init = true;
  }

  initUpdate(user: User) {
    this.loggerDebug('Operazione di recupero profilo eseguita con successo');
    this.title = 'Modifica utente';
    this.operation = OP_UPDATE;

    this.profilo = user;

    this.userForm = this.formBuilder.group({
      nome: [this.profilo.nome, Validators.required],
      cognome: [this.profilo.cognome, Validators.required],
      codiceFiscale: [this.profilo.codiceFiscale, Validators.required],
      email: [this.profilo.email, [Validators.required, Validators.email]],
      password: [this.profilo.password, [Validators.required]],
      telefono: [this.profilo.telefono],
      ruolo: new FormArray([])
    });
    this.ruoliType.forEach((o, i) => {
      const control = new FormControl(this.profilo.ruolo.includes(this.ruoliType[i]));
      (this.userForm.controls.ruolo as FormArray).push(control);
    });

    this.init = true;
  }

  getControls() {
    // @ts-ignore
    return this.userForm.controls.ruolo.controls;
  }

  onSubmit() {
    if (this.operation === OP_UPDATE && this.profilo.ruolo.includes(RoleType.ADMIN)) {
      this.alertService.error('Si è verificato un errore durante la modifica del profilo! Impossibile modificare l\'amministratore');
      this.clickClose();
    }

    // stop here if form is invalid
    if (this.userForm.invalid) {
      this.loggerError('Form non valida');
      return;
    }

    if (this.operation === OP_CREATE) {
      this.onCreate();
    } else if (this.operation === OP_UPDATE) {
      this.onUpdate();
    }
  }

  clear() {
    this.userForm.reset();
  }

  /**
   * Crea nuovo utente
   */
  onCreate() {
    this.loggerDebug('onCreate: Crea un nuovo utente');

    const ut = {
      nome: this.nome.value,
      cognome: this.cognome.value,
      codiceFiscale: this.codiceFiscale.value,
      email: this.email.value,
      password: this.password.value,
      telefono: this.telefono.value.toString(),
      ruolo: this.arrayRuolo
    };

    this.userService.createUser(this.authService.currentUserCF, ut).subscribe();
    this.clickClose();
  }

  /**
   * Aggiorna utente selezionato
   */
  onUpdate() {
    this.loggerDebug('onUpdate: Aggiornamento utente');

    this.profilo.nome = this.nome.value;
    this.profilo.cognome = this.cognome.value;
    this.profilo.codiceFiscale = this.codiceFiscale.value;
    this.profilo.email = this.email.value;
    this.profilo.password = this.password.value;
    this.profilo.telefono = this.getTelefono();
    this.profilo.ruolo = this.arrayRuolo;


    this.userService.updateUser(this.authService.currentUserCF, this.profilo).subscribe();
    this.clickClose();
  }

  // convenience getter for easy access to form fields
  get nome() {
    return this.userForm.get('nome');
  }

  get cognome() {
    return this.userForm.get('cognome');
  }

  get codiceFiscale() {
    return this.userForm.get('codiceFiscale');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get telefono() {
    return this.userForm.get('telefono');
  }

  get ruolo() {
    return this.userForm.get('ruolo');
  }

  get arrayRuolo() {
    return this.userForm.value.ruolo.map((v, i) => {
      if (v) {
        return this.ruoliType[i];
      } else {
        return null;
      }
    }).filter(v => v !== null);
  }

  private getTelefono() {
    if (this.telefono.value) {
      return this.telefono.value.toString();
    }
    return '';
  }
}

