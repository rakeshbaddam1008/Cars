import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab = 'seller'
  selectedTemplate: string = 'sellerInfo'
  
  constructor() {
    
  }

  ngOnInit() {
    //
  }
  changeTemplate(templateName: string) {
    this.selectedTemplate = templateName
  }

}
