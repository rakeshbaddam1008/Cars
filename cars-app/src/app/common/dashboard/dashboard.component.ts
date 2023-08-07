import { Component } from '@angular/core';


interface Country {
  make: string;
  model: string;
  year: string | number;
  offer: string;
  status: string;
}

const COUNTRIES: Country[] = [
  {
    make: 'ACURA',
    model: '4RUNNER 2WD V6',
    year: 1993,
    offer: '19865',
    status: 'pending'
  }, {
    make: 'AUDI',
    model: '4RUNNER 4WD 4C',
    year: 1993,
    offer: '19865',
    status: 'pending'
  },
  {
    make: 'BUICK',
    model: 'CAMRY 4C',
    year: 1993,
    offer: '19865',
    status: 'pending'
  },
  {
    make: 'CADILLAC',
    model: 'CAMRY V6',
    year: 1993,
    offer: '19865',
    status: 'pending'
  }
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  countries = COUNTRIES;
}
