import React from "react";
import _isEqual from "lodash.isequal";
import { useParams } from "react-router-dom";

import NewsContent from "./NewsContent";

import { TState, TComponentState } from "../TState";

import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/News.style.scss";

export class News extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const { params } = props;

    if (!props.isDataWasReceive) {
      if (!props.selectedNew || props.selectedNew.newsId !== params.newsId) {
        params.newsId && props.getNews(params.newsId);
      }

      props.getBreadcrumb({
        newsId: params.newsId,
      });
    }
  }

  componentDidUpdate(prevProps: TState) {
    const { getNews, params, getBreadcrumb } = this.props;

    if (!_isEqual(prevProps.params, this.props.params)) {
      params.newsId && getNews(params.newsId);

      getBreadcrumb({
        newsId: params.newsId,
      });
    }
  }

  render() {
    const { selectedNew } = this.props;

    return (
      <div className={`news-wrapper content ${WHITE_BLOCK}`}>
        {selectedNew && <NewsContent selectedNew={selectedNew} />}
      </div>
    );
  }
}

export default (props: any) => <News {...props} params={useParams()} />;
