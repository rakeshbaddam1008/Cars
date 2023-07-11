import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { WhatIsVinComponent } from 'src/app/common/what-is-vin/what-is-vin.component';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-vin-selection',
  templateUrl: './vin-selection.component.html',
  styleUrls: ['./vin-selection.component.css'],
})
export class VinSelectionComponent {
  constructor(
    public dataService: SellCarStoreService,
    private router: Router,
    private _nhtsaervice: NHTSAService,
    private _bottomSheet: MatBottomSheet
  ) {}
  vin = new FormControl('', [Validators.required, Validators.minLength(17)]);

  go() {
    this._nhtsaervice.getVechileDetailsByVIN(this.vin.value ?? '').then((s) =>
      this.dataService.setCurrentSellVechileDetails({
        make: s.Make,
        model: s.Model,
        year: parseInt(s.ModelYear),
        style: '',
        mileage: 0,
        trim: '',
      })
    );

    this.router.navigate(['/questionaire']);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(WhatIsVinComponent);
  }
}
