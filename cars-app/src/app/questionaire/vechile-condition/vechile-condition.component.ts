import { Component, EventEmitter, Output } from '@angular/core';
import { IVechileConditionQuestionaire } from '../questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { MatSliderChange } from '@angular/material/slider';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vechile-condition',
  templateUrl: './vechile-condition.component.html',
  styleUrls: ['./vechile-condition.component.css'],
})
export class VechileConditionComponent {
  selectedMake?: string = '';
  public vechileCondition: IVechileConditionQuestionaire;
  vehicleConditionFormGroup: FormGroup = new FormGroup({});
  @Output() stepTwoValidated = new EventEmitter<boolean>();

  constructor(public _store: SellCarStoreService) {
    this.selectedMake = this._store.sellerCompleteDetails.carDetails?.make;
    this.vechileCondition = this._store.sellerCompleteDetails.vehicleCondition;
    this.vehicleConditionFormGroup = new FormGroup({
      doesCarDrive: new FormControl(this.vechileCondition.doesCarDrive, Validators.required),
      doesCarStart: new FormControl(this.vechileCondition.doesCarStart, Validators.required),
      carEngineandTransmission: new FormControl(this.vechileCondition.carEngineandTransmission, Validators.required),
      doesCarHaveMechanicalIssues: new FormControl(this.vechileCondition.doesCarHaveMechanicalIssues, [Validators.required]),
      mechanicalIssues: new FormGroup({
        warningLights: new FormControl(false),
        Electrical: new FormControl(false),
        Mechanical: new FormControl(false),
        Suspension: new FormControl(false),
        Other: new FormControl(false),
      }),
     });
  }

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
  mechanical  = {
    warningLights: 'Any warning lights (ABS, battery charge warning light, engine temperature etc.)',
    
  }

  doesCarDriveEvent(event: boolean) {
    this.vechileCondition.doesCarDrive = event;
  }

  onChangeDoesCarDrive(event : boolean) {
    if(!event) {
      this.vechileCondition.doesCarStart = true;
      this.vechileCondition.carEngineandTransmission = true;
    }
  }


  ngOnInit(){
    this.vehicleConditionFormGroup.get('doesCarDrive')?.valueChanges.subscribe((value) => {
      if(value) {
        this.vehicleConditionFormGroup.get('doesCarStart')?.setValue(true)
        this.vehicleConditionFormGroup.get('carEngineandTransmission')?.setValue(true)
      } else {  
        this.vehicleConditionFormGroup.get('doesCarStart')?.setValue(null)
        this.vehicleConditionFormGroup.get('carEngineandTransmission')?.setValue(null)
      }
      this.vechileCondition.doesCarDrive = value
    })

    this.vehicleConditionFormGroup.get('doesCarStart')?.valueChanges.subscribe((value) => {
      this.vechileCondition.doesCarStart = value
    })
    this.vehicleConditionFormGroup.get('carEngineandTransmission')?.valueChanges.subscribe((value) => {
      this.vechileCondition.carEngineandTransmission = value
    })
    this.vehicleConditionFormGroup.get('doesCarHaveMechanicalIssues')?.valueChanges.subscribe((value) => {
      this.vechileCondition.doesCarHaveMechanicalIssues = value
    })

    this.vehicleConditionFormGroup.get('mechanicalIssues')?.valueChanges.subscribe((mechanicalIssues: { [key: string]: boolean }) => {
      const selectedIssues = Object.keys(mechanicalIssues).filter(
        (key) =>  {
          return mechanicalIssues[key]
        }
      );
      this.vechileCondition.mechanicalIssues = selectedIssues.map((item:any) => {
        if(item === 'warningLights') {
          return this.mechanical.warningLights;
        }
        return item
      }) 
    });
    this.vehicleConditionFormGroup.statusChanges.subscribe(status => {
      if(status === 'VALID') {
        if(this.vechileCondition.doesCarHaveMechanicalIssues === true && this.vechileCondition.mechanicalIssues?.length === 0) {
          return;
        }else {
          this.stepTwoValidated.emit(true)
        }
      }else {
        this.stepTwoValidated.emit(false)
      }
    })
  }
}
