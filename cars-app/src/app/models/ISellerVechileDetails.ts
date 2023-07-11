import { IQuestion } from './IQuestion';
import { IVechileData, IVechileModelDetails } from './IVechile';

export class ISellerVechileDetails {
  public vechile?: IVechileModelDetails;
  public VechileConditionDetails?: IQuestion[] | undefined;
  public contactDetails!: string | undefined;
}
