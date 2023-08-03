import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { WhatIsVinComponent } from 'src/app/common/what-is-vin/what-is-vin.component';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { AlertService } from 'src/app/services/alert.service';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-vin-selection',
  templateUrl: './vin-selection.component.html',
  styleUrls: ['./vin-selection.component.css'],
})
export class VinSelectionComponent {
  isLoading: boolean = false;
  constructor(
    public dataService: SellCarStoreService,
    private router: Router,
    private _nhtsaervice: NHTSAService,
    private _bottomSheet: MatBottomSheet,
    public alertService: AlertService
  ) {}
  vin = new FormControl('', [Validators.required, Validators.minLength(17)]);

  go() {
    //this.validateVinNumber();
    if (this.getErrorMessage() == '') {
      this.isLoading = true;

      this._nhtsaervice
        .getVechileDetailsByVIN(this.vin.value ?? '')
        .then((s) => {
          this.dataService.setCurrentSellVechileDetails({
            make: s.Make,
            model: s.Model,
            year: parseInt(s.ModelYear),
            state: '',
            plateNumber: '',
            trim: '',
            vin: this.vin.value ?? '',
          });

          this.isLoading = false;

          this.router.navigate(['/questionaire']);
        })
        .catch((e) => {
          this.isLoading = false;
          this.alertService.error(e);
        });
    }
  }
  getErrorMessage() {
    let message = '';
    if (this.vin.hasError('required')) {
      message = 'You must enter a value';
      // this.alertService.error(message)
      return message;
    }
    this.vin.hasError('minlength')
      ? (message = 'Not a valid VIN. VIN should be 17 alpha numeric charactes')
      : (message = '');
    if (message != '') {
      // this.alertService.error(message);
    }
    return message;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(WhatIsVinComponent);
  }
}
