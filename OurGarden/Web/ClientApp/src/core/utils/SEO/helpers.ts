import { ISEOMetaData } from "./ISEO";

// #region Private

// prettier-ignore
export const seoInformation: any
  = process.env.seoInformation && JSON.parse(process.env.seoInformation);

if (!seoInformation) {
  console.warn("Отсутствует СЕО информация в окружении");
}

// prettier-ignore
export const simpleGetSEOMetaData = () => ({
  title: null,
  meta: null
} as ISEOMetaData);

export const normalGetSEOMetaData = (section: string) => {
  if (seoInformation[section]) {
    return { ...seoInformation[section] } as ISEOMetaData;
  }

  console.warn("Не удалось найти СЕО информации для секции: ", section);

  return {
    title: null,
    meta: null
  } as ISEOMetaData;
};

// #endregion
