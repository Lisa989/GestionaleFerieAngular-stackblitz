import {LogLevel} from '../_modules/log/log-level.enum';
import {HttpHeaders} from '@angular/common/http';

export let SHOW_LOG = false;
export let LOG_LEVEL = LogLevel.All;
export let TYPE_APERT = false; // true usa le alert, false usa i toastr

export let HEADERS = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
  'Access-Control-Allow-Origin': '*', // 'http://localhost:4200',
  'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding'
});
