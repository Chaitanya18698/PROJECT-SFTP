import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ModulesComponent } from './modules/modules.component';
import { HeaderComponent } from './common/header/header.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { AddFormComponent } from './add-form/add-form.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { LogsComponent } from './logs/logs.component';
import { ImplementorsComponent } from './implementors/implementors.component';
import { FilesComponent } from './files/files.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModulesComponent,
    HeaderComponent,
    TopMenuComponent,
    AddFormComponent,
    ClientsComponent,
    UsersComponent,
    LogsComponent,
    ImplementorsComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
