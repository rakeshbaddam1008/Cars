import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';
// import { QuestionaireVechileConditionDetails } from '../questionaire/vechile-condition-Json';
import { IVechileModelDetails } from '../models/IVechile';

@Injectable({ providedIn: 'root' })
export class SellCarStoreService {
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  // private readonly _todos = new BehaviorSubject<IQuestion[]>([]);

  sellerCompleteDetails: ISellerVechileDetails;
  // Expose the observable$ part of the _todos subject (read only stream)
  // readonly todos$ = this._todos.asObservable();

  constructor() {
    this.sellerCompleteDetails = new ISellerVechileDetails();
  }
  // the getter will return the last value emitted in _todos subject
  // get todos(): IQuestion[] {
  //   return this._todos.getValue();
  // }

  loadSellerDetails() {
    // this.sellerCompleteDetails.VechileDetails = QuestionaireVechileDetails;

    this.sellerCompleteDetails.contactDetails = '';
  }

  setCurrentSellVechileDetails(vechileDetails: IVechileModelDetails) {
    this.sellerCompleteDetails.vechile = vechileDetails;
  }
  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
}
