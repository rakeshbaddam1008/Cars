import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { VechileYears } from 'src/app/constants.ts/constants';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-vechile-selection',
  templateUrl: './vechile-selection.component.html',
  styleUrls: ['./vechile-selection.component.css'],
})
export class VechileSelectionComponent {
  yearSelected: Number = 1990;
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

  selectedMake: string = '';
  selectedModel: string = '';
  selectedStyle: string = '';

  constructor(private _service: NHTSAService) {
    this.VechileRegisterationList = VechileYears;
    this.makesList = of([]);
    this.modelList = of([]);
    this.trimList = of([]);
  }

  yearSelectionChange(selectedMake: Number) {
    this.makesList = this._service.getMakes(this.yearSelected);
    this.modelList = of([]);
    this.trimList = of([]);
  }

  makeSelectionChange(selectedMake: string) {
    this.modelList = this._service.getModel(
      this.yearSelected,
      this.selectedMake
    );
    this.trimList = of([]);
  }

  modelSelectionChange(selectedModel: string) {
    this.trimList = this._service.getTrim(
      this.yearSelected,
      this.selectedMake,
      this.selectedStyle
    );
    this.trimList = of([]);
  }
  selectedTrim: string = '';

  trimSelectionChange(selectedTrim: string) {}
}
