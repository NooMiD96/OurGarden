import React from "react";

import { Title } from "@src/core/antd/Typography";

import { INewsContentProps } from "./INewsContent";

export class NewsContent extends React.PureComponent<INewsContentProps, {}> {
  render() {
    const { selectedNew } = this.props;

    return (
      <>
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
      </>
    );
  }
}

export default NewsContent;
