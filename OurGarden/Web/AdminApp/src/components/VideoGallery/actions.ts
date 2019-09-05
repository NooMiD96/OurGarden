import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { IVideo, IVideoDTO } from "./State";
import { generateFormBody } from "@src/core/helpers/request";

// ----------------
//#region ACTIONS
export const actionsList = {
  getVideoListRequest: (): t.IGetVideoListRequest => ({
    type: t.GET_VIDEO_LIST_REQUEST,
  }),
  getVideoListSuccess: (payload: IVideo[]): t.IGetVideoListSuccess => ({
    type: t.GET_VIDEO_LIST_SUCCESS,
    payload
  }),
  getVideoListError: (errorMessage: string): t.IGetVideoListError => ({
    type: t.GET_VIDEO_LIST_ERROR,
    errorMessage,
  }),

  addOrUpdateVideoRequest: (): t.IAddOrUpdateVideoRequest => ({
    type: t.ADD_OR_UPDATE_VIDEO_REQUEST,
  }),
  addOrUpdateVideoSuccess: (payload: boolean): t.IAddOrUpdateVideoSuccess => ({
    type: t.ADD_OR_UPDATE_VIDEO_SUCCESS,
    payload
  }),
  addOrUpdateVideoError: (errorMessage: string): t.IAddOrUpdateVideoError => ({
    type: t.ADD_OR_UPDATE_VIDEO_ERROR,
    errorMessage,
  }),

  deleteVideoRequest: (): t.IDeleteVideoRequest => ({
    type: t.DELETE_VIDEO_REQUEST,
  }),
  deleteVideoSuccess: (payload: boolean): t.IDeleteVideoSuccess => ({
    type: t.DELETE_VIDEO_SUCCESS,
    payload
  }),
  deleteVideoError: (errorMessage: string): t.IDeleteVideoError => ({
    type: t.DELETE_VIDEO_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Video";
const defaultControllerName = "Home";
export const actionCreators = {
  getVideoList: (): IAppThunkAction<t.TGetVideoList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetAllVideo";
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
      .then((value: IResponse<IVideo[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getVideoListSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getVideoListError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getVideoListRequest());
  },
  AddOrUpdateVideo: (data: IVideoDTO): IAppThunkAction<t.TAddOrUpdateVideo | t.TGetVideoList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "AddOrUpdate";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const formData = generateFormBody(data);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: formData,
      headers: {
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IVideo[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdateVideoSuccess(true));
        actionCreators.getVideoList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateVideoError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateVideoRequest());
  },
  removeVideo: (videoId: number): IAppThunkAction<t.IDeleteVideo | t.TGetVideoList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "Delete";
    const xptToHeader = GetXsrfToHeader(getState);
    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?videoId=${videoId.toString()}`, {
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

        dispatch(actionsList.deleteVideoSuccess(true));
        actionCreators.getVideoList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateVideoError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteVideoRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
