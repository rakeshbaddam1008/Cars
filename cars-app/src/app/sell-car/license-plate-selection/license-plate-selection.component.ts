import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, of, startWith } from 'rxjs';
import { IState } from 'src/app/models/IState';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { AlertService } from 'src/app/services/alert.service';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { MockDataService } from 'src/app/services/mock-data.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-license-plate-selection',
  templateUrl: './license-plate-selection.component.html',
  styleUrls: ['./license-plate-selection.component.css'],
})
export class LicensePlateSelectionComponent implements OnInit {
  states: string[] = [];
  filteredOptions: Observable<string[]> = of([]);
  myStateControl = new FormControl();
  isLoading: boolean = false;

  licensePlateSelection = new FormGroup({
    licensePlate: new FormControl('', Validators.required),
    selectedState: new FormControl('', Validators.required),
  });

  constructor(
    public _dataService: CommondataSellService,
    public _sellCarService: SellCarStoreService,
    private router: Router,
    private _nhtsa: NHTSAService,
    private alertService: AlertService
  ) {
    this._dataService.getUSStates().subscribe(
      (res) => {
        console.log(res);
        this.states = res.sort();
        this.filteredOptions = this.myStateControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      },
      (error) => this.alertService.error(error.message)
    );

    // pipe(ap((r) => r.code);
    // });
  }
  ngOnInit(): void {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return filterValue == ''
      ? this.states
      : this.states?.filter((option) =>
          option.toLowerCase().includes(filterValue)
        );
  }

  //Handle Errors if we submit
  onSubmit(): void {
    if (
      !this.licensePlateSelection.controls.licensePlate.valid &&
      !this.myStateControl.value
    ) {
      return;
    }
    // this.getErrorMessage()
    this.isLoading = true;
    this._nhtsa
      .getVechileDetailsByRegistrationDetails(
        this.licensePlateSelection.controls.licensePlate.value ?? '',
        this.myStateControl.value ?? ''
      )
      .subscribe(
        (res) => {
          let carSelection: IVechileModelDetails = res.licensePlateLookup;
          this.isLoading = false;
          carSelection.plateNumber =
            this.licensePlateSelection.controls.licensePlate.value ?? '';
          carSelection.state = this.myStateControl.value;
          this._sellCarService.sellerCompleteDetails.carDetails = carSelection;

          this.router.navigate(['/questionaire']);
        },
        (error) => {
          this.alertService.error(error.message);
          this.isLoading = false;
        }
      );
  }
}
