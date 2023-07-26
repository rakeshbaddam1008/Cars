import { Component, Input } from '@angular/core';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';

@Component({
  selector: 'app-seller-instant-offer',
  templateUrl: './seller-instant-offer.component.html',
  styleUrls: ['./seller-instant-offer.component.css'],
})
export class SellerInstantOfferComponent {
  sellerDetails: ISellerVechileDetails | undefined;
  selectVechileDetails?: IVechileModelDetails;

  @Input() srcImages: string = '';

  constructor(public _store: SellCarStoreService) {
    // this._store.loadSellerDetails();
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;
  }

  ngOnInit(): void {}
}
