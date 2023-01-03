import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { ModulesComponent } from './modules/modules.component';
import { LoginComponent } from './login/login.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { LogsComponent } from './logs/logs.component';
import { ImplementorsComponent } from './implementors/implementors.component';

const routes: Routes = [
  {
    path: 'modules',
    component: ModulesComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'implementors',
    component: ImplementorsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  },
  {
    path: 'add-form',
    component: AddFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
