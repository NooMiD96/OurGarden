import React from "react";

import { match } from "react-router";
import { Location } from "history";

import GenerateLink from "./GenerateLink";

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
  const locationSplit = location.pathname.split("/");
  const locations = [
    <React.Fragment key="Главная">
      <GenerateLink title="Главная" link="Главная" />
      { locationSplit.length !== 1 && "/"}
    </React.Fragment>
  ]

  let uri = "";
  for (let i = 1; i < locationSplit.length; i++) {
    const location = locationSplit[i];
    uri+=`${location}/`;

    locations.push(
      <React.Fragment key={uri}>
        <GenerateLink
          title={location}
          link={uri}
          active={i !== locationSplit.length - 1}
        />
        { i !== locationSplit.length - 1 && "/"}
      </React.Fragment>
    );
  }

  return (
    <div className="breadcrumb">
      {locations}
    </div>
  )
}

export default Breadcrumb;
