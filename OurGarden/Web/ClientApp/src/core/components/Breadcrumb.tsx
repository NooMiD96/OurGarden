import React from "react";

import { match } from "react-router";
import { Location } from "history";

interface IBreadcrumbParams {
  match: match<{
    categoty: string;
    subcategory: string;
    product: string;
  }>;
  location: Location;
}

export const Breadcrumb = ({
  match,
  location
}: IBreadcrumbParams
) => {

  return (
    <div>some / url</div>
  )
}

export default Breadcrumb;
