import { Component } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent {

  checked: boolean = true
  constructor(private reviewService: ReviewService) {
        
  }

  routeToStepperIndex(index: number) {
    this.reviewService.setStepperIndex(index);
  }
}
