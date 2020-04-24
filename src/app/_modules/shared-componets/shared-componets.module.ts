import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoUserComponent} from './logo-user/logo-user.component';
import {BtnDetailComponent} from './btn-detail/btn-detail.component';
import {BtnDeleteComponent} from './btn-delete/btn-delete.component';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BtnNewComponent} from './btn-new/btn-new.component';
import {BtnGroupFilterComponent} from './btn-group-filter/btn-group-filter.component';


@NgModule({
  declarations: [LogoUserComponent,
    BtnDetailComponent,
    BtnDeleteComponent,
    BtnNewComponent,
    BtnGroupFilterComponent
  ],
  exports: [
    BtnDetailComponent,
    BtnDeleteComponent,
    LogoUserComponent,
    BtnNewComponent,
    BtnGroupFilterComponent
  ],
  imports: [
    CommonModule,
    NgbPopoverModule,
    FontAwesomeModule
  ]
})
export class SharedComponetsModule {
}
