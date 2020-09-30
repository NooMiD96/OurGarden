import * as React from "react";
import { push as pushAction } from "connected-react-router";

import Carousel from "@core/components/Carousel";

import { getPreviewPhotoSrc } from "@core/utils/photo";

import { INew } from "@components/News/State";

export interface INewsCarousel {
  displayList: INew[];
  push: typeof pushAction;
  ymId: number;
}

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

export class NewsCarousel extends React.PureComponent<INewsCarousel, {}> {
  render() {
    const { displayList, push, ymId } = this.props;

    return (
      <React.Fragment>
        <Carousel
          dataSource={displayList}
          getKey={(x) => x.newsId}
          getAlt={(x) => x.alias}
          getTitle={(x) => x.alias}
          getImageSrc={(x) => getPreviewPhotoSrc(x)}
          onClick={(x) => {
            window.ym(ymId, "reachGoal", "BANNER_MAIN_CLICK");
            push(`/News/${x.newsId}`);
          }}
        />
      </React.Fragment>
    );
  }
}

/* eslint-enable jsx-a11y/interactive-supports-focus */

export default NewsCarousel;
