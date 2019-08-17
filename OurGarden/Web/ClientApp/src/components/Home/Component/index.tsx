import * as React from "react";

import Loading from "@src/core/components/Loading";
import NewsCarousel from "./NewsCarousel";

import { TState, TComponentState } from "../TState";

import "./style/Home.style.scss";

export class Home extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.newsList.length) {
      props.getNewsList();
    }
  }

  render() {
    const { newsList, push, pending } = this.props;

    const displayList = newsList.slice(0, 3);

    return (
      <div className="home-wrapper content">
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
