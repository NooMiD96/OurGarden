//#region Style
//rgb(191, 190, 190)
export const lightGreyColor = "#bfbebe";
export const greyColor = "#626262";
export const greyShadowStyle = "0 0 0 2px rgba(98, 98, 98, 0.2);";
export const darkGreyColor = "#151515";

export const darkGreenColor = "#75b726";
export const greenColor = "#50ae2f";
export const mainColor = greenColor;
export const lightGreenColor = "#78ff59";

export const borderColor = "#cecece";
export const arrowBorderColor = "#bad150";
//#endregion

//#region SVG Icons
export type TIcons =
  "loading"
  | "left"
  | "right"
  | "down"
  | "close-circle"
  | "close"
  | "user"
  | "phone"
  | "mail"
  ;

export const getIconAsync = async (type: TIcons) => {
  switch (type) {
    case "loading":
      return (await import("@antdSvgs/LoadingOutline")).default;
    case "left":
      return (await import("@antdSvgs/LeftOutline")).default;
    case "right":
      return (await import("@antdSvgs/RightOutline")).default;
    case "down":
      return (await import("@antdSvgs/DownOutline")).default;
    case "close-circle":
      return (await import("@antdSvgs/CloseCircleOutline")).default;
    case "close":
      return (await import("@antdSvgs/CloseOutline")).default;
    case "user":
      return (await import("@antdSvgs/UserOutline")).default;
    case "phone":
      return (await import("@antdSvgs/PhoneOutline")).default;
    case "mail":
      return (await import("@antdSvgs/MailOutline")).default;

    default: {
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${exhaustiveCheck}" type not found!`);
    }
  }
};
//#endregion
