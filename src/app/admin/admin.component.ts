import { Component } from '@angular/core';
import { ApiService } from '../shared utilities/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab = 'seller'
  selectedTemplate: string = 'sellerInfo'
  buyerTemplate: string = 'buyerInfo'
  
  constructor(public apiService: ApiService) {
    
  }

  ngOnInit() {
    //
  }
  changeTemplate(templateName: string) {
    this.selectedTemplate = templateName
  }

  changeBuyerTemplate(tempName : string) {
    this.buyerTemplate = tempName;
  }

}
