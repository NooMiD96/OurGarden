import * as React from "react";

import HeaderHelmet from "@core/components/Helmet";
import NewsCarousel from "./NewsCarousel";
import CompanyInfo from "./CompanyInfo";

import { TState, TComponentState } from "../TState";

import "./style/Home.style.scss";

export class Home extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted) {
      if (!props.newsList.length) {
        props.getNewsList();
      }

      props.setBreadcrumb({
        breadcrumb: [],
        key: ""
      });
    }
  }

  render() {
    const { newsList, push, ymId } = this.props;

    const displayList = newsList.slice(0, 3);

    return (
      <div className="home-wrapper content">
        <HeaderHelmet seoSectionName="home" />
        <NewsCarousel push={push} displayList={displayList} ymId={ymId} />
        <CompanyInfo />
      </div>
    );
  }
}

export default Home;
