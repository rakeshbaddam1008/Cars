import { Injectable } from '@angular/core';
import { IVechileData } from '../models/IVechile';

@Injectable({
  providedIn: 'root',
})
export class CommondataSellService {
  public vin: string = '';

  public selectedVechileDetails: IVechileData | undefined;
  constructor() {}
}
