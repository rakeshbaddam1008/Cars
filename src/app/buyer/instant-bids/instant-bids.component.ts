import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { IMake, groupMakesData } from 'src/app/shared utilities/models/IState';
import { ApiService } from 'src/app/shared utilities/services/api.service';

@Component({
  selector: 'app-instant-bids',
  templateUrl: './instant-bids.component.html',
  styleUrls: ['./instant-bids.component.css']
})
export class InstantBidsComponent {
  instantBid: FormGroup;
  displayCampaignDetails: boolean = true;
  makesList?: Observable<groupMakesData[]>;
  modelList?: Observable<string[]>;
  trimList?: Observable<string[]>;
  makes: groupMakesData[] = [];
  model: string[] = [];
  years: number[] = [];
  endYears: number[] = [];  
  constructor(private apiService: ApiService) {
    this.makesList = of([]);
    this.modelList = of([]);
    this.trimList = of([]);
    
    this.instantBid = new FormGroup({
      campaign_id : new FormControl(),
      campaign_name : new FormControl(),
      campaign_status : new FormControl(),
      bid_id : new FormControl(),
      bid_name : new FormControl(),
      bid_status : new FormControl(),
      bid_amount : new FormControl(),
      make : new FormControl(),
      model : new FormControl(),
      trim : new FormControl(),
      start_year : new FormControl(),
      end_year : new FormControl(),
      body_style : new FormControl(),
      any_vehicle_condition : new FormControl(),
      only_vehicle_that_run_and_drive : new FormControl(),
      only_vehicle_with_engine_and_transmission : new FormControl(),
      only_vehicle_with_all_tires : new FormControl(),
      only_vehicle_with_no_exterior_damage : new FormControl(),
      mileage : new FormControl(),
    })
  }

  ngOnInit(){
    this.generateYearList()
    this.apiService.getAllMakes(this.instantBid.get('year')?.value)
      .subscribe((s) => {
        this.makes = this.groupBy(s);
        this.makesList = this.instantBid.get('make')?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
      this.apiService.getModel(
        this.instantBid.get('year')?.value,
        this.instantBid.get('make')?.value ?? 'TOYOTA'
      )
      .subscribe((s) => {
        this.model = s;
        this.modelList = this.instantBid.get('model')?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterModel(value))
        );
      });
      this.trimList = this.apiService.getTrim(
        this.instantBid.get('year')?.value,
        this.instantBid.get('make')?.value ?? 'TOYOTA',
        this.instantBid.get('model')?.value ?? 'COROLLA'
      );
    
    this.instantBid.get('start_year')?.valueChanges.subscribe((res) => {
      this.instantBid.get('end_year')?.setValue(null)
      this.generateEndYears(this.instantBid.get('start_year')?.value);
    })


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

  generateYearList(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1991;

    for (let year = startYear; year <= currentYear; year++) {
      this.endYears.push(year);
      this.years.push(year);
    }
  }

  generateEndYears(star: number) {
    this.endYears = []
    const currentYear = new Date().getFullYear();
    const startYear = star;
    for (let year = startYear; year <= currentYear; year++) {
      this.endYears.push(year);
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
