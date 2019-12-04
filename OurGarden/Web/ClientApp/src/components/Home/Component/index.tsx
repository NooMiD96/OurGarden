import * as React from "react";

import LoadingHOC from "@core/HOC/LoadingHOC";
import HeaderHelmet from "@core/components/Helmet";

import NewsCarousel from "./NewsCarousel";

import { getSEOMetaData } from "@core/utils/seoInformation";

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
    const { newsList, push, pending } = this.props;

    const displayList = newsList.slice(0, 3);

    return (
      <div className="home-wrapper content">
        <HeaderHelmet
          {...getSEOMetaData("home")}
        />
        <LoadingHOC
          pending={pending}
        >
          <NewsCarousel push={push} displayList={displayList} />
        </LoadingHOC>
      </div>
    );
  }
}

export default Home;
