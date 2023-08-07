import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CarStepperComponent } from '../sell-car/car-stepper/car-stepper.component';
import { SellCarHomeComponent } from '../sell-car/sell-car-home/sell-car-home.component';
import { ContactComponent } from '../common/contact/contact.component';
import { LoginComponent } from '../common/login/login.component';
import { DashboardComponent } from '../common/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questionaire', component: CarStepperComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'sell-car', component: SellCarHomeComponent },
  { path: '', redirectTo: '/sell-car', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
