export class BuyerInfo{
    buyer_id !: string;
    buyer_type !: string;
    first_name !: string;
    last_name !: string;
    license_number !: string; 
    license_expiry !: string;
    company_name !: string;
    building_number !: string;
    street_address_line1 !: string;
    street_address_line2 !: string;
    city !: string;
    state !: string;
    country !: string;
    zipcode !: string;
    contact_number_1 !: string;
    office_number_1 !: string;
    contact_number_2 !: string;
    office_number_2 !: string;
    credit_limit !: string;
    updated_limit !: string;
    number_of_vehicles !: string;
    email_id !: string;
    api_url !: string;
    status !: string;
}

export class CampaignInfo{
    campaign_id !: string;
    campaign_name !: string;
    status !: string;
    assigned_claim_count !: string;
    qualified_claim_count !: string;
    accept_without_title !: string;
    instant_bid_count !: string;
    buyer_id !: string;
}