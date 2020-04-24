import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../_modules/auth/guards/auth.guard';
import {UserHomeComponent} from './home/user-home.component';
import {ProfileComponent} from './profile/profile.component';
import {TableComponent} from './table/table.component';
import {RequestComponent} from './request/request.component';
import {RequestFormComponent} from './request-form/request-form.component';

const routes: Routes = [
  {
    path: '', component: UserHomeComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: '/user/profilo', pathMatch: 'full'},
      {path: 'profilo', component: ProfileComponent},
      {path: 'richieste', component: TableComponent},
      {path: 'richieste/dettaglio/:id', component: RequestComponent},
      {path: 'richieste/form/:id', component: RequestFormComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
