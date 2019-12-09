import * as React from "react";

import HeaderHelmet from "@core/components/Helmet";
import NewsCarousel from "./NewsCarousel";

import { TState, TComponentState } from "../TState";

import "./style/Home.style.scss";

export class Home extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.newsList.length) {
      props.getNewsList();
    }

    props.setBreadcrumb({
      breadcrumb: [],
      key: ""
    });
  }

  render() {
    const { newsList, push } = this.props;

    const displayList = newsList.slice(0, 3);

    return (
      <div className="home-wrapper content">
        <HeaderHelmet seoSectionName="home" />
        <NewsCarousel push={push} displayList={displayList} />
      </div>
    );
  }
}

export default Home;
