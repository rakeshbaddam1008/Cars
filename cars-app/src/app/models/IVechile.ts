export class IVechileModelDetails {
  year?: Number;
  make?: string;
  model?: string;
  trim?: string;
  vin?: string;
  plateNumber?: string;
  state?: string;
}
interface IVechileLicense {
  plateNumber: string;
  stateCode: string;
}

export interface IVechileLicenseData {
  licensePlateLookup: IVechileModelDetails;
}

export interface IVechileData {
  ModelYear: string;
  Make?: string;
  Model?: string;
}
