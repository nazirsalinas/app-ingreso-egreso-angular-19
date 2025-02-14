import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './../app/services/auth.guard'

export const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [ AuthGuard ],
    children: dashboardRoutes,
    canActivate: []
  },
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [ AuthGuard ]
  },
  { path: '**', redirectTo: '' }

];
