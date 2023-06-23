import { Injectable } from '@angular/core';
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
import { IVechileData } from '../models/IVechile';

@Injectable({
  providedIn: 'root',
})
export class NHTSAService {
  constructor() {}

  async getVechileDetailsByVIN(vin: string): Promise<IVechileData> {
    // const results = await DecodeVinValues('WA1A4AFY2J2008189');
    const { Results } = await DecodeVinValues(vin);
    const decodedVehicle = Results[0];

    let data: IVechileData = decodedVehicle;

    return data;
  }
}
