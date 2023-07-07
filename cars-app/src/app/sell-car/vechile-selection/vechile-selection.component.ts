import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { VechileYears } from 'src/app/constants.ts/constants';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-vechile-selection',
  templateUrl: './vechile-selection.component.html',
  styleUrls: ['./vechile-selection.component.css'],
})
export class VechileSelectionComponent {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  VechileRegisterationList: Number[];

  makesList: Observable<string[]>;
  modelList: Observable<string[]>;
  trimList: Observable<string[]>;

  manualVechileSelectionForm = new FormGroup({
    yearSelected: new FormControl(1990, Validators.required),
    selectedMake: new FormControl('', Validators.required),
    selectedModel: new FormControl('', Validators.required),
    selectedStyle: new FormControl('', Validators.required),
  });

  constructor(private _service: NHTSAService) {
    this.VechileRegisterationList = VechileYears;
    this.makesList = of([]);
    this.modelList = of([]);
    this.trimList = of([]);
  }

  yearSelectionChange() {
    this.makesList = this._service.getMakes(
      this.manualVechileSelectionForm.controls.yearSelected.value ?? 1990
    );
    this.modelList = of([]);
    this.trimList = of([]);
  }

  makeSelectionChange() {
    this.modelList = this._service.getModel(
      this.manualVechileSelectionForm.controls.yearSelected.value ?? 1990,
      this.manualVechileSelectionForm.controls.selectedMake.value ?? ''
    );
    this.trimList = of([]);
  }

  modelSelectionChange() {
    this.trimList = this._service.getTrim(
      this.manualVechileSelectionForm.controls.yearSelected.value ?? 1990,
      this.manualVechileSelectionForm.controls.selectedMake.value ?? '',
      this.manualVechileSelectionForm.controls.selectedStyle.value ?? ''
    );
  }
  selectedTrim: string = '';

  trimSelectionChange() {}

  onSubmit(): void {
    // this._nhtsa
    //   .getVechileDetailsByRegistrationDetails(
    //     this.licensePlateSelection.controls.licensePlate.value ?? '',
    //     this.licensePlateSelection.controls.selectedState.value ?? ''
    //   )
    //   .subscribe((res) => {
    //     this._sellCarService.sellerCompleteDetails.vechile = res;
    //   });
  }
}
