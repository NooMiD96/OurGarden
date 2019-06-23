import { Store } from "redux";
import { IApplicationState } from "@src/Store";
// import { ActionCreators as FetcherActionCreators } from "@components/Fetcher/actions";

const oneParamSwitcher = (url: string, _store: Store<IApplicationState>) => {
  switch (url.toLowerCase()) {
    // case "fetcher":
    //     FetcherActionCreators.GetData()(store.dispatch, store.getState);
    //     break;

    default:
      break;
  }
};

export default (splitedUrl: string[], store: Store<IApplicationState>) => {
  if (!splitedUrl.length) {
    // Home component
    return;
  }
  switch (splitedUrl.length) {
    case 1:
      oneParamSwitcher(splitedUrl[0], store);
      break;

    default:
      break;
  }
};

// prerender bundls
// if (params.data && params.data.bundleName) {
//     let component = Home;
//     switch (params.data.bundleName) {
//         case "Home":
//         default:
//             break;
//     }
//     const app = React.createElement(component);

//     params.domainTasks.then(() => {
//         resolve({
//             html: renderToString(app),
//             globals: { initialReduxState: params.data.bundleName },
//         });
//     }, reject);
// }
