import { IPhoto } from "./IPhoto";
import { ISeoParams } from "./ISeoParams";

export interface IPageInfo extends ISeoParams {
  pageInfoId: number;
  alias: string;
  description: string;
  photos: IPhoto[];
}
