// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { TransferItem } from "@core/antd/Transfer";
import { IVisitationState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IVisitationState> = (state: IVisitationState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_VISITATION_LIST_REQUEST:
    case t.SAVE_VISITATION_LIST_REQUEST:
      return <IVisitationState>{
        ...state,
        pending: true,
      };

    case t.GET_VISITATION_LIST_REQUEST_SUCCESS: {
      const transferData: TransferItem[] = [];
      const targetVisitationKeys: string[] = [];
      const targetDiseasedKeys: string[] = [];

      action.visitationList.forEach(x => {
        const data = {
          key: x.childrenId.toString(),
          title: `${x.children.secondName} ${x.children.firstName}`,
        };

        transferData.push(data);
        if (x.visited) {
          targetVisitationKeys.push(data.key);
        } else if (x.diseased) {
          targetDiseasedKeys.push(data.key);
        }
      });

      return <IVisitationState>{
        ...state,
        pending: false,
        visitationList: action.visitationList,
        transferData,
        transferVisitationData: transferData.filter(x => !targetDiseasedKeys.includes(x.key)),
        targetVisitationKeys,
        transferDiseasedData: transferData.filter(x => !targetVisitationKeys.includes(x.key)),
        targetDiseasedKeys,
        selectedGroup: 0,
      };
    }

    case t.SAVE_VISITATION_LIST_REQUEST_SUCCESS:
      return <IVisitationState>{
        ...state,
        pending: false,
      };

    case t.GET_VISITATION_LIST_REQUEST_ERROR:
    case t.SAVE_VISITATION_LIST_REQUEST_ERROR:
      return <IVisitationState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.CHANGE_TARGET_LIST:
      return <IVisitationState>{
        ...state,
        targetVisitationKeys: action.targetKeys,
        transferDiseasedData: state.transferData.filter(x => !action.targetKeys.includes(x.key)),
      };

    case t.CHANGE_DISEASED_TARGET_LIST:
      return <IVisitationState>{
        ...state,
        targetDiseasedKeys: action.targetKeys,
        transferVisitationData: state.transferData.filter(x => !action.targetKeys.includes(x.key)),
      };

    case t.CHANGE_GROUP: {
      if (action.groupId !== 0) {
        const transferData: TransferItem[] = [];
        const targetVisitationKeys: string[] = [];
        const targetDiseasedKeys: string[] = [];

        state.visitationList.forEach(x => {
          if (x.children.group.groupId !== action.groupId) {
            return;
          }

          const data: TransferItem = {
            key: x.childrenId.toString(),
            title: `${x.children.secondName} ${x.children.firstName}`,
          };

          transferData.push(data);
          if (x.visited) {
            targetVisitationKeys.push(data.key);
          } else if (x.diseased) {
            targetDiseasedKeys.push(data.key);
          }
        });

        return <IVisitationState>{
          ...state,
          transferData,
          transferVisitationData: transferData.filter(x => !targetDiseasedKeys.includes(x.key)),
          targetVisitationKeys,
          transferDiseasedData: transferData.filter(x => !targetVisitationKeys.includes(x.key)),
          targetDiseasedKeys,
          selectedGroup: action.groupId,
        };
      }

      const transferData: TransferItem[] = [];
      const targetVisitationKeys: string[] = [];
      const targetDiseasedKeys: string[] = [];

      state.visitationList.forEach(x => {
        const data: TransferItem = {
          key: x.childrenId.toString(),
          title: `${x.children.secondName} ${x.children.firstName}`,
        };

        transferData.push(data);
        if (x.visited) {
          targetVisitationKeys.push(data.key);
        } else if (x.diseased) {
          targetDiseasedKeys.push(data.key);
        }
      });

      return <IVisitationState>{
        ...state,
        transferData,
        transferVisitationData: transferData.filter(x => !targetDiseasedKeys.includes(x.key)),
        targetVisitationKeys,
        transferDiseasedData: transferData.filter(x => !targetVisitationKeys.includes(x.key)),
        targetDiseasedKeys,
        selectedGroup: 0,
      };
    }

    case t.CLEAN_ERROR_INNER:
      return <IVisitationState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
