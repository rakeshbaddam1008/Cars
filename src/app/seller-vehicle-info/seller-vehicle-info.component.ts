import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { IMake, groupMakesData } from '../shared utilities/models/IState';
import { ApiService } from '../shared utilities/services/api.service';
import { SellerVehicleInfo } from '../shared utilities/models/SellerInfo.modal';

@Component({
  selector: 'app-seller-vehicle-info',
  templateUrl: './seller-vehicle-info.component.html',
  styleUrls: ['./seller-vehicle-info.component.css']
})
export class SellerVehicleInfoComponent {
  carTransmissionTypes = ['Manual', 'Automatic', 'Others'];
  CarTitleOptions: string[] = ['Clean', 'Salvage/Rebuilt', 'Junk', 'No Title'];
  CarOwnershipOptions: string[] = ['Yes', 'No']; //['Own', 'Lease', 'Re-finance'];
  CarColorOptions: string[] = [
    'Black',
    'White',
    'Grey',
    'Silver',
    'Blue',
    'Red',
    'Gold',
    'Green',
    'Yellow',
    'other',
  ];
  BodyDamageOptions: string[] = ['No Damage', 'Some damage', 'Crashed'];
  BodyNoticableDentsScratcheOptions = ['Less than 3', '4 to 6', '7 and more'];
  acceptanceStatus: string[] = ['ACCEPTED', 'PENDING', 'REJECTED']

  vechileInfoFormGroup: FormGroup;
  years: number[] = [];
  makesList?: Observable<groupMakesData[]>;
  modelList?: Observable<string[]>;
  trimList?: Observable<string[]>;
  makes: groupMakesData[] = [];
  model: string[] = [];
  enableSaveButton: boolean = false;

  constructor(private apiService: ApiService) {
    this.makesList = of([]);
    this.modelList = of([]);
    this.trimList = of([]);

    this.vechileInfoFormGroup =   new FormGroup({
      seller_id : new FormControl(),
      vehicle_id: new FormControl(),
      year: new FormControl(1991, Validators.required),
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      trim: new FormControl('', Validators.required),
      vin: new FormControl('', Validators.required),
      plate_number: new FormControl('', Validators.required),
      title: new FormControl('Clean'),
      mileage: new FormControl('', Validators.required),
      loan_vehicle: new FormControl(),
      does_car_drive: new FormControl(),
      does_car_start: new FormControl(),
      has_engine_transmission: new FormControl(),
      does_need_mech_work: new FormControl(),
      kind_of_mech_work_needed: new FormGroup({
        warningLights: new FormControl(false),
        Electrical: new FormControl(false),
        Mechanical: new FormControl(false),
        Suspension: new FormControl(false),
        Other: new FormControl(false),
      }),
      are_body_panels_intact: new FormControl(),
      are_all_tires_attached: new FormControl(),
      ever_been_in_flood_or_fire: new FormControl(),
      is_windshield_broken: new FormControl(),
      has_body_damage: new FormControl(),
      has_airbags: new FormControl(),
      are_interiors_intact: new FormControl(),
      body_damage_severity: new FormControl(),
      number_of_dents_or_scratches: new FormControl(),
      adj_mmr_price: new FormControl('', Validators.required),
      fixed_price: new FormControl('', Validators.required),
      damage_percent: new FormControl('', Validators.required),
      non_runner_percent: new FormControl('', Validators.required),
      start_only_percent: new FormControl('', Validators.required),
      default_percent: new FormControl('', Validators.required),
      total_reduction_percent: new FormControl('', Validators.required),
      instant_offer_price: new FormControl('', Validators.required),
      acceptance_status: new FormControl(),
      vehicle_transmission_type: new FormControl(),
      vehicle_color: new FormControl(),
      vehicle_weight: new FormControl('', Validators.required),
      vehicle_owner_name: new FormControl('', Validators.required),
      vehicle_pickup_street_address: new FormControl('', Validators.required),
      vehicle_pickup_apt_nos: new FormControl('', Validators.required),
      vehicle_counties_location: new FormControl('', Validators.required),
      vehicle_city_location: new FormControl('', Validators.required),
      vehicle_state_location: new FormControl('', Validators.required),
      vehicle_pickup_zipcode: new FormControl('', Validators.required),
    })

    this.generateYearList()
  }

  ngOnInit() {
    this.apiService.getAllMakes(this.vechileInfoFormGroup.get('year')?.value)
      .subscribe((s) => {
        this.makes = this.groupBy(s);
        this.makesList = this.vechileInfoFormGroup.get('make')?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
      this.apiService.getModel(
        this.vechileInfoFormGroup.get('year')?.value,
        this.vechileInfoFormGroup.get('make')?.value ?? 'TOYOTA'
      )
      .subscribe((s) => {
        this.model = s;
        this.modelList = this.vechileInfoFormGroup.get('model')?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterModel(value))
        );
      });
      this.trimList = this.apiService.getTrim(
        this.vechileInfoFormGroup.get('year')?.value,
        this.vechileInfoFormGroup.get('make')?.value ?? 'TOYOTA',
        this.vechileInfoFormGroup.get('model')?.value ?? 'COROLLA'
      );
    this.apiService.getSellerVehicleAdminData(this.apiService.seller_id).subscribe((item: SellerVehicleInfo[]) => {
      this.vechileInfoFormGroup.patchValue(item[0]);
    })
    
    this.vechileInfoFormGroup.valueChanges.subscribe((changes) => {
      this.enableSaveButton = true
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
      this.years.push(year);
    }
  }

  saveSellerVehicleInfo(){
    this.apiService.saveSellerVehicleInfo(this.vechileInfoFormGroup.value).subscribe((res) => {
      console.log(res)
    });
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
