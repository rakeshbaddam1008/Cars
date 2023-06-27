import { IQuestion } from './IQuestion';
import { IVechileData } from './IVechile';

export class ISellerVechileDetails {
  public vechile: IVechileData | undefined;
  public VechileDetails!: IQuestion[] | undefined;
  public VechileConditionDetails!: IQuestion[] | undefined;
  public contactDetails!: string | undefined;
}
