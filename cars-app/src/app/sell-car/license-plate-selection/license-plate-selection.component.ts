import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private alertService: AlertService,
    private toaster: ToastrService,
  ) {
    this._dataService.getUSStates().subscribe(
      (res) => {
        this.states = res.sort();
        this.filteredOptions = this.myStateControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      },
      (error) => {
        this.toaster.error('Error in Loading States Please Refresh Page', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
      }
    );

    // pipe(ap((r) => r.code);
    // });
  }
  ngOnInit(): void { }

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
    this.licensePlateSelection.controls['selectedState'].setValue(this.myStateControl.value);

    if (
      this.licensePlateSelection.invalid ||
      this.myStateControl.invalid
    ) {
      // this.getErrorMessage()
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
          let carSelection: IVechileModelDetails =
            res.licensePlateLookup as IVechileModelDetails;
          this.isLoading = false;
          carSelection.plateNumber =
            this.licensePlateSelection.controls.licensePlate.value ?? '';
          carSelection.state = this.myStateControl.value;
          // carSelection.make = '';
          // carSelection.model = '';
          // carSelection.trim = '';
          // carSelection.vin = '';
          this._sellCarService.setCurrentSellVechileDetails(carSelection);

          this.router.navigate(['/questionaire']);
        },
        (error: Error) => {
          if (error.message.includes('404')) {
            this.toaster.error('Error: 404 Not Found', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
          } else {
            this.toaster.error('Error ' + error.message, 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
          }
          this.isLoading = false;
        }
      );
  }

  getErrorMessage() {
    if (this.licensePlateSelection.controls.licensePlate.invalid) {
      this.toaster.error('License Plate is required field', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
    }
    if (this.myStateControl.invalid) {
      this.toaster.error('State is a required field please select state from the below options.', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })

    }
  }
}
