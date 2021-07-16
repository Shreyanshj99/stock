import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterModule,Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { IPOComponent } from './ipo/ipo.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { StockDataComponent } from './stock-data/stock-data.component';
import { UseripoComponent } from './useripo/useripo.component';
import { ProfileComponent } from './profile/profile.component';
import { UsercompanyComponent } from './usercompany/usercompany.component';
import { FusionchComponent } from './fusionch/fusionch.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],data :{permittedRoles:['user']}},
  {path:'forbidden',component:ForbiddenComponent},
  //{path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  //{path:'admin',component:AdminComponent,canActivate:[AuthGuard]}
  {path:'confirmemail', component: ConfirmemailComponent },
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard],data :{permittedRoles:['admin']}},
  {path:'admin/exchange',component:ExchangeComponent,canActivate:[AuthGuard],data :{permittedRoles:['admin']}},
  {path:'admin/Company',component:CompanyComponent,canActivate:[AuthGuard],data :{permittedRoles:['admin']}},
  {path:'admin/IPO',component:IPOComponent,canActivate:[AuthGuard],data :{permittedRoles:['admin']}},
  {path:'admin/Stock_Data',component:StockDataComponent,canActivate:[AuthGuard],data :{permittedRoles:['admin']}},
  {path:'home/userIpo',component:UseripoComponent,canActivate:[AuthGuard],data :{permittedRoles:['user']}},
  {path:'home/profile',component:ProfileComponent,canActivate:[AuthGuard],data :{permittedRoles:['user']}},
  {path:'home/usercompany',component:UsercompanyComponent,canActivate:[AuthGuard],data :{permittedRoles:['user']}},
  {path:'home/comparecompany',component:FusionchComponent,canActivate:[AuthGuard],data :{permittedRoles:['user']}}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,RouterOutlet]
})
export class AppRoutingModule { }
