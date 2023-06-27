import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
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

  constructor(
    private _formBuilder: FormBuilder,
    public _store: SellCarStoreService
  ) {
    this._store.loadSellerDetails();
    this.sellerDetails = this._store.sellerCompleteDetails;
  }
}
