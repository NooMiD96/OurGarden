import React from "react";

import Loading from "@src/core/components/Loading";
import HeaderHelmet from "@src/core/components/Helmet";
import Row from "@src/core/antd/Row";
import { Title } from "@src/core/antd/Typography";

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
    const { selectedNew, pending } = this.props;

    const seoSection = getSEOMetaData("news");

    return (
      <div className="news-wrapper content white-background grey-border">
        {pending || !selectedNew ? (
          <>
            <Loading />
          </>
        ) : (
          <Row>
            <HeaderHelmet
              title={
                seoSection.title
                && seoSection.title.replace("{{value}}", selectedNew.title)
              }
              metaDescription={seoSection.meta}
            />
            <img
              src={selectedNew.photo && selectedNew.photo.url}
              alt={selectedNew.title}
              className="news-photo"
            />

            <div className="news-info-content">
              <Title>{selectedNew.title}</Title>

              <div
                className="news-description-wysiwyg"
                dangerouslySetInnerHTML={{ __html: selectedNew.description }}
              />
            </div>
          </Row>
        )}
      </div>
    );
  }
}

export default News;
