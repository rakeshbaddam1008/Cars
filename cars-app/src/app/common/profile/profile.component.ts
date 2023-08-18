import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISellerVehicle } from 'src/app/models/ISellVechile';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileFormGroup: FormGroup = new FormGroup({})
  sellerVehicleDetails: Observable<ISellerVehicle[]> = of([]);

  constructor(private router: Router) {
    this.profileFormGroup = new FormGroup({});
  }

  ngOnInit(): void {
  }
}
