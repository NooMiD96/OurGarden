//#region SVG Icons
export type TIcons =
  "loading"
  | "question-circle"
  | "user"
  | "lock"
  | "close-circle"
  | "close"
  | "edit"
  | "plus"
  ;

export const getIconAsync = async (type: TIcons) => {
  switch (type) {
    case "loading":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/LoadingOutline")).default;
    case "question-circle":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/QuestionCircleOutline")).default;

    case "user":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/UserOutline")).default;
    case "lock":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/LockOutline")).default;

    case "close-circle":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/CloseCircleOutline")).default;
    case "close":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/CloseOutline")).default;
    case "edit":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/EditOutline")).default;
    case "plus":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/PlusOutline")).default;

    default: {
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${exhaustiveCheck}" type not found!`);
    }
  }
};
//#endregion
