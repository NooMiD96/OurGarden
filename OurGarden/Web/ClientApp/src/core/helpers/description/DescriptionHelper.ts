import { PHONE_MACROS, MAIN_MOBILE_FORMATTED, MAIN_MOBILE } from "@src/core/constants";

export const getPartsBetweenCatalog = (description?: string) => {
  if (!description) {
    return ["", ""];
  }

  const parts = description.split("{{catalog}}");

  return parts;
};

export const replacePhoneMacros = (description?: string) => {
  if (!description) {
    return "";
  }

  return description.replace(
    PHONE_MACROS,
    `<a class="number-wrapper info" href="tel:${MAIN_MOBILE_FORMATTED}"><span class="text">${MAIN_MOBILE}</span></a>`
  );
};
