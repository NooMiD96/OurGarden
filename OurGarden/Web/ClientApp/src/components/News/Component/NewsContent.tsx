import React from "react";

import Title from "@src/core/antd/Typography/Title";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { getPhotoSrc } from "@src/core/utils/photo";

import { INewsContentProps } from "./INewsContent";

export class NewsContent extends React.PureComponent<INewsContentProps, any> {
  render() {
    const { selectedNew } = this.props;

    return (
      <>
        <div className="news-info-title">
          <Title>{selectedNew.alias}</Title>
        </div>

        <img
          src={getPhotoSrc(selectedNew)}
          alt={selectedNew.alias}
          className="news-photo"
        />

        <div className="news-info-content wysiwyg-wrapper">
          <DescriptionWrapper
            description={selectedNew.description}
            wrapperClassName="wysiwyg-description"
          />
        </div>
      </>
    );
  }
}

export default NewsContent;
