// import { fetch, addTask } from "domain-task";

// import { IAppThunkAction } from "@src/Store";
// import { IResponse } from "@core/fetchHelper/IResponse";
// import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import * as t from "./actionsType";
// import { errorCatcher, responseCatcher } from "@core/fetchHelper";
// import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
// const controllerName = "";
export const actionCreators = {
  // getVisitationList: (date?: string): IAppThunkAction<t.TGetVisitationList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
  //   const apiUrl = "GetVisitationList";
  //   const xptToHeader = GetXsrfToHeader(getState);

  //   dispatch(actionCreators.cleanErrorInner());

  //   const fetchTask = fetch(`/api/${controllerName}/${apiUrl}${date ? `?date=${date}` : ""}`, {
  //     credentials: "same-origin",
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //       ...xptToHeader,
  //     },
  //   })
  //     .then(responseCatcher)
  //     .then((value: IResponse<IVisitation[]>) => {
  //       if (value && value.error) {
  //         return errorCreater(value.error);
  //       }

  //       value.data.forEach(x => {
  //         x.date = moment(x.date);
  //       });

  //       dispatch(actionsList.getVisitationListRequestSuccess(value.data));

  //       return Promise.resolve();
  //     }).catch((err: Error) => errorCatcher(
  //       controllerName,
  //       apiUrl,
  //       err,
  //       actionsList.getVisitationListRequestError,
  //       dispatch
  //     ));

  //   addTask(fetchTask);
  //   dispatch(actionsList.getVisitationListRequest());
  // },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
