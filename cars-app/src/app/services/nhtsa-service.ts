import { Injectable } from '@angular/core';
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
import { IVechileData } from '../models/IVechile';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  getAllMakes_URL,
  getAllModel_URL,
  getAlltrim_URL,
  getVechileDetailssByLicenseNumberURL,
} from '../constants.ts/constants';

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

  getModel(year: Number, make: string): Observable<string[]> {
    return this.http.get<string[]>(
      environment.apiURL + getAllModel_URL(year, make)
    );
  }

  getTrim(year: Number, make: string, model: string): Observable<string[]> {
    return this.http.get<string[]>(
      environment.apiURL + getAlltrim_URL(year, make, model)
    );
  }

  getVechileDetailsByRegistrationDetails(
    licensePlate: string,
    state: string
  ): Observable<IVechileData> {
    return this.http.get<IVechileData>(
      getVechileDetailssByLicenseNumberURL(licensePlate, state)
    );
  }
}
