import { Component, Input } from '@angular/core';
import { IVechileData } from 'src/app/models/IVechile';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import {
  IQuestion,
  IVechileDetailQuestionaire,
  QuestionaireVechileDetails,
} from '../questionsJson';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vechile-details',
  templateUrl: './vechile-details.component.html',
  styleUrls: ['./vechile-details.component.css'],
})
export class VechileDetailsComponent {
  selectVechileDetails: IVechileData | undefined;
  @Input() VechileDetailsQuestionaireJson: IQuestion[] | undefined;
  @Input() formData: FormData[] | undefined;
  form: FormGroup;
  submitted: boolean | undefined;
  vechileQuestionaire: IVechileDetailQuestionaire;

  CarTitleOptions: string[] = ['Clean', 'salvage', 'Rebuilt'];
  CarOwnershipOptions: string[] = ['Own', 'Lease', 'Re-finance'];
  CarColorOptions: string[] = ['red', 'green', 'yellow', 'purple', 'blue'];

  constructor(
    public _nhtsaervice: NHTSAService,
    private dataService: CommondataSellService
  ) {
    this.vechileQuestionaire = new IVechileDetailQuestionaire();
    const formGroup = {};

    // this.formData.forEach((formControl: FormControl) => {
    //   formGroup[formControl.controlName] = new FormControl('');
    // });
    this.form = new FormGroup(formGroup);

    this._nhtsaervice
      .getVechileDetailsByVIN(this.dataService.vin)
      .then((s) => (this.selectVechileDetails = s));
  }

  submitForm() {}
}
