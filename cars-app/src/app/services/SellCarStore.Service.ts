import { BehaviorSubject } from 'rxjs';
import {
  IQuestion,
  QuestionaireVechileDetails,
} from '../questionaire/questionsJson';
import { Injectable } from '@angular/core';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';
import { QuestionaireVechileConditionDetails } from '../questionaire/vechile-condition-Json';

@Injectable({ providedIn: 'root' })
export class SellCarStoreService {
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _todos = new BehaviorSubject<IQuestion[]>([]);

  sellerCompleteDetails: ISellerVechileDetails | undefined;
  // Expose the observable$ part of the _todos subject (read only stream)
  readonly todos$ = this._todos.asObservable();

  // the getter will return the last value emitted in _todos subject
  get todos(): IQuestion[] {
    return this._todos.getValue();
  }

  loadSellerDetails() {
    let seller = new ISellerVechileDetails();
    seller.VechileDetails = QuestionaireVechileDetails;
    seller.VechileConditionDetails = QuestionaireVechileConditionDetails;
    seller.contactDetails = '';
    this.sellerCompleteDetails = seller;
  }
  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
  private set todos(val: IQuestion[]) {
    this._todos.next(val);
  }

  private settodos(val: IQuestion[]) {
    this._todos.next(val);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
