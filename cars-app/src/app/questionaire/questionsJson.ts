enum Questiontype {
  radio,
  text,
  DorpBown,
  MultiSelect,
}

export class IVechileDetailQuestionaire {
  carTitle?: string;
  carLoan?: boolean;
  mileage?: Number;
  color?: string;
  zipCode?: string;
}
export class IVechileConditionQuestionaire {
  constructor() {
    this.externalConditions = new IVechileConditionExteriorQuestionaire();
  }
  doesCarDrive?: boolean;
  doesCarStart?: boolean;
  carEngineandTransmission?: boolean;
  doesCarHaveMechanicalIssues?: boolean;
  //External Conditions

  externalConditions: IVechileConditionExteriorQuestionaire;
}
export class IVechileConditionExteriorQuestionaire {
  doesAllCarWheelInflated?: boolean;
  doesAllGlassorLightCracked?: boolean;
  doesBodyDamage?: boolean;
  doesBodyDamageSeverity?: number;
  NoticeableDingsDentsScratches?: boolean;
  doesBodyPanelIntact?: boolean;
  doesAirbagsDeployedOrMissing?: boolean;
  // Did your [Make] ever suffer flood or fire damage?
  DoesCarSufferedFloodorFireDamage?: boolean;
  // Is the interior of your [Make] intact?
  DoesInteriorIntact?: boolean;
  // Vehicle transmission type?
  vechileTransmissionType?: string;
}

export const CarTitleOptions: string[] = ['Clean', 'salvage', 'Rebuilt'];
export const CarTitleOwnership: string[] = ['Own', 'Lease', 'Re-finance'];
