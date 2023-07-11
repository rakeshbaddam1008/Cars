import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IState } from 'src/app/models/IState';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { MockDataService } from 'src/app/services/mock-data.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-license-plate-selection',
  templateUrl: './license-plate-selection.component.html',
  styleUrls: ['./license-plate-selection.component.css'],
})
export class LicensePlateSelectionComponent implements OnInit {
  states: Observable<IState[]>;
  licensePlateSelection = new FormGroup({
    licensePlate: new FormControl('', Validators.required),
    selectedState: new FormControl('', Validators.required),
  });

  constructor(
    public _dataService: CommondataSellService,
    public _sellCarService: SellCarStoreService,
    private router: Router,
    private _nhtsa: NHTSAService
  ) {
    this.states = this._dataService.getUSStates();
  }
  ngOnInit(): void {}

  onSubmit(): void {
    this._nhtsa
      .getVechileDetailsByRegistrationDetails(
        this.licensePlateSelection.controls.licensePlate.value ?? '',
        this.licensePlateSelection.controls.selectedState.value ?? ''
      )
      .subscribe((res) => {
        this._sellCarService.sellerCompleteDetails.vechile =
          res.licensePlateLookup;
        this.router.navigate(['/questionaire']);
      });
  }
}
