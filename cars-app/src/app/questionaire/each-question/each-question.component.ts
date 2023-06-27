import { Component, Input } from '@angular/core';
import { IQuestion } from '../questionsJson';

@Component({
  selector: 'app-each-question',
  templateUrl: './each-question.component.html',
  styleUrls: ['./each-question.component.css'],
})
export class EachQuestionComponent {
  @Input() Question: IQuestion | undefined;
  ngOnInIt() {}
}
