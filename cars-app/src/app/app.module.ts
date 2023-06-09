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
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
