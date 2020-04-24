import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [AlertComponent],
    exports: [
        AlertComponent
    ],
    imports: [
        CommonModule,
        NgbAlertModule
    ]
})
export class AlertModule {
}
