import { Component } from '@angular/core';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent {
  sellerCarDetails: ISellerVechileDetails;

  checked: boolean = true;
  constructor(
    private reviewService: ReviewService,
    public _store: SellCarStoreService
  ) {
    this.sellerCarDetails = _store.sellerCompleteDetails;
  }
  routeToStepperIndex(index: number) {
    this.reviewService.setStepperIndex(index);
  }
}
