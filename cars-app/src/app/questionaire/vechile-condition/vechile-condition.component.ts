import { Component } from '@angular/core';
import { IQuestion } from '../questionsJson';
import { QuestionaireVechileConditionDetails } from '../vechile-condition-Json';

@Component({
  selector: 'app-vechile-condition',
  templateUrl: './vechile-condition.component.html',
  styleUrls: ['./vechile-condition.component.css'],
})
export class VechileConditionComponent {
  questionJson: IQuestion[] | undefined;
  constructor() {
    this.questionJson = QuestionaireVechileConditionDetails;
  }
}
