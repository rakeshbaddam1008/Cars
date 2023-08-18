import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISellerVehicle } from 'src/app/models/ISellVechile';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { Router } from '@angular/router';

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
    status: 'APPROVED',
  },
  {
    make: 'AUDI',
    model: '4RUNNER 4WD 4C',
    year: 1993,
    offer: '19865',
    status: 'REJECTED',
  },
  {
    make: 'BUICK',
    model: 'CAMRY 4C',
    year: 1993,
    offer: '19865',
    status: 'APPROVED',
  },
  {
    make: 'CADILLAC',
    model: 'CAMRY V6',
    year: 1993,
    offer: '19865',
    status: 'PENDING',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sellerVehicleDetails: Observable<ISellerVehicle[]> = of([]);

  constructor(private _service: NHTSAService,private router: Router) {}

  ngOnInit(): void {
    this.sellerVehicleDetails = this._service.getSellerVehicleDetails();
  }
  onOkClick() {
    this.router.navigate(['/questionaire']);
  }
  getStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'warning';
        break;
      case 'REJECTED':
      case 'Reject':
        return 'danger';
        break;
      case 'APPROVED':
      case 'ACCEPTED':
        return 'success';
        break;

      default:
        return 'warning';
    }
  }
}
