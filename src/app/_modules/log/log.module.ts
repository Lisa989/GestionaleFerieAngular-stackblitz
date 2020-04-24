import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogMessageComponent} from './log-message/log-message.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [LogMessageComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LogMessageComponent]
})
export class LogModule {
}
