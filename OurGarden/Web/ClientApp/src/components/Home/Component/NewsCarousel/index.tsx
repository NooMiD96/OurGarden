import * as React from "react";
import { push as pushAction } from "connected-react-router";

import Carousel from "@core/antd/Carousel";
import { NextArrow, PrevArrow } from "@core/components/Carousel/Arrows";

import { getPreviewPhotoSrc } from "@core/utils/photo";

import { INew } from "@components/News/State";

export interface INewsCarousel {
  displayList: INew[];
  push: typeof pushAction;
  ymId: number;
}

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

export class NewsCarousel extends React.PureComponent<INewsCarousel, {}> {
  caruselRef: Carousel | null = null;

  render() {
    const { displayList, push, ymId } = this.props;

    const carouselSource = displayList.map((x: INew) => (
      <img
        className="slick-slide-content-image"
        alt={x.alias}
        title={x.alias}
        src={getPreviewPhotoSrc(x)}
        key={x.newsId}
        onClick={() => {
          window.ym(ymId, "reachGoal", "BANNER_MAIN_CLICK");
          push(`/News/${x.newsId}`);
        }}
        onKeyDown={() => {
          window.ym(ymId, "reachGoal", "BANNER_MAIN_CLICK");
          push(`/News/${x.newsId}`);
        }}
        role="link"
      />
    ));

    return (
      <React.Fragment>
        <Carousel
          autoplay
          effect="fade"
          ref={(ref: Carousel | null) => {
            this.caruselRef = ref;
          }}
          adaptiveHeight
          arrows
          draggable
          lazyLoad="progressive"
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {carouselSource}
        </Carousel>
      </React.Fragment>
    );
  }
}

/* eslint-enable jsx-a11y/interactive-supports-focus */

export default NewsCarousel;
