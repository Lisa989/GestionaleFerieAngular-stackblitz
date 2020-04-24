import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AlertModule, AuthModule, LogModule} from './_modules';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {DataTablesModule} from 'angular-datatables';
import {AdminModule} from './admin/admin.module';
import {UserModule} from './user/user.module';
import {ResponsibleModule} from './responsible/responsible.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlertService } from './_services/alert.service';
import { AuthService } from './_services/auth.service';
import { LoggerService } from './_services/logger.service';
import { UserService } from './_services/user.service';
import { RequestService } from './_services/request.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    DataTablesModule,
    AlertModule,
    AuthModule,
    AdminModule,
    UserModule,
    ResponsibleModule,
    LogModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center'}),
    BrowserAnimationsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, providers: [AlertService], providers: [AuthService], providers: [LoggerService], providers: [UserService], providers: [RequestService]}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
