import { Component } from '@angular/core';
import { IContact } from 'src/app/questionaire/questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ReviewService } from 'src/app/services/review.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  checked !: boolean
  selectedContact: IContact;
  constructor(public _store: SellCarStoreService, private reviewService: ReviewService, public dialog : MatDialog) {
    this.selectedContact = this._store.sellerCompleteDetails.contact;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }
}