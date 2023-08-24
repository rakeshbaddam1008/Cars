import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, startWith } from 'rxjs';
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
  makelistControl = new FormControl();
  modelControl = new FormControl();
  selectedTrim = new FormControl();
  makes: groupMakesData[] = [];
  model: string[] = [];

  makesList: Observable<groupMakesData[]>;
  modelList: Observable<string[]>;
  trimList: Observable<string[]>;

  manualVechileSelectionForm: FormGroup;

  constructor(
    private _service: NHTSAService,
    public _store: SellCarStoreService,
    public router: Router,
    private toaster: ToastrService,
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
    this.makelistControl.setValue('');
    this.modelControl.setValue('');
    // this.makesList =
    this._service
      .getAllMakes(this.manualVechileSelectionForm.value.yearSelected ?? 1990)
      .subscribe((s) => {
        this.makes = this.groupBy(s);

        this.makesList = this.makelistControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
    this.modelList = of([]);
    this.trimList = of([]);
  }

  groupBy(list: IMake[]): groupMakesData[] {
    let groupData: groupMakesData[] = [];

    groupData.push({
      groupName: 'Popular',
      makes: list.filter((s) => s.isPopuplarmake == 'Y').map((s) => s.make),
    } as groupMakesData);
    groupData.push({
      groupName: 'All Makes',
      makes: list.filter((s) => s.isPopuplarmake == 'N').map((s) => s.make),
    } as groupMakesData);

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

  makeSelectionChange(event: any) {
    this.modelControl.setValue('');
    this.trimList = of([]);

    this.manualVechileSelectionForm.controls['selectedMake'].setValue(this.makelistControl.value)
    this._service
      .getModel(
        this.manualVechileSelectionForm.value.yearSelected,
        this.manualVechileSelectionForm.value.selectedMake ?? 'TOYOTA'
      )
      .subscribe((s) => {
        this.model = s;
        this.modelList = this.modelControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterModel(value))
        );
      });
  }

  modelSelectionChange(e: any) {
    this.manualVechileSelectionForm.controls['selectedModel'].setValue(this.modelControl.value)

    this.trimList = this._service.getTrim(
      this.manualVechileSelectionForm.value.yearSelected ?? 1990,
      this.makelistControl.value ?? 'TOYOTA',
      this.modelControl.value ??
      'COROLLA'
    );
  }

  trimSelectionChange() { }

  onSubmit(): void {

    if (this.getErrorMessage()) {
      return;
    }
    this.isLoading = true;
    // setTimeout(() => (this.isLoading = false), 10000);

    let carSelection = new IVechileModelDetails();
    carSelection.make = this.makelistControl.value;
    carSelection.model = this.modelControl.value;
    carSelection.trim = this.selectedTrim.value;
    carSelection.year = this.manualVechileSelectionForm.value.yearSelected;

    carSelection.plateNumber = '';
    carSelection.state = '';
    carSelection.vin = '';
    //     year?: Number;
    // make?: string;
    // model?: string;
    // trim?: string;
    // vin?: string;
    // plateNumber?: string;
    // state?: string;
    this._store.setCurrentSellVechileDetails(carSelection)
    this.router.navigate(['/questionaire']);
  }

  getErrorMessage() {
    let invalid: boolean = true;
    if (this.yearSelected?.invalid) {
      // this.toaster.error('Please Select Year', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
      return invalid;
    } else if (this.makelistControl.invalid) {
      // this.toaster.error('Please Select Make', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
      return invalid;

    } else if (this.modelControl.invalid) {
      // this.toaster.error('Please Select Model', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
      return invalid;
    } else if (this.selectedTrim.invalid) {
      // this.toaster.error('Please Select Trim', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
      return invalid;
    } else {
      return false;
    }
  }

  validateTextField(event: any, field: string) {
    if (field === 'Make') {
      this.makes.map((group) => {
        if (
          group.makes.some(
            (item) =>
              this.makelistControl.value.toLowerCase() === item.toLowerCase()
          )
        ) {
          return;
        } else {
          this.makelistControl.setValue('');
          this.modelControl.setValue('');
        }
      });
    }
  }

  private _filter(value: string): groupMakesData[] {
    const filterValue = value.toLowerCase();

    return this.makes
      .map((group) => ({
        groupName: group.groupName,
        makes: group.makes.filter((make) =>
          make.toLowerCase().includes(filterValue)
        ),
      }))
      .filter((group) => group.makes.length > 0);
  }

  private _filterModel(value: string): string[] {
    const filterValue = value.toLowerCase();
    return filterValue == ''
      ? this.model
      : this.model?.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
  }
}

export class groupMakesData {
  groupName!: string;
  makes!: string[];
}
