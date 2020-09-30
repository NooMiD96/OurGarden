import { IMouseClickEvent, IPressEnterEvent } from "@core/interfaces/IEvents";

export interface IAddToCardButton {
  itemCount: string;
  setItemCount: (value: string) => void;
  addToCard: (e?: IMouseClickEvent | IPressEnterEvent) => void;
}
