import * as React from "react";

import Loading from "@src/core/components/Loading";
import HeaderHelmet from "@src/core/components/Helmet";

import NewsCarousel from "./NewsCarousel";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState, TComponentState } from "../TState";

import "./style/Home.style.scss";

export class Home extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.newsList.length) {
      props.getNewsList();
    }

    props.setBreadcrumb([]);
  }

  render() {
    const { newsList, push, pending } = this.props;

    const displayList = newsList.slice(0, 3);

    return (
      <div className="home-wrapper content">
        <HeaderHelmet
          {...getSEOMetaData("home")}
        />
        {pending ? (
          <Loading />
        ) : (
          <NewsCarousel push={push} displayList={displayList} />
        )}
      </div>
    );
  }
}

export default Home;
