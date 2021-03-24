import React from "react";

import { Header } from "@core/antd/Layout";

import GenerateLink from "@src/core/components/GenerateLink";

import { TState } from "../TState";
import { IBreadcrumb } from "../State";

import "./style/Breadcrumb.style.scss";

const slash = <span className="slash">/</span>;
const homeBreadcrumb: IBreadcrumb = {
  displayName: "Главная",
  url: "",
  order: 0,
};

export const Breadcrumb = ({ breadcrumb: breadcrumbList }: TState) => {
  if (breadcrumbList.length === 0) {
    return null;
  }

  const locations = [
    <React.Fragment key={homeBreadcrumb.url}>
      <GenerateLink
        title={homeBreadcrumb.displayName}
        link={homeBreadcrumb.url}
        active
        className="dark-green-color"
      />
      {slash}
    </React.Fragment>,
  ];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < breadcrumbList.length; i++) {
    const breadcrumb = breadcrumbList[i];
    const active = i !== breadcrumbList.length - 1;

    locations.push(
      <React.Fragment key={breadcrumb.url}>
        <GenerateLink
          title={breadcrumb.displayName}
          link={breadcrumb.url}
          active={active}
          className={active ? "dark-green-color" : ""}
        />
        {active && slash}
      </React.Fragment>
    );
  }

  return (
    <Header>
      <div className="breadcrumb">{locations}</div>
    </Header>
  );
};

export default Breadcrumb;
