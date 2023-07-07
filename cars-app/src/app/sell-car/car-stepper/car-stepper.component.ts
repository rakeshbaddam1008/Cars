import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IVechileData } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';

@Component({
  selector: 'app-car-stepper',
  templateUrl: './car-stepper.component.html',
  styleUrls: ['./car-stepper.component.css'],
})
export class CarStepperComponent {
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  sellerDetails: ISellerVechileDetails | undefined;
  selectVechileDetails: IVechileData | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    public _store: SellCarStoreService
  ) {
    this._store.loadSellerDetails();
    this.selectVechileDetails = this._store.sellerCompleteDetails.vechile;
  }
}
