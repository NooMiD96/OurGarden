import React from "react";

import { HelmetAsync } from "@src/core/components/HelmetAsync";

import { TState } from "../TState";

export class SeoHelmet extends React.PureComponent<TState> {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.getNewPageInformation();
  }

  componentDidUpdate() {
    this.getNewPageInformation();
  }

  getNewPageInformation() {
    const { location: { pathname } } = this.props;
    this.props.getPageSeoInformation(pathname);
  }

  render() {
    return (
      <HelmetAsync {...this.props.pageSeoInformation} />

    );
  }
}

export default SeoHelmet;
