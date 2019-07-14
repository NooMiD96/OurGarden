import { Location } from "history";
import { ICategory } from "@src/components/Main/Sider/State";

const getActiveRoute = (
  tabList: { key: string; title: string; link: string }[],
  location: Location<any>
) => {
  if (!tabList || !tabList.length) {
    return "";
  }
  let defaultActiveKey = tabList[0].key;

  if (location && location.pathname) {
    const routeSplit = location.pathname.split("/");
    if (routeSplit.length > 1) {
      const mainRoute = routeSplit[1].toLowerCase();
  
      for (let i = 0; i < tabList.length; i++) {
        const tab = tabList[i];
        if (tab.link.replace(/\s/g, "-").toLowerCase() === mainRoute) {
          defaultActiveKey = tab.key;
          break;
        }
      }
    }
  }

  return defaultActiveKey;
}

const getActiveCategory = (
  categoryList: ICategory[],
  location: Location<any>
) => {
  if (
    !categoryList
    || !categoryList.length
    || !location 
    || !location.pathname
  ) {
    return "";
  }

  const routeSplit = location.pathname.split("/").filter(Boolean);

  if (
    routeSplit.length
    // Если мы находимся в разделе "Каталог"
    && routeSplit.some(x => x.toLowerCase() === "каталог")
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
}

export {
  getActiveRoute,

  getActiveCategory
};
