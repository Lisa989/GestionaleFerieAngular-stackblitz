export enum StateType {
  NONE = '',
  BOZZA = 'BOZZA',
  IN_ATTESA_DI_APPROVAZIONE = 'IN_ATTESA_DI_APPROVAZIONE',
  IN_MODIFICA = 'IN_MODIFICA',
  APPROVATA = 'APPROVATA',
  RIFIUTATA = 'RIFIUTATA'
}

export const StatesList: Array<any> = [
  {state: StateType.NONE, name: ''},
  {state: StateType.APPROVATA, name: 'APPROVATA'},
  {state: StateType.RIFIUTATA, name: 'RIFIUTATA'},
  {state: StateType.IN_ATTESA_DI_APPROVAZIONE, name: 'IN ATTESA DI APPROVAZIONE'},
  {state: StateType.BOZZA, name: 'BOZZA'},
  {state: StateType.IN_MODIFICA, name: 'IN MODIFICA'},
];
