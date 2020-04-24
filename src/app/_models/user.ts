import {RoleType} from './role-type.enum';

export class User {
  id: string = null;
  nome: string = null;
  cognome: string = null;
  email: string = null; // univoco
  telefono: string = null;
  password: string = null;
  codiceFiscale: string = null; // univoco
  ruolo: Array<RoleType> = null;
  dataModifica: string = null;
  dataCreazione: string = null;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}





