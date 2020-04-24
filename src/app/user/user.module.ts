import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserHomeComponent} from './home/user-home.component';
import {UserRoutingModule} from './user-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {NgbCollapseModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedComponetsModule} from '../_modules/shared-componets/shared-componets.module';
import { TableComponent } from './table/table.component';
import {DataTablesModule} from 'angular-datatables';
import { RequestComponent } from './request/request.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { RequestFormComponent } from './request-form/request-form.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [UserHomeComponent, ProfileComponent, TableComponent, RequestComponent, FilterComponent, RequestFormComponent],
    imports: [
        CommonModule,
        SharedComponetsModule,
        UserRoutingModule,
        NgbCollapseModule,
        DataTablesModule,
        FormsModule,
        NgbPopoverModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgxDatatableModule,
    ]
})
export class UserModule {
}
