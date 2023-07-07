import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CarSelectionComponent } from './sell-car/car-selection/car-selection.component';
import { HomeComponent } from './home/home.component';
import { LicensePlateSelectionComponent } from './sell-car/license-plate-selection/license-plate-selection.component';
import { VinSelectionComponent } from './sell-car/vin-selection/vin-selection.component';
import { VechileSelectionComponent } from './sell-car/vechile-selection/vechile-selection.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarQuestionaireComponent } from './sell-car/car-questionaire/car-questionaire.component';

import { SurveyModule } from 'survey-angular-ui';
import { CarStepperComponent } from './sell-car/car-stepper/car-stepper.component';
import { CarQuestionaireComponent1 } from './sell-car/car-questionaire copy/car-questionaire.component1';
import { FooterComponent } from './navigation/footer/footer.component';
import { WhatIsVinComponent } from './common/what-is-vin/what-is-vin.component';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { VechileDetailsComponent } from './questionaire/vechile-details/vechile-details.component';
import { VechileConditionComponent } from './questionaire/vechile-condition/vechile-condition.component';
import { SellerContactComponent } from './questionaire/seller-contact/seller-contact.component';
import { SellerInstantOfferComponent } from './questionaire/seller-instant-offer/seller-instant-offer.component';
import { EachQuestionComponent } from './questionaire/each-question/each-question.component';
import { HttpClientModule } from '@angular/common/http';
import { SellCarHomeComponent } from './sell-car/sell-car-home/sell-car-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    CarSelectionComponent,
    HomeComponent,
    LicensePlateSelectionComponent,
    VinSelectionComponent,
    VechileSelectionComponent,
    CarQuestionaireComponent,
    CarQuestionaireComponent1,
    CarStepperComponent,
    FooterComponent,
    WhatIsVinComponent,
    VechileDetailsComponent,
    VechileConditionComponent,
    SellerContactComponent,
    SellerInstantOfferComponent,
    EachQuestionComponent,
    SellCarHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SurveyModule,
    SurveyCreatorModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
