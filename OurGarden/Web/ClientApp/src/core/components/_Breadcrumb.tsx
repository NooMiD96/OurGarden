import React from "react";

import { Location } from "history";

import GenerateLink from "./GenerateLink";

interface IBreadcrumbParams {
  location: Location;
}

export const Breadcrumb = ({ location }: IBreadcrumbParams) => {
  const locationSplit = location.pathname.split("/").filter(Boolean);

  const isRootLocation
    = locationSplit.length === 0
    || (locationSplit.length === 1 && locationSplit[0] === "Главная");

  if (isRootLocation) {
    return null;
  }

  const slash = <span className="slash">/</span>;

  const locations = [
    <React.Fragment key="Главная">
      <GenerateLink title="Главная" link="Главная" active />
      {slash}
    </React.Fragment>
  ];

  for (let i = 0; i < locationSplit.length; i++) {
    const link = locationSplit.slice(0, i + 1).reduce((a, b) => `${a}/${b}`);
    const title
      = locationSplit[i][0].toUpperCase()
      + locationSplit[i].slice(1).toLowerCase();

    locations.push(
      <React.Fragment key={`${title}`}>
        <GenerateLink
          title={title}
          link={link}
          active={i !== locationSplit.length - 1}
        />
        {i !== locationSplit.length - 1 && slash}
      </React.Fragment>
    );
  }

  return <div className="breadcrumb">{locations}</div>;
};

export default Breadcrumb;
