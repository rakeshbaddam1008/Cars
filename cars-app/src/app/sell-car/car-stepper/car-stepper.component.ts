import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ViewEncapsulation, Renderer2 } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Subject, takeUntil } from 'rxjs';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { VechileDetailsComponent } from 'src/app/questionaire/vechile-details/vechile-details.component';

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
  validator!: boolean;
  srcImages: string = '';
  images: string[] = [
    '../../../assets/images/IMG_3302.PNG',
    '../../../assets/images/IMG_3303.PNG',
    '../../../assets/images/IMG_3304.PNG',
    '../../../assets/images/IMG_3305.PNG',
  ];

  @ViewChild('stepper') public myStepper!: MatStepper;
  @ViewChildren(MatStep) steps!: QueryList<MatStep>;
  @ViewChild(VechileDetailsComponent) vechileDetailsComponent!: VechileDetailsComponent;

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
    // this.steps.forEach((step) => {
    //   step.editable = false;
    //   step.completed = false;
    // });
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

  validateStepperOne(event: boolean) {

    this.validator = event;
  }

  nextStep(index: number) {
    // this.steps.forEach((step, i) => {
    //   if (index == i) {
    //     console.log(step)
    //     step._completedOverride = true;
    //   }
    // })
    this.myStepper.next();
    // this.disableSteppers();
  }

  prevStep(index: number) {
    // this.steps.forEach((step, i) => {
    //   if (index == i) {
    //     step.editable = true;
    //   }
    // })
    this.myStepper.previous();
    // this.disableSteppers();
  }

  disableSteppers() {
    this.myStepper._steps.forEach((step, i) => {

      step.completed = false;
      step.editable = false;

    })
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
