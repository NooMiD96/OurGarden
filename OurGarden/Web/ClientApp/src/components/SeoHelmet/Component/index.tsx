import React from "react";
import { useLocation } from "react-router-dom";

import { HelmetAsync } from "@src/core/components/HelmetAsync";

import { TState } from "../TState";

export class SeoHelmet extends React.PureComponent<TState> {
  UNSAFE_componentWillMount() {
    this.getNewPageInformation();
  }

  componentDidUpdate() {
    this.getNewPageInformation();
  }

  getNewPageInformation() {
    const {
      location: { pathname },
    } = this.props;
    this.props.getPageSeoInformation(pathname);
  }

  render() {
    return <HelmetAsync {...this.props.pageSeoInformation} />;
  }
}

export default (props: any) => (
  <SeoHelmet {...props} location={useLocation()} />
);
