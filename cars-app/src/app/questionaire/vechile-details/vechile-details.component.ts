import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { IVechileDetailQuestionaire } from '../questionsJson';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { ReviewService } from 'src/app/services/review.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-vechile-details',
  templateUrl: './vechile-details.component.html',
  styleUrls: ['./vechile-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VechileDetailsComponent {
  private onDestroy$: Subject<void> = new Subject<void>();
  // sellerDetails: ISellerVechileDetails;
  public vechileQuestionaire: IVechileDetailQuestionaire;

  selectVechileDetails?: IVechileModelDetails;
  @Input() formData: FormData[] | undefined;
  @Output() stepOneValidated = new EventEmitter<boolean>();


  submitted: boolean | undefined;

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
  vehicleDetailsFormGroup: FormGroup;
  constructor(
    public _nhtsaervice: NHTSAService,
    public _store: SellCarStoreService,
    public reviewService: ReviewService,
  ) {
    this.vechileQuestionaire = new IVechileDetailQuestionaire();
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;

    this.vehicleDetailsFormGroup = new FormGroup({
      carTitle: new FormControl(null, Validators.required),
      carLoan: new FormControl(null,Validators.required),
      loanAmount: new FormControl(''),
      mileage: new FormControl(null, [Validators.required, Validators.max(400000)]),
      color: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, [Validators.required, Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)]),
      vechileTransmissionType: new FormControl(null, Validators.required),
    });
  }



  radioChange(event: any) {
    if (event.value === 'No Title') {
      this.reviewService.activateContactPage = true;
    } else {
      this.reviewService.activateContactPage = false;
    }
  }


  ngOnInit() {
    // this.vehicleDetailsFormGroup.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((formData) => {
    //   console.log(formData)
    //   this.vechileQuestionaire = { ...formData }
    // })
    this.vehicleDetailsFormGroup.get('carTitle')?.valueChanges.subscribe((value) => {
      this.vechileQuestionaire.carTitle = value
    })
    this.vehicleDetailsFormGroup.get('carLoan')?.valueChanges.subscribe((value) => {
        this.vechileQuestionaire.carLoan = value
      if(!value) {
        this.vehicleDetailsFormGroup.get('loanAmount')?.setValue('0')
      }
    })
    this.vehicleDetailsFormGroup.get('loanAmount')?.valueChanges.subscribe((value) => {
      this.vechileQuestionaire.loanAmount = value
    })
    this.vehicleDetailsFormGroup.get('mileage')?.valueChanges.subscribe((value) => {
      this.vechileQuestionaire.mileage = value
    })
    this.vehicleDetailsFormGroup.get('color')?.valueChanges.subscribe((value) => {
      this.vechileQuestionaire.color = value
    })
    this.vehicleDetailsFormGroup.get('zipCode')?.valueChanges.subscribe((value) => {
      this.vechileQuestionaire.zipCode = value
    })
    this.vehicleDetailsFormGroup.get('vechileTransmissionType')?.valueChanges.subscribe((value) => {
      this.vechileQuestionaire.vechileTransmissionType = value
    })

    this.vehicleDetailsFormGroup
    
    this.vehicleDetailsFormGroup.statusChanges.subscribe(status => {
      if(status === 'VALID') {
        if(this.vechileQuestionaire.carLoan === true && (this.vechileQuestionaire.loanAmount === null || this.vechileQuestionaire.loanAmount === '0')) {
          this.stepOneValidated.emit(false);
          return; 
        }else {
          this.stepOneValidated.emit(true);
        }
      }else {
        this.stepOneValidated.emit(false);
      }
    })
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
