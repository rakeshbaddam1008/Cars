import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { VechileYears } from 'src/app/constants.ts/constants';
import { IMake } from 'src/app/models/IState';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
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
  isLoading: boolean = false;

  makesList: Observable<groupMakesData[]>;
  modelList: Observable<string[]>;
  trimList: Observable<string[]>;

  manualVechileSelectionForm: FormGroup;

  constructor(
    private _service: NHTSAService,
    public _store: SellCarStoreService,
    public router: Router
  ) {
    this.VechileRegisterationList = VechileYears;
    this.makesList = of([]);
    this.modelList = of([]);
    this.trimList = of([]);
    this.manualVechileSelectionForm = new FormGroup({
      yearSelected: new FormControl(0, Validators.required),
      selectedMake: new FormControl('', Validators.required),
      selectedModel: new FormControl('', Validators.required),
      selectedStyle: new FormControl('', Validators.required),
    });
  }
  get yearSelected() {
    return this.manualVechileSelectionForm.get('yearSelected');
  }
  yearSelectionChange(e: any) {
    this.yearSelected?.setValue(e?.value, {
      emitEvent: true,
    });
    this.makesList = of([]);

    // this.makesList =
     this._service.getAllMakes(
      this.manualVechileSelectionForm.value.yearSelected ?? 1990
    ).subscribe(s=>{
      this.makesList =of( this.groupBy(s));
    });
    this.modelList = of([]);
    this.trimList = of([]);
  }
  
  groupBy(list: IMake[]): groupMakesData[] {

    let groupData:groupMakesData[]=[];

    groupData.push({groupName:"Popular",makes:list.filter(s=>s.isPopuplarmake=="Y").map(s=>s.make)} as groupMakesData);
    groupData.push({groupName:  "All Makes", makes:list.filter(s=>s.isPopuplarmake=="N").map(s=>s.make) }as groupMakesData);

    return groupData;
  }

  // groupBy(list: any[], key: string): Map<string, Array<any>> {
  //   let map = new Map();
  //   list.map((val) => {
  //     if (!map.has(val[key])) {
  //       map.set(
  //         val[key],
  //         list.filter((data) => data[key] == val[key])
  //       );
  //     }
  //   });
  //   return map;
  // }

  makeSelectionChange() {
    this.modelList = this._service.getModel(
      this.manualVechileSelectionForm.value.yearSelected,
      this.manualVechileSelectionForm.value.selectedMake ?? ''
    );
    this.trimList = of([]);
  }

  modelSelectionChange(e: any) {
    this.trimList = this._service.getTrim(
      this.manualVechileSelectionForm.value.yearSelected ?? 1990,
      this.manualVechileSelectionForm.value.selectedMake ?? '',
      e?.value ?? this.manualVechileSelectionForm.value.selectedModel ?? ''
    );
  }
  selectedTrim: string = '';

  trimSelectionChange() {}

  onSubmit(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 10000);

    let carSelection = new IVechileModelDetails();
    carSelection.make = this.manualVechileSelectionForm.value.selectedMake;
    carSelection.model = this.manualVechileSelectionForm.value.selectedModel;
    carSelection.trim = this.manualVechileSelectionForm.value.selectedTrim;
    carSelection.year = this.manualVechileSelectionForm.value.yearSelected;
    //     year?: Number;
    // make?: string;
    // model?: string;
    // trim?: string;
    // vin?: string;
    // plateNumber?: string;
    // state?: string;
    this._store.setCurrentSellVechileDetails(carSelection);
    this.router.navigate(['/questionaire']);
  }
}


export class groupMakesData{
  groupName!:string;
  makes!:string[];
}
