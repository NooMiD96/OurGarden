import {
  PHONE_MACROS,
  EMAIL_MACROS,
  MAIN_MOBILE_FORMATTED,
  MAIN_MOBILE,
  HELP_EMAIL,
} from "@src/core/constants";

/**
 *
 * @param description Строка которая инъекцируется в Html
 * @param splitMacros Макрос, между частями которого нужно разместить текст. Если пусто то вернётся массив из одного данного элемента.
 */
export const getPartsBetween = (
  description?: string,
  splitMacros?: string | RegExp
) => {
  if (!description) {
    return ["", ""];
  }

  if (!splitMacros) {
    return [description];
  }

  return description.split(splitMacros);
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
