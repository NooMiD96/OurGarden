import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { IGallery, IGalleryDTO } from "./State";
import { generateFormBody } from "@src/core/helpers/request";

// ----------------
//#region ACTIONS
export const actionsList = {
  getGalleryListRequest: (): t.IGetGalleryListRequest => ({
    type: t.GET_GALLERY_LIST_REQUEST,
  }),
  getGalleryListSuccess: (payload: IGallery[]): t.IGetGalleryListSuccess => ({
    type: t.GET_GALLERY_LIST_SUCCESS,
    payload
  }),
  getGalleryListError: (errorMessage: string): t.IGetGalleryListError => ({
    type: t.GET_GALLERY_LIST_ERROR,
    errorMessage,
  }),

  addOrUpdateGalleryRequest: (): t.IAddOrUpdateGalleryRequest => ({
    type: t.ADD_OR_UPDATE_GALLERY_REQUEST,
  }),
  addOrUpdateGallerySuccess: (payload: boolean): t.IAddOrUpdateGallerySuccess => ({
    type: t.ADD_OR_UPDATE_GALLERY_SUCCESS,
    payload
  }),
  addOrUpdateGalleryError: (errorMessage: string): t.IAddOrUpdateGalleryError => ({
    type: t.ADD_OR_UPDATE_GALLERY_ERROR,
    errorMessage,
  }),

  deleteGalleryRequest: (): t.IDeleteGalleryRequest => ({
    type: t.DELETE_GALLERY_REQUEST,
  }),
  deleteGallerySuccess: (payload: boolean): t.IDeleteGallerySuccess => ({
    type: t.DELETE_GALLERY_SUCCESS,
    payload
  }),
  deleteGalleryError: (errorMessage: string): t.IDeleteGalleryError => ({
    type: t.DELETE_GALLERY_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Gallery";
const defaultControllerName = "Home";
export const actionCreators = {
  getGalleryList: (): IAppThunkAction<t.TGetGalleryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetGalleries";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${defaultControllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IGallery[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getGalleryListSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getGalleryListError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getGalleryListRequest());
  },
  addOrUpdateGallery: (data: IGalleryDTO): IAppThunkAction<t.TAddOrUpdateGallery | t.TGetGalleryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "AddOrUpdate";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const formData = generateFormBody(data);
    debugger;
    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: formData,
      headers: {
        //"Content-Type": "multipart/form-data",
        //"Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IGallery[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdateGallerySuccess(true));
        actionCreators.getGalleryList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateGalleryError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateGalleryRequest());
  },
  removeGallery: (categoryId: number): IAppThunkAction<t.IDeleteGallery | t.TGetGalleryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "Delete";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?categoryId=${categoryId}`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteGallerySuccess(true));
        actionCreators.getGalleryList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateGalleryError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteGalleryRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
