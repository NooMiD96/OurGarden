import React from "react";

import Loading from "@src/core/components/Loading";
import Row from "@src/core/antd/Row";
import { Title } from "@src/core/antd/Typography";

import NewsWrapper from "./style/News.style";

import { TState, TComponentState } from "../TState";

export class News extends React.PureComponent<TState, TComponentState> {
  componentDidMount() {
    const {
      getNews,
      match: {
        params: { newsId }
      }
    } = this.props;

    getNews(newsId);
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getNews,
      match: {
        params: { newsId }
      }
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getNews(newsId);
    }
  }

  render() {
    const { selectedNew, pending } = this.props;

    return (
      <NewsWrapper className="content white-background">
        {pending || !selectedNew ? (
          <Loading />
        ) : (
          <Row>
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
      </NewsWrapper>
    );
  }
}

export default News;
