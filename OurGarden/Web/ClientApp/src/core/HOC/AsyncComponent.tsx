import * as React from "react";
import Loadable from "react-loadable";

import LoadingIcon from "@src/core/components/Loading";
import Breadcrumb from "@components/Breadcrumb";

export function AsyncComponent(
  loader: () => Promise<object>,
  modules: [string],
  webpack: () => [any]
) {
  const asyncComponentLoadable = Loadable({
    loader,
    loading: LoadingIcon,
    modules,
    webpack,
    delay: 0,
    timeout: 10000,
    render(loaded: any, props: any) {
      const Component = loaded.default;

      return (
        <>
          <Breadcrumb {...props} />
          <Component {...props} />
        </>
      );
    },
  });

  return asyncComponentLoadable;
}
