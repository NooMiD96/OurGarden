import * as React from "react";

import NewsCarousel from "./NewsCarousel";
import CompanyInfo from "./CompanyInfo";

import { TState, TComponentState } from "../TState";

import { HOME_PAGE_INFO_ID } from "@src/core/constants";

import "./style/Home.style.scss";

export class Home extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted) {
      if (!props.newsList.length) {
        props.getNewsList();
      }

      props.getPageInfo(HOME_PAGE_INFO_ID);

      props.setBreadcrumb({
        breadcrumb: [],
        key: "",
      });
    }
  }

  render() {
    // prettier-ignore
    const {
      newsList,
      push,
      ymId,
      pageInfo
    } = this.props;

    const displayList = newsList.slice(0, 3);

    return (
      <div className="home-wrapper content">
        <NewsCarousel push={push} displayList={displayList} ymId={ymId} />
        <CompanyInfo pageInfo={pageInfo} />
      </div>
    );
  }
}

export default Home;
