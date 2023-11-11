import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared utilities/services/api.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {
  campaignInfo: FormGroup;
  displayCampaignDetails: boolean = false;
  constructor(private apiService: ApiService) {
    this.campaignInfo = new FormGroup({
      campaign_id : new FormControl(),
      campaign_name : new FormControl(),
      status : new FormControl(),
      assigned_claim_count : new FormControl(),
      qualified_claim_count : new FormControl(),
      accept_without_title : new FormControl(),
      instant_bid_count : new FormControl(),
      buyer_id : new FormControl(),
    })
  }

  ngOnInit(){
    //
  }
}
