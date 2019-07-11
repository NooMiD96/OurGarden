import React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import CoreBreadcrumb from "@core/components/Breadcrumb";
import Layout from "@core/antd/Layout";

import { IApplicationState } from "@src/Store";

const { Header } = Layout;

const Breadcrumb = (props: RouterState) => {
  return (
    <Header>
      <CoreBreadcrumb
        location={props.location}
      />
    </Header>
  )
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(Breadcrumb);
