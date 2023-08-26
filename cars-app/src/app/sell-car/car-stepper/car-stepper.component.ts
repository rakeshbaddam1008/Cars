import { Component, QueryList, ViewChild, ViewChildren, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IOfferData, IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ViewEncapsulation, Renderer2 } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Subject, takeUntil } from 'rxjs';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { VechileDetailsComponent } from 'src/app/questionaire/vechile-details/vechile-details.component';
import { ToastrService } from 'ngx-toastr';
import { IVechileDetailQuestionaire } from 'src/app/questionaire/questionsJson';
import { Router } from '@angular/router';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-car-stepper',
  templateUrl: './car-stepper.component.html',
  styleUrls: ['./car-stepper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CarStepperComponent {
  private onDestroy$: Subject<void> = new Subject<void>();

  isLoading: boolean = false;
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  instantOfferAPICall: boolean = false;
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
    public nhtsa: NHTSAService,
    private renderer: Renderer2,
    public router: Router,
    public reviewService: ReviewService,
    private toaster: ToastrService,
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
    if (!this.selectVechileDetails?.year || !this.selectVechileDetails?.make || !this.selectVechileDetails?.model) {
      this.router.navigateByUrl('/sell-car')
    }
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
    let sellerDetails  = this._store.sellerCompleteDetails;
    // if(index === 0 && sellerDetails.vehicleDetails.carTitle 
    //   && sellerDetails.vehicleDetails.mileage 
    //   && sellerDetails.vehicleDetails.zipCode 
    //   && sellerDetails.vehicleDetails.vechileTransmissionType) {
        
    //   this.validator = true
    // }
      if (this.reviewService.conatctPageStepper && index == 3) {
      this.validator = true;
    }  if (this.reviewService.reviewPageStepper && index == 4) {
      this.validator = true;
    }
    if (this.validator ) {
      if (index == 4) {
        this.callApiToGetInstantOffer()
        return;
      }
      this.myStepper.next();
      this.validator = false
    } else {
      this.toaster.warning('Please fill all the required Fields', 'Warning', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
    }



    // this.disableSteppers();

  }

  prevStep(index: number) {
    this.myStepper.previous();
    // this.disableSteppers();
  }

  disableSteppers() {
    this.myStepper._steps.forEach((step, i) => {

      step.completed = false;
      step.editable = false;

    })
  }

  setNoTittleDefaultValue() {
    this._store.sellerCompleteDetails.vehicleDetails.color = 'other';
    this._store.sellerCompleteDetails.vehicleDetails.carLoan = false;
    this._store.sellerCompleteDetails.vehicleCondition.doesCarStart = false;
    this._store.sellerCompleteDetails.vehicleCondition.doesCarDrive = false;
    this._store.sellerCompleteDetails.vehicleCondition.doesCarHaveMechanicalIssues = false;
    this._store.sellerCompleteDetails.vehicleCondition.carEngineandTransmission = false;
    this._store.sellerCompleteDetails.vehicleCondition.DoesInteriorIntact = false;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.DoesCarSufferedFloodorFireDamage = false;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesAirbagsDeployedOrMissing = true;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesAllCarWheelInflated = true;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesBodyDamage = true;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesBodyDamageSeverity = 'Severe';
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesBodyPanelIntact = false;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.NoticeableDingsDentsScratches = '7 and more';
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesAllGlassorLightCracked = false;
    

    this._store.sellerCompleteDetails.vehicleDetails.mileage = 300000;
    this.router.navigateByUrl('contact-us')
  }

  callApiToGetInstantOffer() {
    this.isLoading = true;
    // setTimeout(() => {
      // let currentOffer = {} as IOfferData
      // currentOffer.instant_offer_price = 9850;
      // currentOffer.seller_id = 12345
      // currentOffer.vehicle_id = 56128
      // this.reviewService.currentOffer = currentOffer
      // this.reviewService.offerPrice = currentOffer.instant_offer_price
      this.nhtsa.getInstantOffer(this._store.sellerCompleteDetails).subscribe(
        (res) => {

          this.reviewService.currentOffer = res;
          this.reviewService.offerPrice = res.instant_offer_price;
          this.myStepper.next()
          this.isLoading = false
        },
        (err) => {
          this.reviewService.offerPrice = undefined
          this.isLoading = false;
          this.myStepper.next()
          // this.toaster.warning('Unable to calculate the instant offer at the moment and our customer care team will reach out to you shortly.', 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
        }
      );
      
    // }, 2000);
    // this.isLoading = false;
    //     this.myStepper.next()
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
