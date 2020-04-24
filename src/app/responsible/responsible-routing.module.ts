import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_modules/auth/guards/auth.guard';
import {ResponsibleHomeComponent} from './home/responsible-home.component';
import {ResponsibleGuard} from '../_modules/auth/guards/responsible.guard';
import {ProfileComponent} from './profile/profile.component';
import {TableComponent} from './table/table.component';
import {RequestComponent} from './request/request.component';

const routes: Routes = [
  {
    path: '', component: ResponsibleHomeComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: '/responsible/profilo', pathMatch: 'full'},
      {path: 'profilo', component: ProfileComponent},
      {path: 'richieste', component: TableComponent},
      {path: 'richieste/dettaglio/:id', component: RequestComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsibleRoutingModule {
}
