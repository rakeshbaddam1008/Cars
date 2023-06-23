interface IVechileLicense {
  plateNumber: string;
  stateCode: string;
}

interface IVechileModelDetails {
  year: number;
  make: string;
  model: string;
  style: string;
  mileage: number;
}

export interface IVechileData {
  ModelYear: string | undefined;
  Make: string | undefined;
  Model: string | undefined;
}
