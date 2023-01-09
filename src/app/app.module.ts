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
import { FooterComponent } from './footer/footer.component';
import { SingleSelectComponent } from './common/single-select/single-select.component';
import { MultiSelectComponent } from './common/multi-select/multi-select.component';
import { CommonModule } from '@angular/common';
import { CommonPageHeaderComponent } from './common/common-page-header/common-page-header.component';

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
    FilesComponent,
    FooterComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    CommonPageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
