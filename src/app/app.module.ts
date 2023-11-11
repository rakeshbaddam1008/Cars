import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { authInterceptorProviders } from './shared utilities/interceptors/AuthInterceptor';
import { SellerVehicleInfoComponent } from './seller-vehicle-info/seller-vehicle-info.component';
import { SellerInfoComponent } from './seller-info/seller-info.component';
import { BuyerInfoComponent } from './buyer/buyer-info/buyer-info.component';
import { CampaignComponent } from './buyer/campaign/campaign.component';
import { InstantBidsComponent } from './buyer/instant-bids/instant-bids.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    SellerVehicleInfoComponent,
    SellerInfoComponent,
    BuyerInfoComponent,
    CampaignComponent,
    InstantBidsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
