import { Component, Input } from '@angular/core';
import { IVechileData } from 'src/app/models/IVechile';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { Model } from 'survey-core';
import { SurveyCreatorModel } from 'survey-creator-core';
import { questionJson, vechileDetailsJSON } from './questions';

@Component({
  selector: 'app-car-questionaire',
  templateUrl: './car-questionaire.component.html',
  styleUrls: ['./car-questionaire.component.css'],
})
export class CarQuestionaireComponent {
  surveyModel: Model;
  selectVechileDetails: IVechileData | undefined;

  @Input() item = '';

  creatorOptions = {
    showLogicTab: true,
    isAutoSave: true,
  };

  constructor(public _nhtsaervice: NHTSAService) {
    // survey.focusFirstQuestionAutomatic = false;
    this._nhtsaervice
      .getVechileDetailsByVIN('')
      .then((s) => (this.selectVechileDetails = s));

    const survey = new Model(vechileDetailsJSON);

    this.surveyModel = survey;
  }
  ngOnInit() {
    const survey = new Model(vechileDetailsJSON);

    this.surveyModel = survey;
  }
}
// Does your car have a title?
// options - clean, rebuilt, salvage, no title.

// 2) What is the mileage of your car?
// options are
// 	Between 0 and 50000
// 	Between 50001 and 100000
// 	Between 100001 and 150000
// 	Between 150001 and 200000
// 	Between 200001 and 250000
// 	Between 250001 and 300000
// 	Between 300001 and 350000
// 	More than 350000+

// 3a) Does the car drive?
// options are Yes/No

// Conditional question, if answer is No only above.

// 	3b)Does  the car start?
// 	options are Yes/No

// 	Conditional question, if answer is No only above.
// 	3c) Are the engines and transmission in the car?
// 		Options are a)Engine is partly taken apart.
// 	    		    b)Engine or Transmission is removed but still available.
// 	                    c)Engine or Tranmission is no longer available

// 5) Does your car needs mechanical work?
// Options are Yes/No

// Conditional question, if answer is Yes only above.

// 	5b) What kind of work does your car need?
// 	Options are a) Engine repairs
// 		    b) I don't know

// Exterior body parts

// 6) Body panels intact?
// Options are Yes/No

// 7) Are all tires attached to the car?
// Options are Yes/No

// 8) Have your car ever been in a flood or fire?
// Options are Yes/No

// 9) Is the windshield is broken?
// Options are Yes/No

// 10)

// Body Condition

// Front: No Damage, Some damage, crashed
// Rear: No Damage, Some damage, crashed
// Left Side: No Damage, Some damage, crashed
// Right Side: No Damage, Some damage, crashed
// Damage to radiator or cooling: No Damage, Some damage, crashed
// Noticeable Dings/Dents/Scratches?
// options are a)less than 3,
// 	       b) 4 to 6 and
// 	       c) 7 and more.
