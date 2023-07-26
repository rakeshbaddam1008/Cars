import { Component } from '@angular/core';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { IContact } from '../questionsJson';

@Component({
  selector: 'app-seller-contact',
  templateUrl: './seller-contact.component.html',
  styleUrls: ['./seller-contact.component.css'],
})
export class SellerContactComponent {
  checked: boolean = false;

  selectedContact: IContact;
  constructor(public _store: SellCarStoreService) {
    this.selectedContact = this._store.sellerCompleteDetails.contact;
  }
}
