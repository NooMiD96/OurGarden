import { IVideo } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_VIDEO_LIST_REQUEST = "GET_Video_LIST_REQUEST";
export const GET_VIDEO_LIST_SUCCESS = "GET_Video_LIST_SUCCESS";
export const GET_VIDEO_LIST_ERROR = "GET_Video_LIST_ERROR";

export const ADD_OR_UPDATE_VIDEO_REQUEST = "ADD_OR_UPDATE_Video_REQUEST";
export const ADD_OR_UPDATE_VIDEO_SUCCESS = "ADD_OR_UPDATE_Video_SUCCESS";
export const ADD_OR_UPDATE_VIDEO_ERROR = "ADD_OR_UPDATE_Video_ERROR";

export const DELETE_VIDEO_REQUEST = "DELETE_Video_REQUEST";
export const DELETE_VIDEO_SUCCESS = "DELETE_Video_SUCCESS";
export const DELETE_VIDEO_ERROR = "DELETE_Video_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetVideoListRequest { type: typeof GET_VIDEO_LIST_REQUEST }
export interface IGetVideoListSuccess { type: typeof GET_VIDEO_LIST_SUCCESS; payload: IVideo[] }
export interface IGetVideoListError { type: typeof GET_VIDEO_LIST_ERROR; errorMessage: string }
export type TGetVideoList = IGetVideoListRequest | IGetVideoListSuccess | IGetVideoListError;

export interface IAddOrUpdateVideoRequest { type: typeof ADD_OR_UPDATE_VIDEO_REQUEST }
export interface IAddOrUpdateVideoSuccess { type: typeof ADD_OR_UPDATE_VIDEO_SUCCESS; payload: boolean }
export interface IAddOrUpdateVideoError { type: typeof ADD_OR_UPDATE_VIDEO_ERROR; errorMessage: string }
export type TAddOrUpdateVideo = IAddOrUpdateVideoRequest | IAddOrUpdateVideoSuccess | IAddOrUpdateVideoError;

export interface IDeleteVideoRequest { type: typeof DELETE_VIDEO_REQUEST }
export interface IDeleteVideoSuccess { type: typeof DELETE_VIDEO_SUCCESS; payload: boolean }
export interface IDeleteVideoError { type: typeof DELETE_VIDEO_ERROR; errorMessage: string }
export type IDeleteVideo = IDeleteVideoRequest | IDeleteVideoSuccess | IDeleteVideoError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetVideoList | TAddOrUpdateVideo | IDeleteVideo
  | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
