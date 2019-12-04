import React from "react";

import Loading from "@core/components/Loading";

interface ILoadingHOC {
  pending: boolean;
  children: React.ReactNode | React.ReactNodeArray | any;
}

export const LoadingHOC = ({ pending, children }: ILoadingHOC) => {
  if (pending) {
    return <Loading />;
  }

  return children;
};

export default LoadingHOC;
