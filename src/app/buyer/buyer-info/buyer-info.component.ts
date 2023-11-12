import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuyerInfo } from 'src/app/shared utilities/models/buyer';
import { ApiService } from 'src/app/shared utilities/services/api.service';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.css']
})
export class BuyerInfoComponent {
  buyerInfo: FormGroup;
  displayBuyerDetails: boolean = true;
  enableSaveButton: boolean = false;
  originalForm: any;

  constructor(private apiService: ApiService) {
    this.buyerInfo = new FormGroup({
      buyer_id : new FormControl(),
      buyer_type : new FormControl(),
      first_name : new FormControl(),
      last_name : new FormControl(),
      license_number : new FormControl(), 
      license_expiry : new FormControl(),
      company_name : new FormControl(),
      building_number : new FormControl(),
      street_address_line1 : new FormControl(),
      street_address_line2 : new FormControl(),
      city : new FormControl(),
      state : new FormControl(),
      country : new FormControl(),
      zipcode : new FormControl(),
      contact_number_1 : new FormControl(),
      office_number_1 : new FormControl(),
      contact_number_2 : new FormControl(),
      office_number_2 : new FormControl(),
      credit_limit : new FormControl(),
      updated_limit : new FormControl(),
      number_of_vehicles : new FormControl(),
      email_id : new FormControl(null, [ Validators.email]),
      api_url : new FormControl(),
      status : new FormControl()
    })
  }

  ngOnInit(){
    this.originalForm = this.buyerInfo.value
    this.buyerInfo.valueChanges.subscribe((changes) => {
      const changesExceptEmail = Object.keys(changes).some(key => key !== 'email_id' && changes[key] !== this.originalForm[key]);

      if (changesExceptEmail) {
        this.enableSaveButton = true;
      } else {
        // Disable the save button
        // Code to disable the save button
      }
    })
  }

  searchForBuyerInfo() {
    if(!this.buyerInfo.get('email_id')?.hasError('email')) {
      this.apiService.getBuyerInfoData(this.buyerInfo.get('email_id')?.value).subscribe((item: BuyerInfo[]) => {
        this.buyerInfo.patchValue(item[0])
        this.apiService.buyer_id = item[0].buyer_id.toString();
        this.displayBuyerDetails = true
        // this.apiService.getSellerVehicleAdminData(this.buyerInfo.get('buyer_id')?.value.toString()).subscribe(item => console.log(item))
      })
    }
  }


  saveBuyerInfo(){
    this.apiService.saveBuyerInfo(this.buyerInfo.value).subscribe((res) => {
      console.log(res)
    });
  }
}
