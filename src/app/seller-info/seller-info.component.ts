import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared utilities/services/api.service';
import { SellerInfo } from '../shared utilities/models/SellerInfo.modal';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.css']
})
export class SellerInfoComponent {
  sellerInfo: FormGroup;
  enableSaveButton: boolean = false;
  displaySellerDetails: boolean = false;
  originalForm: any;
  constructor(private apiService: ApiService) {
    this.sellerInfo = new FormGroup({
      seller_id : new FormControl(),
      email_id : new FormControl(null, [ Validators.email]),
      password : new FormControl(null ),
      customer_contact_number : new FormControl(null, ),
      charity_name : new FormControl(null, ),
      donor_email : new FormControl(null, ),
      customer_name : new FormControl(null, ),
      vehicle_owner_name  : new FormControl(null, ),
      payee_name : new FormControl(null, ),
      location_type : new FormControl(null, ),
      apt_number : new FormControl(null, ),
      street_address_line1 : new FormControl(null, ),
      street_address_line2 : new FormControl(null, ),
      city : new FormControl(null, ),
      zip_code : new FormControl(null, ),
    })
  }

  ngOnInit() {
    // this.apiService.getSellerInfoAdminData().subscribe(item => console.log(item))
    this.sellerInfo.valueChanges.subscribe((changes) => {
        const changesExceptEmail = Object.keys(changes).some(key => key !== 'email_id' && changes[key] !== this.originalForm[key]);

      if (changesExceptEmail) {
        this.enableSaveButton = true;
      } else {
        // Disable the save button
        // Code to disable the save button
      }
    })
  }

  searchForSellerInfo() {
    // if(!this.sellerInfo.get('email_id')?.hasError('email')) {
      this.apiService.getSellerInfoAdminData(this.sellerInfo.get('email_id')?.value).subscribe((item: SellerInfo[]) => {
        this.sellerInfo.patchValue(item[0])
        this.apiService.seller_id = item[0].seller_id.toString();
        this.displaySellerDetails = true
        this.apiService.getSellerVehicleAdminData(this.sellerInfo.get('seller_id')?.value.toString()).subscribe(item => console.log(item))
      })
    // }
  }
  saveSellerInfo(){
    this.apiService.saveSellerInfo(this.sellerInfo.value).subscribe((res) => {
      console.log(res)
    });
  }
}
