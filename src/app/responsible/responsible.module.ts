import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResponsibleHomeComponent} from './home/responsible-home.component';
import {NgbCollapseModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {ResponsibleRoutingModule} from './responsible-routing.module';
import {SharedComponetsModule} from '../_modules/shared-componets/shared-componets.module';
import { ProfileComponent } from './profile/profile.component';
import { TableComponent } from './table/table.component';
import {DataTablesModule} from 'angular-datatables';
import { RequestComponent } from './request/request.component';
import {FormsModule} from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [ResponsibleHomeComponent, ProfileComponent, TableComponent, RequestComponent, FilterComponent],
    imports: [
        CommonModule,
        NgbCollapseModule,
        ResponsibleRoutingModule,
        SharedComponetsModule,
        DataTablesModule,
        FormsModule,
        FontAwesomeModule,
        NgbPopoverModule,
        NgxDatatableModule
    ]
})
export class ResponsibleModule { }
