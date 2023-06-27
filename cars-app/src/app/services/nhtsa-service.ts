import { Injectable } from '@angular/core';
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
import { IVechileData } from '../models/IVechile';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  getAllMakes_URL,
  getAllModel_URL,
  getAlltrim_URL,
} from '../constants.ts/constants';

@Injectable({
  providedIn: 'root',
})
export class NHTSAService {
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

  // async getVechileDetailsByRegistrationDetails(
  //   licensePlate: string,
  //   state: string
  // ): Observable<IVechileData> {
  //   const { Results }=
  //    await this.http.get<string[]>(getVechileDetailssByLicenseNumberURL(licensePlate,state))
  //   const decodedVehicle = Results[0];

  //   let data: IVechileData = decodedVehicle;

  //   return data;
  // }
}
