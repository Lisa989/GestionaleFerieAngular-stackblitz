import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHomeComponent} from './home/admin-home.component';
import {TableComponent} from './table/table.component';
import {DataTablesModule} from 'angular-datatables';
import {NgbCollapseModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FilterComponent} from './filter/filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {SharedComponetsModule} from '../_modules/shared-componets/shared-componets.module';
import {AdminRoutingModule} from './admin-routing.module';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [AdminHomeComponent, TableComponent, FilterComponent, ProfileComponent, ProfileFormComponent],
  imports: [
    NgxDatatableModule,
    CommonModule,
    DataTablesModule,
    NgbPopoverModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    SharedComponetsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {
}
