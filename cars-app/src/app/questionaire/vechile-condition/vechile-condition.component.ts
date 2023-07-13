import { Component } from '@angular/core';
import { IQuestion, IVechileConditionQuestionaire } from '../questionsJson';
import { QuestionaireVechileConditionDetails } from '../vechile-condition-Json';

@Component({
  selector: 'app-vechile-condition',
  templateUrl: './vechile-condition.component.html',
  styleUrls: ['./vechile-condition.component.css'],
})
export class VechileConditionComponent {
  public vechileCondition: IVechileConditionQuestionaire;
  constructor() {
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
