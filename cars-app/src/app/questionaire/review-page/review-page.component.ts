import { Component } from '@angular/core';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { AlertService } from 'src/app/services/alert.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent {
  sellerCarDetails: ISellerVechileDetails;
  selectedMake?: string = '';
  isLoading : boolean = false;

  checked: boolean = true;
  constructor(
    private reviewService: ReviewService,
    public _store: SellCarStoreService,
    private alertService : AlertService,
    private _nhtsaervice: NHTSAService
  ) {
    this.selectedMake = this._store.sellerCompleteDetails.carDetails?.make;
    this.sellerCarDetails = _store.sellerCompleteDetails;
  }

  ngOnInit() {
    // this.isLoading = true;
    // this._nhtsaervice.getInstantOffer(this._store.sellerCompleteDetails).subscribe((res) => {
    //   setTimeout( () =>this.isLoading = false, 3000);
    //   // this.offerPrice = Math.floor(Math.random() * 300000);
    // },error => {
    //   this.isLoading = false;
    //   this.alertService.error('Error Occured while fetching instance offer: ', error.message)
    // })
  }

  routeToStepperIndex(index: number) {
    this.reviewService.setStepperIndex(index);
  }
}
