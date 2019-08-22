import { IGallery } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_GALLERY_LIST_REQUEST = "GET_GALLERY_LIST_REQUEST";
export const GET_GALLERY_LIST_SUCCESS = "GET_GALLERY_LIST_SUCCESS";
export const GET_GALLERY_LIST_ERROR = "GET_GALLERY_LIST_ERROR";

export const ADD_OR_UPDATE_GALLERY_REQUEST = "ADD_OR_UPDATE_GALLERY_REQUEST";
export const ADD_OR_UPDATE_GALLERY_SUCCESS = "ADD_OR_UPDATE_GALLERY_SUCCESS";
export const ADD_OR_UPDATE_GALLERY_ERROR = "ADD_OR_UPDATE_GALLERY_ERROR";

export const DELETE_GALLERY_REQUEST = "DELETE_GALLERY_REQUEST";
export const DELETE_GALLERY_SUCCESS = "DELETE_GALLERY_SUCCESS";
export const DELETE_GALLERY_ERROR = "DELETE_GALLERY_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetGalleryListRequest { type: typeof GET_GALLERY_LIST_REQUEST }
export interface IGetGalleryListSuccess { type: typeof GET_GALLERY_LIST_SUCCESS; payload: IGallery[] }
export interface IGetGalleryListError { type: typeof GET_GALLERY_LIST_ERROR; errorMessage: string }
export type TGetGalleryList = IGetGalleryListRequest | IGetGalleryListSuccess | IGetGalleryListError;

export interface IAddOrUpdateGalleryRequest { type: typeof ADD_OR_UPDATE_GALLERY_REQUEST }
export interface IAddOrUpdateGallerySuccess { type: typeof ADD_OR_UPDATE_GALLERY_SUCCESS; payload: boolean }
export interface IAddOrUpdateGalleryError { type: typeof ADD_OR_UPDATE_GALLERY_ERROR; errorMessage: string }
export type TAddOrUpdateGallery = IAddOrUpdateGalleryRequest | IAddOrUpdateGallerySuccess | IAddOrUpdateGalleryError;

export interface IDeleteGalleryRequest { type: typeof DELETE_GALLERY_REQUEST }
export interface IDeleteGallerySuccess { type: typeof DELETE_GALLERY_SUCCESS; payload: boolean }
export interface IDeleteGalleryError { type: typeof DELETE_GALLERY_ERROR; errorMessage: string }
export type IDeleteGallery = IDeleteGalleryRequest | IDeleteGallerySuccess | IDeleteGalleryError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetGalleryList | TAddOrUpdateGallery | IDeleteGallery
  | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
