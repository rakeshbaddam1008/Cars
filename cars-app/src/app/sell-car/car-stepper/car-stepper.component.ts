import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ViewEncapsulation, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-car-stepper',
  templateUrl: './car-stepper.component.html',
  styleUrls: ['./car-stepper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CarStepperComponent {
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  sellerDetails: ISellerVechileDetails | undefined;
  selectVechileDetails?: IVechileModelDetails;

  constructor(
    private _formBuilder: FormBuilder,
    public _store: SellCarStoreService,
    private renderer: Renderer2
  ) {
    // this._store.loadSellerDetails();
    this.selectVechileDetails = this._store.sellerCompleteDetails.vechile;
  }

  ngAfterViewInit() {
    const stepperHeaderElements = document.querySelectorAll('.mat-step-icon');
    
    stepperHeaderElements.forEach((headerElement, index) => {
      const color = this.getStepIconColor(index);
      this.renderer.setStyle(headerElement, 'background-color', color);
    });
  }
  getStepIconColor(stepIndex: number): string {
    switch (stepIndex) {
      case 0:
        return '#ff0000'; // Red
      case 1:
        return '#ffd800'; // yellow
      case 2:
        return '#ffd800'; // green
      default:
        return '#10ff0a'; 
    }
  }
}
