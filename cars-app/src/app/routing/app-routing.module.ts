import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CarStepperComponent } from '../sell-car/car-stepper/car-stepper.component';
import { SellCarHomeComponent } from '../sell-car/sell-car-home/sell-car-home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questionaire', component: CarStepperComponent },

  { path: 'sell-car', component: SellCarHomeComponent },
  { path: '', redirectTo: '/sell-car', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
