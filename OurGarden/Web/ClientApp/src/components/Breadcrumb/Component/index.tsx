import React from "react";

import Layout from "@core/antd/Layout";

import GenerateLink from "@src/core/components/GenerateLink";

import { TState } from "../TState";
import { IBreadcrumb } from "../State";

const { Header } = Layout;

const slash = <span className="slash">/</span>;
const homeBreadcrumb: IBreadcrumb = {
  displayName: "Главная",
  url: "Home",
  order: 0,
};

export const Breadcrumb = ({
  breadcrumb: breadcrumbList
}: TState) => {
  if (breadcrumbList.length === 0) {
    return null;
  }

  const locations = [
    <React.Fragment key={homeBreadcrumb.url}>
      <GenerateLink
        title={homeBreadcrumb.displayName}
        link={homeBreadcrumb.url}
        active
      />
      {slash}
    </React.Fragment>
  ];

  for (let i = 0; i < breadcrumbList.length; i++) {
    const breadcrumb = breadcrumbList[i];
    const active = i !== breadcrumbList.length - 1;

    locations.push(
      <React.Fragment key={breadcrumb.url}>
        <GenerateLink
          title={breadcrumb.displayName}
          link={breadcrumb.url}
          active={active}
        />
        {active && slash}
      </React.Fragment>
    );
  }

  return (
    <Header>
      <div className="breadcrumb">{locations}</div>
    </Header>
  )
};

export default Breadcrumb;
