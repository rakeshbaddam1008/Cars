import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IState } from 'src/app/models/IState';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { MockDataService } from 'src/app/services/mock-data.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-license-plate-selection',
  templateUrl: './license-plate-selection.component.html',
  styleUrls: ['./license-plate-selection.component.css'],
})
export class LicensePlateSelectionComponent implements OnInit {
  states: IState[];
  selectedState: string = '';
  selectedNumberPlate: string = '';

  licensePlateSelection = new FormGroup({
    licensePlate: new FormControl('', Validators.required),
    selectedState: new FormControl('', Validators.required),
  });

  constructor(
    public _dataService: MockDataService,
    public _sellCarService: SellCarStoreService,
    private router: Router,
    private _nhtsa: NHTSAService
  ) {
    this.states = [];
  }
  ngOnInit(): void {
    this.states = this._dataService.getStates();
  }

  onSubmit(): void {
    this._nhtsa
      .getVechileDetailsByRegistrationDetails(
        this.selectedNumberPlate,
        this.selectedState
      )
      .subscribe((res) => {
        this._sellCarService.sellerCompleteDetails.vechile = res;
      });
  }
}
