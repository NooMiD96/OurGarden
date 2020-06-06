import React from "react";

import { Title } from "@src/core/antd/Typography";
import DescriptionItemWrapper from "@src/core/helpers/description/DescriptionItemWrapper";

import { getPhotoSrc } from "@src/core/utils/photo";

import { INewsContentProps } from "./INewsContent";

export class NewsContent extends React.PureComponent<INewsContentProps, {}> {
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

        <div className="news-info-content">
          <DescriptionItemWrapper
            description={selectedNew.description}
            wrapperClassName="news-description-wysiwyg"
          />
        </div>
      </>
    );
  }
}

export default NewsContent;
