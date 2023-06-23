import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CarQuestionaireComponent } from '../sell-car/car-questionaire/car-questionaire.component';
import { CarStepperComponent } from '../sell-car/car-stepper/car-stepper.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questionaire', component: CarStepperComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
