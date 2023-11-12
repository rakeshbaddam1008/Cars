import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMake, IState } from '../models/IState';
import { TokenStorageService } from './TokenStorageService';
import { SellerInfo, SellerVehicleInfo } from '../models/SellerInfo.modal';
import { BuyerInfo, CampaignInfo, InstantBidInfo } from '../models/buyer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  seller_id: string = '';
  buyer_id: string = '';

  constructor(private http: HttpClient, private token: TokenStorageService) {}

  getAllMakes(year: Number): Observable<IMake[]> {
    return this.http.get<IMake[]>(environment.apiURL + `/carizma/vehicle-info/make?year=${year}`);
  }

  getModel(year: Number, make: string): Observable<string[]> {
    return this.http.get<string[]>(
      environment.apiURL + `/carizma/vehicle-info/model?year=${year}&make=${make}`
    );
  }

  getTrim(year: Number, make: string, model: string): Observable<string[]> {
    console.log(model);
    return this.http.get<string[]>(
      environment.apiURL + `/carizma/vehicle-info/trim?year=${year}&make=${make}&model=${model}`
    );
  }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>(environment.apiURL + `/carizma/us-states-region`);
  }

  getSellerInfoAdminData(email_id: string) : Observable<any>  {
    return this.http.post<any>(environment.apiURL + '/carizma/admin/data', {
      // admin_id: 'carizma_admin',
      detail_type:'SELLER_INFO',
      id: email_id
    })
  }
  getSellerVehicleAdminData(id : string) : Observable<any>  {
    return this.http.post<any>(environment.apiURL + '/carizma/admin/data', {
      admin_id: 'carizma_admin',
      detail_type:'SELLER_VEHICLE',
      id: id
    })
  }

  getBuyerInfoData(email_id :string) : Observable<any> {
    return this.http.post<any>(environment.apiURL + '/carizma/admin/data', {

    })
  }
  getCampaignInfoData(id :string) : Observable<any> {
    return this.http.post<any>(environment.apiURL + '/carizma/admin/data', {
      
    })
  }
  getInstantBidInfoData(id :string) : Observable<any> {
    return this.http.post<any>(environment.apiURL + '/carizma/admin/data', {
      
    })
  }
  saveSellerInfo(sellerInfo : SellerInfo) :Observable<any> {
    return this.http.post(environment.apiURL + '/carizma/admin/data', sellerInfo)
  }
  saveSellerVehicleInfo(sellerVehicleInfo : SellerVehicleInfo) :Observable<any> {
    return this.http.post(environment.apiURL + '/carizma/admin/data', sellerVehicleInfo)
  }
  saveBuyerInfo(buyerInfo : BuyerInfo) :Observable<any> {
    return this.http.post(environment.apiURL + '/carizma/admin/data', buyerInfo)
  }
  saveCampaignInfo(campaign : CampaignInfo) :Observable<any> {
    return this.http.post(environment.apiURL + '/carizma/admin/data', campaign)
  }
  saveInstantBidInfo(instantBid : InstantBidInfo) :Observable<any> {
    return this.http.post(environment.apiURL + '/carizma/admin/data', instantBid)
  }

}
