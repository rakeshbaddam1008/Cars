import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { WhatIsVinComponent } from 'src/app/common/what-is-vin/what-is-vin.component';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';

@Component({
  selector: 'app-vin-selection',
  templateUrl: './vin-selection.component.html',
  styleUrls: ['./vin-selection.component.css'],
})
export class VinSelectionComponent {
  constructor(
    public dataService: CommondataSellService,
    private router: Router,
    private _bottomSheet: MatBottomSheet
  ) {}
  vin = new FormControl('', [Validators.required, Validators.minLength(17)]);

  go() {
    this.router.navigate(['/questionaire']);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(WhatIsVinComponent);
  }
}
