import { Component, EventEmitter, Output } from '@angular/core';
import { IVechileConditionQuestionaire } from '../questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { MatSliderChange } from '@angular/material/slider';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vechile-body-condition',
  templateUrl: './vechile-body-condition.component.html',
  styleUrls: ['./vechile-body-condition.component.css'],
})
export class VechileBodyConditionComponent {
  selectedMake?: string = '';
  public vechileCondition: IVechileConditionQuestionaire;
  vehicleConditionFormGroup: FormGroup = new FormGroup({});
  @Output() stepThreeValidated = new EventEmitter<boolean>();

  constructor(public _store: SellCarStoreService) {
    this.selectedMake = this._store.sellerCompleteDetails.carDetails?.make;
    this.vechileCondition = this._store.sellerCompleteDetails.vehicleCondition;
    this.vehicleConditionFormGroup = new FormGroup({
      doesAllCarWheelInflated: new FormControl(this.vechileCondition.externalConditions.doesAllCarWheelInflated, Validators.required),
      doesAllGlassorLightCracked: new FormControl(this.vechileCondition.externalConditions.doesAllGlassorLightCracked, Validators.required),
      doesBodyDamage: new FormControl(this.vechileCondition.externalConditions.doesBodyDamage, Validators.required),
      doesBodyDamageSeverity: new FormControl(this.vechileCondition.externalConditions.doesBodyDamageSeverity),
      NoticeableDingsDentsScratches: new FormControl(this.vechileCondition.externalConditions.NoticeableDingsDentsScratches, [Validators.required]),
      doesBodyPanelIntact: new FormControl(this.vechileCondition.externalConditions.doesBodyPanelIntact, [Validators.required]),
      doesAirbagsDeployedOrMissing: new FormControl(this.vechileCondition.externalConditions.doesAirbagsDeployedOrMissing, [Validators.required]),
      DoesCarSufferedFloodorFireDamage: new FormControl(this.vechileCondition.externalConditions.DoesCarSufferedFloodorFireDamage, [Validators.required]),
      DoesInteriorIntact: new FormControl(this.vechileCondition.DoesInteriorIntact, [Validators.required]),     
    });
    if(this.vehicleConditionFormGroup.valid) {
      this.stepThreeValidated.emit(true)
    }
  }
  severityBodyDamageOptions = [{
    id: 1,
    value : 'Light',
    img: '../../../assets/images/light_body_damage.png'
  },{
    id: 2,
    value : 'Moderate',
    img: '../../../assets/images/moderate_body_damage.png'
  },{
    id: 3,
    value : 'Sever',
    img: '../../../assets/images/severe_body_damage.png'
  }]

  EngineRepairOptions: string[] = ['Engine repairs', "I don't know"];
  carEngineTransmissionOptions: string[] = [
    'Engine is partly taken apart.',
    'Engine or Transmission is removed but still available.',
    'Engine or Tranmission is no longer available',
  ];
  BodyDamageOptions: string[] = ['No Damage', 'Some damage', 'Crashed'];
  BodyDamageDentScratchOptions: string[] = [
    'Less than 3',
    '4 to 6 ',
    '7 and more',
  ];

  BodyNoticableDentsScratcheOptions = ['Less than 3', '4 to 6', '7 and more'];

  doesCarDriveEvent(event: boolean) {
    this.vechileCondition.doesCarDrive = event;
  }

  ngOnInit() {
    

    this.vehicleConditionFormGroup.get('doesAllCarWheelInflated')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.doesAllCarWheelInflated = value
    })
    this.vehicleConditionFormGroup.get('doesAllGlassorLightCracked')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.doesAllGlassorLightCracked = value
    })
    this.vehicleConditionFormGroup.get('doesBodyDamage')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.doesBodyDamage = value
      if(!value) {
        this.vehicleConditionFormGroup.get('doesBodyDamageSeverity')?.setValue(null)
      }
    })
    this.vehicleConditionFormGroup.get('doesBodyDamageSeverity')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.doesBodyDamageSeverity = value
    })
    this.vehicleConditionFormGroup.get('NoticeableDingsDentsScratches')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.NoticeableDingsDentsScratches = value
    })
    this.vehicleConditionFormGroup.get('doesBodyPanelIntact')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.doesBodyPanelIntact = value
    })
    this.vehicleConditionFormGroup.get('doesAirbagsDeployedOrMissing')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.doesAirbagsDeployedOrMissing = value
    })
    this.vehicleConditionFormGroup.get('doesAirbagsDeployedOrMissing')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.doesAirbagsDeployedOrMissing = value
    })
    this.vehicleConditionFormGroup.get('DoesCarSufferedFloodorFireDamage')?.valueChanges.subscribe((value) => {
      this.vechileCondition.externalConditions.DoesCarSufferedFloodorFireDamage = value
    })
    this.vehicleConditionFormGroup.get('DoesInteriorIntact')?.valueChanges.subscribe((value) => {
      this.vechileCondition.DoesInteriorIntact = value
    })

    this.vehicleConditionFormGroup.statusChanges.subscribe(status => {
      if(status === 'VALID') {
        if(this.vechileCondition.externalConditions.doesBodyDamage === false && this.vechileCondition.externalConditions.doesBodyDamageSeverity != null) {
          this.stepThreeValidated.emit(false)
          return;
        }else {
          this.stepThreeValidated.emit(true)
        }
      } else {
        this.stepThreeValidated.emit(false)
      }
    })
  }


  // onChangeEventBodyDamage(event: any) {
  //   if (!event) {
  //     this.vechileCondition.externalConditions.doesBodyDamageSeverity = 1
  //   } else {
  //     this.vechileCondition.externalConditions.doesBodyDamageSeverity = 5
  //   }
  // }
}
