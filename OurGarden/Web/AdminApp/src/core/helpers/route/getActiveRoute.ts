import { Location } from "history";

const getActiveRoute = (
  tabList: { key: string; title: string; link: string }[],
  location: Location<any>
) => {
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

export {
  getActiveRoute
};
