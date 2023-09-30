import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared utilities/services/api.service';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.css']
})
export class SellerInfoComponent {
  sellerInfo: FormGroup;
  displaySellerDetails: boolean = false;
  constructor(private apiService: ApiService) {
    this.sellerInfo = new FormGroup({
      seller_id : new FormControl(),
      email_id : new FormControl(),
      password : new FormControl(null, Validators.required),
      customer_contact_number : new FormControl(null, Validators.required),
      charity_name : new FormControl(null, Validators.required),
      donor_email : new FormControl(null, Validators.required),
      customer_name : new FormControl(null, Validators.required),
      vehicle_owner_name  : new FormControl(null, Validators.required),
      payee_name : new FormControl(null, Validators.required),
      location_type : new FormControl(null, Validators.required),
      apt_number : new FormControl(null, Validators.required),
      street_address_line1 : new FormControl(null, Validators.required),
      street_address_line2 : new FormControl(null, Validators.required),
      city : new FormControl(null, Validators.required),
      zip_code : new FormControl(null, Validators.required),
    })
  }

  ngOnInit() {
    //
  }
}
