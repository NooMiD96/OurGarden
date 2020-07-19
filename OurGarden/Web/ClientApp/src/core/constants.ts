import { createContext } from "react";

// #region Style
// rgb(191, 190, 190)
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
// #endregion

// #region SVG Icons
export type TIcons =
  | "loading"
  | "left"
  | "right"
  | "down"
  | "close-circle"
  | "close"
  | "user"
  | "phone"
  | "mail"
  | "double-right"
  | "double-left"
  | "bars";

export const getIconAsync = async (type: TIcons) => {
  switch (type) {
    case "loading":
      return (await import("@antdSvgs/LoadingOutlined")).default;
    case "left":
      return (await import("@antdSvgs/LeftOutlined")).default;
    case "right":
      return (await import("@antdSvgs/RightOutlined")).default;
    case "double-left":
      return (await import("@antdSvgs/DoubleLeftOutlined")).default;
    case "double-right":
      return (await import("@antdSvgs/DoubleRightOutlined")).default;
    case "down":
      return (await import("@antdSvgs/DownOutlined")).default;
    case "close-circle":
      return (await import("@antdSvgs/CloseCircleOutlined")).default;
    case "close":
      return (await import("@antdSvgs/CloseOutlined")).default;
    case "user":
      return (await import("@antdSvgs/UserOutlined")).default;
    case "phone":
      return (await import("@antdSvgs/PhoneOutlined")).default;
    case "mail":
      return (await import("@antdSvgs/MailOutlined")).default;
    case "bars":
      return (await import("@antdSvgs/BarsOutlined")).default;

    default: {
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${exhaustiveCheck}" type not found!`);
    }
  }
};
// #endregion

export const MAIN_LAYOUT_GRID_COL_STYLE = {
  // xs <576px
  xs: { offset: 0, span: 24 },
  // sm ≥576px
  sm: { offset: 0, span: 24 },
  // md ≥768px
  md: { offset: 1, span: 22 },
  // lg ≥992px
  lg: { offset: 2, span: 20 },
  // xl ≥1200px
  xl: { offset: 4, span: 16 },
  // xxl ≥1600px
  xxl: { offset: 5, span: 14 },
};

export const MobileContext = createContext(true);

export const MAIN_MOBILE = "+7 (953) 43-43-516";
export const MAIN_MOBILE_FORMATTED = "+79534343516";
export const HELP_EMAIL = "help@наш-сад.com";
export const SHORT_ADDRESS = "ул. 9 мая, 36";
export const ADDRESS = `г. Тула, ${SHORT_ADDRESS}`;
export const isShowSvgIcon = !!process.env.isWebpackBundle;

export const RUSSIAN_CURRENCY = "₽";

export const PHONE_MACROS = "{{phone}}";
export const EMAIL_MACROS = "{{email}}";
export const CATALOG_MACROS = "{{catalog}}";
export const GALLERY_MACROS = /{{gallery=.+?}}/;

export const MODAL_TIMEOUT = 5_000;

export const CARD_PATH = "/Card";
