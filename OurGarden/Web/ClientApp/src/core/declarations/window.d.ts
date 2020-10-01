type TTarget =
  | "BANNER_MAIN_CLICK"
  | "JIVO_CLICK"
  | "PHONE_CLICK"
  | "CONTACTS_VIEW"
  | "CHECKOUT_CLICK"
  | "CLEAN_CHECKOUT"
  | "TO_ORDER"
  | "TO_ORDER_2"
  | "SUCCESS_ORDER"
  | "FAULT_ORDER";

type TFuncName = "reachGoal";

declare interface Window {
  ym: (
    id: number,
    funcName: TFuncName,
    target: TTarget,
    ...params: any[]
  ) => void;
  __isMobileBrowser?: boolean;
  initialReduxState: any;
  __REDUX_DEVTOOLS_EXTENSION__: any;
}
