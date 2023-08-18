import { Injectable } from '@angular/core';
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
import {
  IOfferData,
  IOfferStatusData,
  IVechileData,
  IVechileLicenseData,
} from '../models/IVechile';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  getAllMakes_URL,
  getAllModel_URL,
  getAllState_URL,
  getAlltrim_URL,
  getRequestOffer_URL,
  getSellerOffer_URL,
  getVechileDetailssByLicenseNumberURL,
  getlocalhostURL,
} from '../constants.ts/constants';
import { IMake, IState } from '../models/IState';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';
import { ISellerProfile, ISellerVehicle } from '../models/ISellVechile';

@Injectable({
  providedIn: 'root',
})
export class NHTSAService {
  // getVechileDetailssByLicenseNumberURL(numberPlat: string,state:string) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private http: HttpClient) {}

  async getVechileDetailsByVIN(vin: string): Promise<IVechileData> {
    // const results = await DecodeVinValues('WA1A4AFY2J2008189');
    const { Results } = await DecodeVinValues(vin);
    const decodedVehicle = Results[0];

    let data: IVechileData = decodedVehicle;

    return data;
  }

  getMakes(year: Number): Observable<string[]> {
    return this.http.get<string[]>(environment.apiURL + getAllMakes_URL(year));
  }

  getAllMakes(year: Number): Observable<IMake[]> {
    return this.http.get<IMake[]>(environment.apiURL + getAllMakes_URL(year));
  }

  getModel(year: Number, make: string): Observable<string[]> {
    return this.http.get<string[]>(
      environment.apiURL + getAllModel_URL(year, make)
    );
  }

  getTrim(year: Number, make: string, model: string): Observable<string[]> {
    console.log(model);
    return this.http.get<string[]>(
      environment.apiURL + getAlltrim_URL(year, make, model)
    );
  }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>(environment.apiURL + getAllState_URL());
  }

  getVechileDetailsByRegistrationDetails(
    licensePlate: string,
    state: string
  ): Observable<IVechileLicenseData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      }),
    };
    return this.http.get<IVechileLicenseData>(
      environment.apiURL +
        getVechileDetailssByLicenseNumberURL(licensePlate, state),
      httpOptions
    );
  }

  getInstantOffer(
    sellerCompleteDetails: ISellerVechileDetails
  ): Observable<IOfferData> {
    return this.http.post<IOfferData>(
      environment.apiURL + getSellerOffer_URL(),
      sellerCompleteDetails
    );
  }

  RequestOffer(offerData: IOfferStatusData): Observable<IOfferData> {
    return this.http.post<IOfferData>(
      environment.apiURL + getRequestOffer_URL(),
      offerData
    );
  }

  getSellerVehicleDetails(): Observable<ISellerVehicle[]> {
    let data: ISellerVehicle[] = [
      {
        seller_id: 121,
        vehicle_id: 210201,
        year: 2008,
        make: 'TOYOTA',
        model: 'COROLLA',
        trim: '4D SUV',
        vin: '',
        plate_number: '',
        mileage: '123654',
        instant_offer_price: '72960',
        acceptance_status: 'PENDING',
      },
      {
        seller_id: 121,
        vehicle_id: 210201,
        year: 2008,
        make: 'HONDA',
        model: 'CR-V',
        trim: 'SEDAN',
        vin: '',
        plate_number: '',
        mileage: '123654',
        instant_offer_price: '12674',
        acceptance_status: 'ACCEPTED',
      },
      {
        seller_id: 121,
        vehicle_id: 210201,
        year: 2008,
        make: 'BMW',
        model: 'X7',
        trim: 'RX100',
        vin: '',
        plate_number: '',
        mileage: '983652',
        instant_offer_price: '69871',
        acceptance_status: 'REJECTED',
      },
    ];
    return of(data);
    return this.http.get<ISellerVehicle[]>(
      environment.apiURL + '/carizma/seller-vehicle-info'
    );
  }

  getUserProfileDetails(): Observable<ISellerProfile> {
    let data: ISellerProfile = {
      seller_id: 121,
      email_id: 'test2@gmail.com',
      customer_contact_number: '8989809505',
      charity_name: '',
      donor_email: '',
      customer_name: 'John Dale',
      vehicle_owner_name: 'John Dale',
      payee_name: 'John Dale',
      location_type: 'Residence',
      apt_number: '403',
      street_address: '50 King Street',
      city: 'New York',
      zip_code: '28213',
    };
    return of(data);
    return this.http.get<ISellerProfile>(
      environment.apiURL + '/carizma/seller-vehicle-info'
    );
  }

  updateUserProfileDetails(
    request: ISellerProfile
  ): Observable<ISellerProfile> {
    let data: ISellerProfile = {
      seller_id: 121,
      email_id: 'test2@gmail.com',
      customer_contact_number: '8989809505',
      charity_name: '',
      donor_email: '',
      customer_name: 'John Dale',
      vehicle_owner_name: 'John Dale',
      payee_name: 'John Dale',
      location_type: 'Residence',
      apt_number: '403',
      street_address: '50 King Street',
      city: 'New York',
      zip_code: '28213',
    };
    return of(data);
    return this.http.put<ISellerProfile>(
      environment.apiURL + '/carizma/seller-vehicle-info',
      request
    );
  }
}
