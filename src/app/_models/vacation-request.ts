import {StateType} from './state-type.enum';


export class VacationRequest {
  id: string = null;
  dataInizio: string = null;
  dataFine: string = null;
  dataModifica: string = null;
  dataCreazione: string = null;
  motivo: string = null;
  stato: StateType = null;
  responsabile: string = null;
  richiedente: string = null;

  constructor(init?: Partial<VacationRequest>) {
    Object.assign(this, init);
  }
}

