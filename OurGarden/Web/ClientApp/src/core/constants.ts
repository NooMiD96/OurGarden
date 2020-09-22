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

export const WHITE_BLOCK = "white-background grey-border";

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

export const RUSSIAN_CURRENCY = "₽";

export const PHONE_MACROS = "{{phone}}";
export const EMAIL_MACROS = "{{email}}";
export const CATALOG_MACROS = "{{catalog}}";
export const GALLERY_MACROS = /{{gallery=(?<galleryName>.+)}}/;

export const MODAL_TIMEOUT = 5_000;

export const CARD_PATH = "/Card";

export const HOME_PAGE_INFO_ID = 1;
export const DESIGN_PAGE_INFO_ID = 2;
