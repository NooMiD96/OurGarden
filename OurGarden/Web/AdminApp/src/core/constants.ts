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
  | "check-circle"
  ;

export const getIconAsync = async (type: TIcons) => {
  switch (type) {
    case "loading":
      return (await import("@antdSvgs/LoadingOutline")).default;
    case "question-circle":
      return (await import("@antdSvgs/QuestionCircleOutline")).default;
    case "user":
      return (await import("@antdSvgs/UserOutline")).default;
    case "lock":
      return (await import("@antdSvgs/LockOutline")).default;
    case "close-circle":
      return (await import("@antdSvgs/CloseCircleOutline")).default;
    case "close":
      return (await import("@antdSvgs/CloseOutline")).default;
    case "edit":
      return (await import("@antdSvgs/EditOutline")).default;
    case "plus":
      return (await import("@antdSvgs/PlusOutline")).default;
    case "check-circle":
      return (await import("@antdSvgs/CheckCircleOutline")).default;

    default: {
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${exhaustiveCheck}" type not found!`);
    }
  }
};
//#endregion
