export class SellerInfo {
    seller_id !: string; 
      email_id !: string;
      password !: string;
      customer_contact_number !: string;
      charity_name !: string;
      donor_email !: string;
      customer_name !: string;
      vehicle_owner_name  !: string;
      payee_name !: string;
      location_type !: string;
      apt_number !: string;
      street_address_line1 !: string;
      street_address_line2 !: string;
      city !: string;
      zip_code!: string;
}

export class SellerVehicleInfo {
    seller_id  !: string;
      vehicle_id !: string;
      year!: string;
      make!: string;
      model!: string;
      trim!: string;
      vin!: string;
      plate_number!: string;
      title !: string;
      mileage!: string;
      loan_vehicle!: string;
      does_car_drive !: string;
      does_car_start !: string;
      has_engine_transmission !: string;
      does_need_mech_work !: string;
      kind_of_mech_work_needed !: string[]
      are_body_panels_intact!: string;
      are_all_tires_attached !: string;
      ever_been_in_flood_or_fire !: string;
      is_windshield_broken!: string;
      has_body_damage !: string;
      has_airbags !: string;
      are_interiors_intact !: string;
      body_damage_severity !: string;
      number_of_dents_or_scratches !: string;
      adj_mmr_price!: string;
      fixed_price!: string;
      damage_percent!: string;
      non_runner_percent!: string;
      start_only_percent!: string;
      default_percent!: string;
      total_reduction_percent!: string;
      instant_offer_price!: string;
      acceptance_status!: string;
      vehicle_transmission_type !: string;
      vehicle_color!: string;
      vehicle_weight!: string;
      vehicle_owner_name!: string;
      vehicle_pickup_street_address!: string;
      vehicle_pickup_apt_nos!: string;
      vehicle_counties_location!: string;
      vehicle_city_location!: string;
      vehicle_state_location!: string;
      vehicle_pickup_zipcode!: string;
}