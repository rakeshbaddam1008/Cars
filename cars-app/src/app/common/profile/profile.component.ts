import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISellerVehicle } from 'src/app/models/ISellVechile';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileFormGroup: FormGroup = new FormGroup({})
  sellerVehicleDetails: Observable<ISellerVehicle[]> = of([]);

  constructor(private router: Router) {
    this.profileFormGroup = new FormGroup({
      seller_id: new FormControl('', Validators.required),
      email_id: new FormControl('', Validators.required),
      customer_contact_number: new FormControl('', [Validators.required,
        Validators.pattern(/^[0-9\-]*$/), ]),
      charity_name: new FormControl('', Validators.required),
      donor_email: new FormControl('', [Validators.required,Validators.email ]),
      customer_name: new FormControl( '',Validators.required),
      vehicle_owner_name: new FormControl('', Validators.required),
      payee_name: new FormControl('', Validators.required),
      location_type: new FormControl('', [Validators.required,]),
      apt_number: new FormControl('', Validators.required),
      street_address_line1: new FormControl('', [Validators.required]),
      street_address_line2: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required,
        Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/),]),
    });
  }

  // "seller_id": 197,
  //   "email_id": "UI@willcoxsystems.com",
  //   "customer_contact_number": "8989809505",
  //   "charity_name": "",
  //   "donor_email": "",
  //   "customer_name": "Mithun",
  //   "vehicle_owner_name": "",
  //   "payee_name": "",
  //   "location_type": "",
  //   "apt_number": "",
  //   "street_address_line1": "",
  //   "street_address_line2": "",
  //   "city": "",
  //   "zip_code": "28215"

  ngOnInit(): void {
  }
}
