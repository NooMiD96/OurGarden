import { Location } from "history";
import { ICategory } from "@src/components/Category/State";

const getActiveRoute = (
  tabList: { title: string; link: string }[],
  location: Location<any>
) => {
  if (!tabList || !tabList.length) {
    return "";
  }
  let defaultActiveKey;

  if (location && location.pathname) {
    // "/asd".split("/") ==> ["", "asd"];
    const routeSplit = location.pathname.split("/").filter(Boolean);

    if (routeSplit.length) {
      const mainRoute = routeSplit[0].toLowerCase();

      for (let i = 0; i < tabList.length; i++) {
        const tab = tabList[i];
        if (tab.link.replace(/\s/g, "-").toLowerCase() === mainRoute) {
          defaultActiveKey = tab.link;
          break;
        }
      }
    } else {
      defaultActiveKey = "Home";
    }
  }

  return defaultActiveKey;
};

const getActiveCategory = (
  categoryList: ICategory[],
  location: Location<any>
) => {
  // prettier-ignore
  if (
    !categoryList
    || !categoryList.length
    || !location
    || !location.pathname
  ) {
    return "";
  }

  const routeSplit = location.pathname.split("/").filter(Boolean);

  // prettier-ignore
  if (
    routeSplit.length
    // Если мы находимся в разделе "Catalog"
    && routeSplit.some((x) => x.toLowerCase() === "catalog")
    // Если выбрана категория
    && routeSplit[1]
  ) {
    const mainRoute = routeSplit[1].toLowerCase();

    for (let i = 0; i < categoryList.length; i++) {
      const category = categoryList[i];
      if (category.categoryId === mainRoute) {
        return category.categoryId;
      }
    }
  }

  return "";
};

export { getActiveRoute, getActiveCategory };
