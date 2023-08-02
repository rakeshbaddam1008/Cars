import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { IVechileDetailQuestionaire } from '../questionsJson';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-vechile-details',
  templateUrl: './vechile-details.component.html',
  styleUrls: ['./vechile-details.component.css'],
})
export class VechileDetailsComponent {
  // sellerDetails: ISellerVechileDetails;
  vechileQuestionaire: IVechileDetailQuestionaire;

  selectVechileDetails?: IVechileModelDetails;
  @Input() formData: FormData[] | undefined;
  @Output() stepOneValidated = new EventEmitter<boolean>();


  submitted: boolean | undefined;

  carTransmissionTypes = ['manual', 'automatic', 'others'];
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
  vehicleDetailsFormGroup: FormGroup = new FormGroup({});
  constructor(
    public _nhtsaervice: NHTSAService,
    public _store: SellCarStoreService,
    public reviewService: ReviewService
  ) {
    this.vechileQuestionaire = this._store.sellerCompleteDetails.vehicleDetails;
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;

    this.vehicleDetailsFormGroup = new FormGroup({
      carTitle: new FormControl(this.vechileQuestionaire.carTitle, Validators.required),
      carLoan: new FormControl(this.vechileQuestionaire.carLoan, Validators.required),
      mileage: new FormControl(this.vechileQuestionaire.mileage, [Validators.required, Validators.max(400000)]),
      color: new FormControl(this.vechileQuestionaire?.color, Validators.required),
      zipCode: new FormControl(this.vechileQuestionaire?.zipCode, [Validators.required, Validators.minLength(5)]),
      vechileTransmissionType: new FormControl(this.vechileQuestionaire?.vechileTransmissionType, Validators.required),
    });
  }

  radioChange(event: any) {
    if (event.value === 'No Title') {
      this.reviewService.activateContactPage = true;
    } else {
      this.reviewService.activateContactPage = false;
    }
  }
  onSubmit() {
    if (this.vehicleDetailsFormGroup.valid) {
      this.stepOneValidated.emit(true);
      this._store.sellerCompleteDetails.vehicleDetails = this.vechileQuestionaire
    } else {
      this.stepOneValidated.emit(false);
    }
  }

  ngOnInit() {
    this.vehicleDetailsFormGroup.markAllAsTouched();
    this.vehicleDetailsFormGroup.valueChanges.subscribe((formData) => {
      this.vechileQuestionaire = { ...formData }
      this.onSubmit()
    })
  }
}
