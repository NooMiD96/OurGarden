import { ISEOMetaData } from "./ISEO";

// #region Private

// prettier-ignore
export const seoInformation: any
  = process.env.seoInformation && JSON.parse(process.env.seoInformation);

if (!seoInformation && !!process.env.isWebpackBundle) {
  console.warn("Отсутствует СЕО информация в окружении");
}

// prettier-ignore
export const simpleGetSEOMetaData = () => (<ISEOMetaData>{
  title: null,
  description: null,
  keywords: null,
});

export const normalGetSEOMetaData = (section: string) => {
  if (seoInformation[section]) {
    return <ISEOMetaData>{
      title: seoInformation[section]?.Title,
      description: seoInformation[section]?.Description,
      keywords: seoInformation[section]?.Keywords
    };
  }

  console.warn("Не удалось найти СЕО информации для секции: ", section);

  return <ISEOMetaData>{
    title: null,
    description: null,
    keywords: null
  };
};

// #endregion
