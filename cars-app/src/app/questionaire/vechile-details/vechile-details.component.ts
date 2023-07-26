import { Component, Input } from '@angular/core';
import { IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { IVechileDetailQuestionaire } from '../questionsJson';
import { FormControl, FormGroup } from '@angular/forms';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';

@Component({
  selector: 'app-vechile-details',
  templateUrl: './vechile-details.component.html',
  styleUrls: ['./vechile-details.component.css'],
})
export class VechileDetailsComponent {
  // sellerDetails: ISellerVechileDetails;
  vechileQuestionaire: IVechileDetailQuestionaire;

  selectVechileDetails?: IVechileModelDetails;
  @Input() formData: FormData[] | undefined;
  form: FormGroup;
  submitted: boolean | undefined;

  carTransmissionTypes = ['manual', 'automatic', 'others'];
  CarTitleOptions: string[] = ['Clean', 'Salvage/Rebuilt', 'Junk', 'No Title'];
  CarOwnershipOptions: string[] = ['Yes', 'No']; //['Own', 'Lease', 'Re-finance'];
  CarColorOptions: string[] = [
    'Black',
    'White',
    'Grey',
    'Silver',
    'Blue',
    'Red',
    'Gold',
    'Green',
    'Yellow',
    'other',
  ];

  constructor(
    public _nhtsaervice: NHTSAService,
    public _store: SellCarStoreService
  ) {
    const formGroup = {};
    this.form = new FormGroup(formGroup);
    this.vechileQuestionaire = this._store.sellerCompleteDetails.vehicleDetails;
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;
  }

  submitForm() {}
}
