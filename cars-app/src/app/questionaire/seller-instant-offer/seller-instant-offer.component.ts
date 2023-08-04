import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import {
  IOfferData,
  IOfferStatusData,
  IVechileModelDetails,
} from 'src/app/models/IVechile';
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
  offerPrice!: number;
  currentOffer: IOfferData | undefined;

  @Input() srcImages: string = '';
  @Input() callAPI: boolean = false;

  constructor(
    public _store: SellCarStoreService,
    public toaster: ToastrService,
    public nhtsa: NHTSAService
  ) {
    this.sellerDetails = this._store.sellerCompleteDetails;
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;
    this.sellerDetails.vehicleDetails.mileage;
  }

  ngOnInit(): void {
    setTimeout(() => (this.isLoading = false), 1000);
  }
  accept() {
    let offer: IOfferStatusData = new IOfferStatusData();
    offer.seller_id = this.currentOffer?.seller_id;
    offer.vehicle_id = this.currentOffer?.vehicle_id;
    offer.acceptance_status = 'Approve';
    this.nhtsa
      .RequestOffer(offer)
      .subscribe((s) => alert('sucesfully Accepted the offer.'));
  }

  reject() {
    let offer: IOfferStatusData = new IOfferStatusData();
    offer.seller_id = this.currentOffer?.seller_id;
    offer.vehicle_id = this.currentOffer?.vehicle_id;
    offer.acceptance_status = 'Reject';
    this.nhtsa
      .RequestOffer(offer)
      .subscribe((s) => alert('Rejected the offer.'));
  }

  //TODO:Move this change to service and call on review page next click.
  ngOnChanges() {
    if (this.callAPI) {
      this.nhtsa.getInstantOffer(this._store.sellerCompleteDetails).subscribe(
        (res) => {
          this.currentOffer = res;
          this.offerPrice = res.instant_offer_price;
        },
        (err) => {
          this.offerPrice = 0;
          // this.toaster.warning('Unable to calculate the instant offer at the moment and our customer care team will reach out to you shortly.', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
        }
      );
    }
  }
}
