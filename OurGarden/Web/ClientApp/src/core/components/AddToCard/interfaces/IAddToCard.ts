import { IMouseClickEvent, IPressEnterEvent } from "@core/interfaces/IEvents";
import { IProduct } from "@src/components/Product/State";

export interface IAddToCard {
  product: IProduct & { link: string };
  itemCount: string;
  setItemCount: (value: string) => void;
  addToCard: (e?: IMouseClickEvent | IPressEnterEvent) => void;
}
