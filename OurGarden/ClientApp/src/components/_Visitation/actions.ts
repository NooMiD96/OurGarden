import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";
import * as moment from "moment";

import { IVisitation } from "@components/Visitation/State";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  getVisitationListRequest: (): t.IGetVisitationListRequestAction => ({
    type: t.GET_VISITATION_LIST_REQUEST,
  }),
  getVisitationListRequestSuccess: (visitationList: IVisitation[]): t.IGetVisitationListRequestSuccessAction => ({
    type: t.GET_VISITATION_LIST_REQUEST_SUCCESS,
    visitationList,
  }),
  getVisitationListRequestError: (errorMessage: string): t.IGetVisitationListRequestErrorAction => ({
    type: t.GET_VISITATION_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  saveVisitationListRequest: (): t.ISaveVisitationListRequestAction => ({
    type: t.SAVE_VISITATION_LIST_REQUEST,
  }),
  saveVisitationListRequestSuccess: (): t.ISaveVisitationListRequestSuccessAction => ({
    type: t.SAVE_VISITATION_LIST_REQUEST_SUCCESS,
  }),
  saveVisitationListRequestError: (errorMessage: string): t.ISaveVisitationListRequestErrorAction => ({
    type: t.SAVE_VISITATION_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  changeGroup: (groupId: number): t.IChangeGroup => ({
    type: t.CHANGE_GROUP,
    groupId,
  }),
  changeTargetList: (targetKeys: string[]): t.IChangeTargetList => ({
    type: t.CHANGE_TARGET_LIST,
    targetKeys,
  }),
  changeDiseasedTargetList: (targetKeys: string[]): t.IChangeDiseasedTargetList => ({
    type: t.CHANGE_DISEASED_TARGET_LIST,
    targetKeys,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Visitation";
export const actionCreators = {
  getVisitationList: (date?: string): AppThunkAction<t.TGetVisitationList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetVisitationList";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}${date ? `?date=${date}` : ""}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IVisitation[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        value.data.forEach(x => {
          x.date = moment(x.date);
        });

        dispatch(actionsList.getVisitationListRequestSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getVisitationListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getVisitationListRequest());
  },
  saveVisitationList: (visitationList: IVisitation[]): AppThunkAction<t.TSaveVisitationList | t.TGetVisitationList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "SaveVisitationList";
    const xptToHeader = GetXsrfToHeader(getState);
    const date = visitationList.length ? visitationList[0].date.format("YYYY-MM-DD") : undefined;

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(visitationList),
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.saveVisitationListRequestSuccess());
        actionCreators.getVisitationList(date)(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.saveVisitationListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.saveVisitationListRequest());
  },
  changeGroup: actionsList.changeGroup,
  changeTargetList: actionsList.changeTargetList,
  changeDiseasedTargetList: actionsList.changeDiseasedTargetList,
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
