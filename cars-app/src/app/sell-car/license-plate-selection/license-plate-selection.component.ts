import { Component, OnInit } from '@angular/core';
import { IState } from 'src/app/models/IState';
import { MockDataService } from 'src/app/services/mock-data.service';

@Component({
  selector: 'app-license-plate-selection',
  templateUrl: './license-plate-selection.component.html',
  styleUrls: ['./license-plate-selection.component.css'],
})
export class LicensePlateSelectionComponent implements OnInit {
  states: IState[];
  selectedState: string | undefined;

  constructor(public _dataService: MockDataService) {
    this.states = [];
  }
  ngOnInit(): void {
    this.states = this._dataService.getStates();
  }
}
