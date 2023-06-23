import { Component } from '@angular/core';
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
  vin: string = '';
  constructor(
    public dataService: CommondataSellService,
    private router: Router,
    private _bottomSheet: MatBottomSheet
  ) {}

  go() {
    this.dataService.vin = this.vin;
    this.router.navigate(['/questionaire']);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(WhatIsVinComponent);
  }
}
