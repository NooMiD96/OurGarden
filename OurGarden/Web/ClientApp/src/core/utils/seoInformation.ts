const seoInformation: any = process.env.seoInformation
  && JSON.parse(process.env.seoInformation);

if (!seoInformation) {
  console.warn("Отсутствует СЕО информация в окружении");
}

export const getSEOMetaData = !seoInformation
  ? () => {
    return {
      title: "",
      meta: ""
    }
  }
  : (section: string) => {
    if (seoInformation[section]) {
      return {...seoInformation[section]};
    }

    console.warn("Не удалось найти СЕО информации для секции: ", section);

    return {
      title: "",
      meta: ""
    }
  };
