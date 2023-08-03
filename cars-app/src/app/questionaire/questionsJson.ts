enum Questiontype {
  radio,
  text,
  DorpBown,
  MultiSelect,
}

export class IVechileDetailQuestionaire {
  constructor() {
    this.vechileTransmissionType = 'automatic';
  }
  carTitle?: string;
  carLoan: boolean = false;
  mileage?: Number;
  color?: string;
  zipCode?: string;
  vechileTransmissionType: string;
}
export class IContact {
  fullName?: string;
  email?: string;
  mobile?: string;
  zipCode?: string;
}

export class IVechileConditionQuestionaire {
  constructor() {
    this.externalConditions = new IVechileConditionExteriorQuestionaire();
  }
  doesCarDrive?: boolean = true;
  doesCarStart?: boolean = true;
  carEngineandTransmission?: boolean = true;
  doesCarHaveMechanicalIssues?: boolean;
  DoesInteriorIntact?: boolean = false;

  //External Conditions

  externalConditions: IVechileConditionExteriorQuestionaire;
}
export class IVechileConditionExteriorQuestionaire {
  doesAllCarWheelInflated?: boolean = false;
  doesAllGlassorLightCracked?: boolean = false;
  doesBodyDamage?: boolean = false;
  doesBodyDamageSeverity?: number = 1;
  NoticeableDingsDentsScratches?: string = '7 and more';
  doesBodyPanelIntact?: boolean = false;
  doesAirbagsDeployedOrMissing?: boolean = false;
  // Did your [Make] ever suffer flood or fire damage?
  DoesCarSufferedFloodorFireDamage?: boolean = false;
  // Is the interior of your [Make] intact?
}

export const CarTitleOptions: string[] = ['Clean', 'salvage', 'Rebuilt'];
export const CarTitleOwnership: string[] = ['Own', 'Lease', 'Re-finance'];
