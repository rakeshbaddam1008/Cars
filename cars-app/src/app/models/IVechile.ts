export interface IVechileModelDetails {
  year?: Number;
  make?: string;
  model?: string;
  style: string;
  mileage: number;
  trim: string;
}
interface IVechileLicense {
  plateNumber: string;
  stateCode: string;
}

// export interface IVechileData {
//   year: number;
//   make: string;
//   model: string;
//   style: string;
//   mileage: number;
//   trim: string;
// }

export interface IVechileLicenseData {
  licensePlateLookup: IVechileModelDetails;
}

// const toDTO = (input: IVechileData): IVechileData => {
//   return {
//     year: input.ModelYear,
//     make: input.Make,
//     model: string,
//     style: string,
//     mileage: number,
//     trim: string,
//   };
// };
export interface IVechileData {
  ModelYear: string;
  Make?: string;
  Model?: string;
}
