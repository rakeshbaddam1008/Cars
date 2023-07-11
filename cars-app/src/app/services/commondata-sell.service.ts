import { Injectable } from '@angular/core';
import { IVechileData } from '../models/IVechile';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';
import { IState } from '../models/IState';
import { Observable, of } from 'rxjs';
import { CacheKey, cacheUtil } from '../utilities/localStorageUtility';
import { NHTSAService } from './nhtsa-service';

@Injectable({
  providedIn: 'root',
})
export class CommondataSellService {
  public vin: string = '';
  public seller: ISellerVechileDetails | undefined;
  public selectedVechileDetails: IVechileData | undefined;

  constructor(public _service: NHTSAService) {}

  getUSStates(): Observable<IState[]> {
    let stateDataFromCache = localStorage.getItem(CacheKey.States);

    if (stateDataFromCache && stateDataFromCache.length > 0) {
      let states: IState[] = JSON.parse(stateDataFromCache);
      return of(states);
    }

    return this._service.getStates();
  }
}
