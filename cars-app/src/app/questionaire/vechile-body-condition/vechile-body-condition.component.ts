import { Component } from '@angular/core';
import { IVechileConditionQuestionaire } from '../questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';

@Component({
  selector: 'app-vechile-body-condition',
  templateUrl: './vechile-body-condition.component.html',
  styleUrls: ['./vechile-body-condition.component.css'],
})
export class VechileBodyConditionComponent {
  public vechileCondition: IVechileConditionQuestionaire;
  selectVechileDetails: import('src/app/models/ISellerVechileDetails').ISellerVechileDetails;

  constructor(public _store: SellCarStoreService) {
    this.vechileCondition = new IVechileConditionQuestionaire();

    this.selectVechileDetails = this._store.sellerCompleteDetails;

    this.vechileCondition = new IVechileConditionQuestionaire();
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
}
