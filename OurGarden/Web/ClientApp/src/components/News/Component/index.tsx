import React from "react";

import Loading from "@src/core/components/Loading";
import Row from "@src/core/antd/Row";
import { Title } from "@src/core/antd/Typography";

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
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getNews,
      match: { params }
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getNews(params.newsId);
    }
  }

  render() {
    const { selectedNew, pending } = this.props;

    return (
      <div className="news-wrapper content white-background">
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
      </div>
    );
  }
}

export default News;
