import { Injectable } from '@angular/core';
import { IVechileData } from '../models/IVechile';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';

@Injectable({
  providedIn: 'root',
})
export class CommondataSellService {
  public vin: string = '';
  public seller: ISellerVechileDetails | undefined;
  public selectedVechileDetails: IVechileData | undefined;
  constructor() {}
}
