import { IVisitation } from "@components/Visitation/State";
// -----------------
//#region ACTIONS TYPE
export const GET_VISITATION_LIST_REQUEST = "GET_VISITATION_LIST_REQUEST";
export const GET_VISITATION_LIST_REQUEST_SUCCESS = "GET_VISITATION_LIST_REQUEST_SUCCESS";
export const GET_VISITATION_LIST_REQUEST_ERROR = "GET_VISITATION_LIST_REQUEST_ERROR";

export const SAVE_VISITATION_LIST_REQUEST = "SAVE_VISITATION_LIST_REQUEST";
export const SAVE_VISITATION_LIST_REQUEST_SUCCESS = "SAVE_VISITATION_LIST_REQUEST_SUCCESS";
export const SAVE_VISITATION_LIST_REQUEST_ERROR = "SAVE_VISITATION_LIST_REQUEST_ERROR";

export const CHANGE_GROUP = "CHANGE_GROUP";
export const CHANGE_TARGET_LIST = "CHANGE_TARGET_LIST";
export const CHANGE_DISEASED_TARGET_LIST = "CHANGE_DISEASED_TARGET_LIST";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface IGetVisitationListRequestAction { type: typeof GET_VISITATION_LIST_REQUEST; }
export interface IGetVisitationListRequestSuccessAction { type: typeof GET_VISITATION_LIST_REQUEST_SUCCESS; visitationList: IVisitation[]; }
export interface IGetVisitationListRequestErrorAction { type: typeof GET_VISITATION_LIST_REQUEST_ERROR; errorMessage: string; }
export type TGetVisitationList = IGetVisitationListRequestAction | IGetVisitationListRequestSuccessAction | IGetVisitationListRequestErrorAction;

export interface ISaveVisitationListRequestAction { type: typeof SAVE_VISITATION_LIST_REQUEST; }
export interface ISaveVisitationListRequestSuccessAction { type: typeof SAVE_VISITATION_LIST_REQUEST_SUCCESS; }
export interface ISaveVisitationListRequestErrorAction { type: typeof SAVE_VISITATION_LIST_REQUEST_ERROR; errorMessage: string; }
export type TSaveVisitationList = ISaveVisitationListRequestAction | ISaveVisitationListRequestSuccessAction | ISaveVisitationListRequestErrorAction;

export interface IChangeGroup { type: typeof CHANGE_GROUP; groupId: number; }
export interface IChangeTargetList { type: typeof CHANGE_TARGET_LIST; targetKeys: string[]; }
export interface IChangeDiseasedTargetList { type: typeof CHANGE_DISEASED_TARGET_LIST; targetKeys: string[]; }
export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetVisitationList | TSaveVisitationList
    | IChangeGroup | IChangeTargetList | IChangeDiseasedTargetList | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
