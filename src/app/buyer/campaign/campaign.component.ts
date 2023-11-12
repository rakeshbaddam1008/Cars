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
  enableSaveButton: boolean = false;
  displayCampaignDetails: boolean = true;
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
    this.campaignInfo.valueChanges.subscribe((changes) => {
        this.enableSaveButton = true;
    })

    this.apiService.getCampaignInfoData(this.apiService.buyer_id).subscribe((res) => {
      console.log(res)
      // this.campaignInfo.patchValue(res)
    })
  }

  saveCampaignInfo(){
    this.apiService.saveCampaignInfo(this.campaignInfo.value).subscribe((res) => {
      console.log(res)
    });
  }
}
