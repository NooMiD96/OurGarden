// #region Private
// prettier-ignore
const seoInformation: any
  = process.env.seoInformation && JSON.parse(process.env.seoInformation);

if (!seoInformation) {
  console.warn("Отсутствует СЕО информация в окружении");
}

// prettier-ignore
const simpleGetSEOMetaData = () => ({
  title: "",
  meta: ""
} as ISEOMetaData);

const normalGetSEOMetaData = (section: string) => {
  if (seoInformation[section]) {
    return { ...seoInformation[section] } as ISEOMetaData;
  }

  console.warn("Не удалось найти СЕО информации для секции: ", section);

  return {
    title: "",
    meta: ""
  } as ISEOMetaData;
};

// #endregion

export interface ISEOMetaData {
  title: string;
  meta: string;
}

export const getSEOMetaData = !seoInformation
  ? simpleGetSEOMetaData
  : normalGetSEOMetaData;
