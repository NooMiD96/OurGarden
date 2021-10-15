import { createContext } from "react";

export const MobileContext = createContext(true);

export const MAIN_MOBILE = "+7 (953) 43-43-516";
export const MAIN_MOBILE_FORMATTED = "+79534343516";
export const HELP_EMAIL = "help@наш-сад.com";
export const SHORT_ADDRESS = "ул. 9 мая, 36";
export const ADDRESS = `г. Тула, ${SHORT_ADDRESS}`;

export const RUSSIAN_CURRENCY = "₽";

export const PHONE_MACROS = "{{phone}}";
export const EMAIL_MACROS = "{{email}}";
export const ADDRESS_MACROS = "{{address}}";
export const SHORT_ADDRESS_MACROS = "{{short_address}}";
export const CATALOG_MACROS = "{{catalog}}";
export const GALLERY_MACROS = "{{gallery=(?<galleryName>.+)}}";

export const MODAL_TIMEOUT = 5_000;

export const CARD_PATH = "/Card";

export const IMPORT_DELAY = 2_500;
