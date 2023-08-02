import { Component, Input } from '@angular/core';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-seller-instant-offer',
  templateUrl: './seller-instant-offer.component.html',
  styleUrls: ['./seller-instant-offer.component.css'],
})
export class SellerInstantOfferComponent {
  sellerDetails: ISellerVechileDetails | undefined;
  selectVechileDetails?: IVechileModelDetails;
  isLoading: boolean = true;
  offerPrice: number = 0;

  @Input() srcImages: string = '';

  constructor(public _store: SellCarStoreService, public nhtsa: NHTSAService) {
    this.sellerDetails = this._store.sellerCompleteDetails;
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;

    this.sellerDetails.vehicleDetails.mileage;
  }

  ngOnInit(): void {
    setTimeout(() => (this.isLoading = false), 1000);
  }

  //TODO:Move this change to service and call on review page next click.
  ngOnChanges() {
    this.nhtsa.getInstantOffer(this._store.sellerCompleteDetails).subscribe(
      (res) => {
        this.offerPrice = res.instant_offer_price;
      },
      (err) => (this.offerPrice = 0)
    );
  }
}
