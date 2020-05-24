import {
  PHONE_MACROS, EMAIL_MACROS, MAIN_MOBILE_FORMATTED, MAIN_MOBILE, HELP_EMAIL
} from "@src/core/constants";

export const getPartsBetweenCatalog = (description?: string) => {
  if (!description) {
    return ["", ""];
  }

  const parts = description.split("{{catalog}}");

  return parts;
};

export const getFormattedDescription = (description?: string) => {
  if (!description) {
    return "";
  }

  return description
    .replace(
      PHONE_MACROS,
      `<a class="number-wrapper info" href="tel:${MAIN_MOBILE_FORMATTED}"><span class="text">${MAIN_MOBILE}</span></a>`
    )
    .replace(
      EMAIL_MACROS,
      `<a class="email-wrapper" href="mailto:${HELP_EMAIL}"><span>${HELP_EMAIL}</span></a>`
    );
};
