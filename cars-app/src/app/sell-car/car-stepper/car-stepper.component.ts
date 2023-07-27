import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ViewEncapsulation, Renderer2 } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Subject, takeUntil } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-car-stepper',
  templateUrl: './car-stepper.component.html',
  styleUrls: ['./car-stepper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CarStepperComponent {
  private onDestroy$: Subject<void> = new Subject<void>();
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  sellerDetails: ISellerVechileDetails | undefined;
  selectVechileDetails?: IVechileModelDetails;
  srcImages: string = '';
  images: string[] = [
    '../../../assets/images/IMG_3302.PNG',
    '../../../assets/images/IMG_3303.PNG',
    '../../../assets/images/IMG_3304.PNG',
    '../../../assets/images/IMG_3305.PNG',
  ];

  @ViewChild('stepper') private myStepper!: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    public _store: SellCarStoreService,
    private renderer: Renderer2,
    public reviewService: ReviewService
  ) {
    // this._store.loadSellerDetails();
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;
  }

  ngOnInit() {
    this.reviewService
      .getStepperIndex()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((index: number) => {
        this.myStepper.selectedIndex = index;
      });
  }

  ngAfterViewInit() {
    const stepperHeaderElements = document.querySelectorAll('.mat-step-icon');

    stepperHeaderElements.forEach((headerElement, index) => {
      const color = this.getStepIconColor(index);
      this.renderer.setStyle(headerElement, 'background-color', color);
    });
  }

  getStepIconColor(stepIndex: number): string {
    switch (stepIndex) {
      case 0:
        return '#ff0000'; // Red
      case 1:
      case 2:
      case 3:
        return '#ffd800'; // yellow
      case 4:
        return '#ffd800'; // green
      default:
        return '#10ff0a';
    }
  }

  imageRandom(): string {
    let img = this.images[Math.floor(Math.random() * this.images.length)];
    return img;
  }
  onStepChange(event: any) {
    if (event.selectedIndex == 5) {
      this.srcImages = this.imageRandom();
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
