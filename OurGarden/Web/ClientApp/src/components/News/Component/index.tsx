import React from "react";

import NewsContent from "./NewsContent";

import { TState, TComponentState } from "../TState";

import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/News.style.scss";

export class News extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params },
    } = props;

    if (!props.isDataWasGeted) {
      if (!props.selectedNew || props.selectedNew.newsId !== params.newsId) {
        props.getNews(params.newsId);
      }

      props.getBreadcrumb({
        newsId: params.newsId,
      });
    }
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getNews,
      match: { params },
      getBreadcrumb,
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getNews(params.newsId);

      getBreadcrumb({
        newsId: params.newsId,
      });
    }
  }

  render() {
    const { selectedNew } = this.props;

    return (
      <div className={`news-wrapper content ${WHITE_BLOCK}`}>
        {selectedNew && (
          <>
            <NewsContent selectedNew={selectedNew} />
          </>
        )}
      </div>
    );
  }
}

export default News;
