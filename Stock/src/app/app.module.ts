import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { ShowCmpComponent } from './company/show-cmp/show-cmp.component';
import { AddEditCmpComponent } from './company/add-edit-cmp/add-edit-cmp.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AddExcComponent } from './exchange/add-exc/add-exc.component';
import { AddEditComponent } from './exchange/add-edit/add-edit.component';
import { IPOComponent } from './ipo/ipo.component';
import { ShowIPOComponent } from './ipo/show-ipo/show-ipo.component';
import { AddEditIpoComponent } from './ipo/add-edit-ipo/add-edit-ipo.component';


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';


import { SharedService } from './shared_service/shared.service';
import { UserService } from './shared_service/user.service';
//import { FusionChartsModule } from 'angular-fusioncharts';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { StockDataComponent } from './stock-data/stock-data.component';
import { UseripoComponent } from './useripo/useripo.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { UsercompanyComponent } from './usercompany/usercompany.component';
import { FusionchComponent } from './fusionch/fusionch.component';
import { SectorComponent } from './sector/sector.component';
@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    ShowCmpComponent,
    AddEditCmpComponent,
    ExchangeComponent,
    AddExcComponent,
    AddEditComponent,
    IPOComponent,
    ShowIPOComponent,
    AddEditIpoComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ForbiddenComponent,
    ConfirmemailComponent,
    StockDataComponent,
    UseripoComponent,
    ProfileComponent,
    EditComponent,
    UsercompanyComponent,
    FusionchComponent,
    SectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule,
  // FusionChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    })
    
  ],
  providers: [SharedService,UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
