import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { PaymentsComponent } from './payments/payments.component';
import { ChargesComponent } from './charges/charges.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
    {
        path: 'home',
        component: HomeComponent ,
    },
    {
      path: 'header',
      component: HeaderComponent ,
    },
    {
      path: 'register',
      component: RegisterComponent ,
    },
    {
      path: 'user',
      component: UserComponent ,
      canActivate: [AuthGuard]
    },
    {
      path: 'charges',
      component: ChargesComponent ,
      canActivate: [AuthGuard]
    },
    {
      path: 'payments',
      component: PaymentsComponent ,
      canActivate: [AuthGuard]
    },
    {
      path: 'meeting',
      component: MeetingsComponent ,
      canActivate: [AuthGuard]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
