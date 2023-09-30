import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMake, IState } from '../models/IState';
import { TokenStorageService } from './TokenStorageService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
}
