import { Injectable } from '@angular/core';
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
import { IOfferData, IVechileData, IVechileLicenseData } from '../models/IVechile';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  getAllMakes_URL,
  getAllModel_URL,
  getAllState_URL,
  getAlltrim_URL,
  getSellerOffer_URL,
  getVechileDetailssByLicenseNumberURL,
  getlocalhostURL,
} from '../constants.ts/constants';
import { IMake, IState } from '../models/IState';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';

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

  getInstantOffer(sellerCompleteDetails: ISellerVechileDetails):Observable<IOfferData> {
    return this.http.post<IOfferData>(
      environment.apiURL + getSellerOffer_URL(),
      sellerCompleteDetails
    );
  }
}
