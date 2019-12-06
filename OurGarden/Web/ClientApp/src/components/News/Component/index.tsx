import React from "react";

import HeaderHelmet from "@src/core/components/Helmet";
import NewsContent from "./NewsContent";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState, TComponentState } from "../TState";

import "./style/News.style.scss";

export class News extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params }
    } = props;

    if (!props.selectedNew || props.selectedNew.alias !== params.newsId) {
      props.getNews(params.newsId);
    }

    props.getBreadcrumb({
      newsId: params.newsId
    });
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

    const seoSection = getSEOMetaData("news");

    return (
      <div className="news-wrapper content white-background grey-border">
        {selectedNew && (
          <>
            <HeaderHelmet
              // prettier-ignore
              title={
                seoSection.title
                && seoSection.title.replace("{{value}}", selectedNew.title)
              }
              metaDescription={seoSection.meta}
            />
            <NewsContent selectedNew={selectedNew} />
          </>
        )}
      </div>
    );
  }
}

export default News;
