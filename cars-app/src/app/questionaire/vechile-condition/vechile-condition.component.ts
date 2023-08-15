import { Component } from '@angular/core';
import { IVechileConditionQuestionaire } from '../questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-vechile-condition',
  templateUrl: './vechile-condition.component.html',
  styleUrls: ['./vechile-condition.component.css'],
})
export class VechileConditionComponent {
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
  onSliderChange(event: MatSliderChange) {
    console.log(event.value);
  }

  onChangeDoesCarDrive(event : boolean) {
    if(!event) {
      this.vechileCondition.doesCarStart = true;
      this.vechileCondition.carEngineandTransmission = true;
    }
  }
}
