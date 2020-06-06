import React from "react";

import HeaderHelmet from "@src/core/components/Helmet";
import NewsContent from "./NewsContent";

import { TState, TComponentState } from "../TState";

import "./style/News.style.scss";

export class News extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params }
    } = props;

    if (!props.isDataWasGeted) {
      if (!props.selectedNew || props.selectedNew.newsId !== params.newsId) {
        props.getNews(params.newsId);
      }

      props.getBreadcrumb({
        newsId: params.newsId
      });
    }
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getNews,
      match: { params },
      getBreadcrumb
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getNews(params.newsId);

      getBreadcrumb({
        newsId: params.newsId
      });
    }
  }

  render() {
    const { selectedNew } = this.props;

    return (
      <div className="news-wrapper content white-background grey-border">
        {selectedNew && (
          <>
            <HeaderHelmet
              seoSectionName="News"
              seoTitle={selectedNew.seoTitle}
              seoTitleReplacments={[
                {
                  replacementValue: selectedNew.alias
                }
              ]}
            />
            <NewsContent selectedNew={selectedNew} />
          </>
        )}
      </div>
    );
  }
}

export default News;
