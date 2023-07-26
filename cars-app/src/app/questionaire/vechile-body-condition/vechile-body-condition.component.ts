import { Component } from '@angular/core';
import { IVechileConditionQuestionaire } from '../questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-vechile-body-condition',
  templateUrl: './vechile-body-condition.component.html',
  styleUrls: ['./vechile-body-condition.component.css'],
})
export class VechileBodyConditionComponent {
  selectedMake?: string = '';
  public vechileCondition: IVechileConditionQuestionaire;
  constructor(public _store: SellCarStoreService) {
    this.selectedMake = this._store.sellerCompleteDetails.carDetails?.make;
    this.vechileCondition = this._store.sellerCompleteDetails.vehicleCondition;
  }

  EngineRepairOptions: string[] = ['Engine repairs', "I don't know"];
  carEngineTransmissionOptions: string[] = [
    'Engine is partly taken apart.',
    'Engine or Transmission is removed but still available.',
    'Engine or Tranmission is no longer available',
  ];
  BodyDamageOptions: string[] = ['No Damage', 'Some damage', 'crashed'];
  BodyDamageDentScratchOptions: string[] = [
    'less than 3',
    '4 to 6 ',
    '7 and more',
  ];

  BodyNoticableDentsScratcheOptions = ['less than 3', '4 to 6', '7 and more'];

  doesCarDriveEvent(event: boolean) {
    this.vechileCondition.doesCarDrive = event;
  }
  onSliderChange(event: MatSliderChange) {
    console.log(event.value);
  }
  onChangeEventBodyDamage(event : any) {
    if(!event) {
      this.vechileCondition.externalConditions.doesBodyDamageSeverity = 5
    }
  } 
}
