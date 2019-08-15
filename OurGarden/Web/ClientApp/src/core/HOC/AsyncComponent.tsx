import * as React from "react";

import Loadable from "react-loadable";

import LoadingIcon from "@src/core/components/Loading";

export function AsyncComponent(
  ComponentLoader: any,
  modules: any,
  webpack: any
) {
  const asyncComponentLoadable = Loadable({
    loader: ComponentLoader,
    loading: LoadingIcon,
    modules: modules,
    webpack: () => webpack,
    render(loaded: any, props) {
      let Component = loaded.default;
      return <Component {...props} />;
    }
  });

  return asyncComponentLoadable;
}
