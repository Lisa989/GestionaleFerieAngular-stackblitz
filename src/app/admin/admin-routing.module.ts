import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from './home/admin-home.component';
import {AuthGuard} from '../_modules/auth/guards/auth.guard';
import {TableComponent} from './table/table.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';


const routes: Routes = [
  {
    path: '', component: AdminHomeComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: '/admin/users', pathMatch: 'full'},
      {path: 'users', component: TableComponent},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'profile/form/:id', component: ProfileFormComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
