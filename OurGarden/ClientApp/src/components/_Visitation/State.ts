// -----------------
//#region STATE
import { IChildren } from "@components/Children/State";
import { TransferItem } from "@core/antd/Transfer";
import { Moment } from "moment";

export interface IVisitationState {
  visitationList: IVisitation[];
  transferData: TransferItem[];
  transferVisitationData: TransferItem[];
  targetVisitationKeys: string[];
  transferDiseasedData: TransferItem[];
  targetDiseasedKeys: string[];
  selectedGroup: number;
  pending: boolean;
  errorInner: string;
}

export interface IVisitation {
  visitationId: Number;
  date: Moment;
  visited: Boolean;
  diseased: Boolean;
  childrenId: Number;
  children: IChildren;
}

export const unloadedState: IVisitationState = {
  visitationList: [],
  transferData: [],
  transferVisitationData: [],
  targetVisitationKeys: [],
  transferDiseasedData: [],
  targetDiseasedKeys: [],
  selectedGroup: 0,
  pending: false,
  errorInner: "",
};
//#endregion
